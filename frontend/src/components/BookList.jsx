import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaTable, FaTh, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import EditBookModal from './EditBookModal';
import AddBookModal from './AddBookModal';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://telesoft-2ubl.onrender.com/api/books');
      setBooks(Array.isArray(response.data) ? response.data : response.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books');
      setBooks([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://telesoft-2ubl.onrender.com/api/books/delete/${id}`);
      toast.success('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Cover</th> {/* New column for the cover image */}
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Author</th>
            <th className="px-6 py-3 text-left">Genre</th>
            <th className="px-6 py-3 text-left">Year</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id} className="border-b">
                <td className="px-6 py-4">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.genre}</td>
                <td className="px-6 py-4">{book.publicationYear}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books && books.length > 0 ? (
        books.map((book) => (
          <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
            <p className="text-gray-600 mb-2">Year: {book.publicationYear}</p>
            {book.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleEdit(book)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-8">
          No books found
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Books Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Book
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            <FaTable />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            <FaTh />
          </button>
        </div>
      </div>
      {viewMode === 'table' ? <TableView /> : <GridView />}
      {isEditModalOpen && (
        <EditBookModal
          book={editingBook}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingBook(null);
          }}
          onSuccess={fetchBooks}
        />
      )}
      {isAddModalOpen && (
        <AddBookModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
}