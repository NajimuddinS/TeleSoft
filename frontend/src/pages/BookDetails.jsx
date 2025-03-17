import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/book/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary mb-8"
        >
          Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Publication Year:</span> {book.publicationYear}
          </p>
          {book.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;