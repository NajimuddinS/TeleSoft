import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/api/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
        <div className="space-y-4">
          <p className="text-gray-600"><span className="font-semibold">Author:</span> {book.author}</p>
          <p className="text-gray-600"><span className="font-semibold">Genre:</span> {book.genre}</p>
          <p className="text-gray-600"><span className="font-semibold">Publication Year:</span> {book.publicationYear}</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn-secondary mt-8"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default BookDetails;