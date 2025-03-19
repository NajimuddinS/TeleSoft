import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditBookModal({ book, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre || '',
    publicationYear: book.publicationYear || new Date().getFullYear(),
    description: book.description || '',
    coverImage: book.coverImage || '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        toast.error('You are not authorized to perform this action');
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (selectedFile) {
        formDataToSend.append('coverImage', selectedFile);
      }

      console.log([...formDataToSend.entries()]); // Debug FormData

      await axios.put(
        `https://telesoft-2ubl.onrender.com/api/books/edit/${book._id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      toast.success('Book updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
      if (error.response) {
        console.error('Backend response:', error.response.data);
      }
      toast.error('Failed to update book');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Genre
              </label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Publication Year
              </label>
              <input
                type="number"
                value={formData.publicationYear}
                onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                className="w-full p-2 border rounded"
                min="1000"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cover Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            {formData.coverImage && !selectedFile && (
              <img
                src={formData.coverImage}
                alt="Current cover"
                className="mt-2 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}