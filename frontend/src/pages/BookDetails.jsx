import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]); // State for all books
  const [similarBooks, setSimilarBooks] = useState([]); // State for similar books
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchBookDetails();
    fetchAllBooks(); // Fetch all books
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await api.get('/books');
      setAllBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching all books:', error);
    }
  };

  // Filter similar books based on genre
  useEffect(() => {
    if (book && allBooks.length > 0) {
      const similar = allBooks.filter(
        (b) => b.genre === book.genre && b._id !== book._id // Exclude the current book
      );
      setSimilarBooks(similar);
    }
  }, [book, allBooks]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="md:w-1/3">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full object-cover rounded-lg border-2 border-yellow-400"
            />
          </div>

          {/* Book Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-black mb-2">{book.title}</h1>
            <div className="text-sm text-gray-500 mb-4">
              (Paperback) | Released: {book.publicationYear || '01 May 1994'}
            </div>
            
            <div className="flex items-center mb-2">
              <p className="text-gray-700">By: <span className="text-blue-600">{book.author}</span></p>
              <span className="mx-2">|</span>
              <p className="text-gray-700">Publisher: <span className="text-blue-600">{book.publisher || 'Consortium Inc'}</span></p>
            </div>
            
            <div className="flex items-center mb-6">
              <p className="text-lg font-semibold">{book.rating || '4.5'}</p>
              <div className="flex text-yellow-400 mx-2">
                {'★'.repeat(Math.floor(book.rating || 4.5))}
                {book.rating % 1 >= 0.5 ? '★' : ''}
                {'☆'.repeat(5 - Math.ceil(book.rating || 4.5))}
              </div>
              <span className="mx-2">|</span>
              <p className="text-gray-700">{book.reviews || '6'} Reviews</p>
            </div>
            
            <hr className="mb-6" />
            
            <div className="text-gray-800 mb-4">
              {book.description || 'Just before dawn one winter\'s morning, a hijacked aeroplane blows apart high above the English Channel and two figures tumble, clutched in an embrace, towards the sea: Gibreel Farishta, India\'s legendary movie star, and Saladin Chamcha, the man of a thousand voices.'}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <p className="text-gray-700">ISBN-10</p>
                <div className="text-center">
                  <div className="inline-block">
                    <img src="https://www.bookswagon.com/images/icons/isbnicon.jpg" alt="ISBN-10 Barcode" className="h-8 mb-1" />
                  </div>
                  <p className="text-sm">{book.isbn10 || '0963270702'}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-700">ISBN-13</p>
                <div className="text-center">
                  <div className="inline-block">
                    <img src="https://www.bookswagon.com/images/icons/isbnicon.jpg" alt="ISBN-13 Barcode" className="h-8 mb-1" />
                  </div>
                  <p className="text-sm">{book.isbn13 || '9780963270702'}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-700">Weight (gr)</p>
                <div className="text-center">
                  <div className="inline-block">
                    <img src="https://www.bookswagon.com/images/icons/weight.png" alt="Weight" className="h-8 mb-1" />
                  </div>
                  <p className="text-sm">{book.weight || '386'}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-700">Dimension(mm)</p>
                <div className="text-center">
                  <div className="inline-block">
                    <img src="https://www.bookswagon.com/images/icons/dimention.png" alt="Dimension" className="h-8 mb-1" />
                  </div>
                  <p className="text-sm">{book.dimensions || '129x48x196'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-800">
                Back to All Booka
              </button>
            </div>
          </div>
        </div>

        {/* Similar Books Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarBooks.length > 0 ? (
              similarBooks.map((similarBook) => (
                <div
                  key={similarBook._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/book/${similarBook._id}`)}
                >
                  {/* Cover Image */}
                  <img
                    src={similarBook.coverImage}
                    alt={similarBook.title}
                    className="w-full h-56 object-cover"
                  />

                  {/* Book Details */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{similarBook.title}</h2>
                    <p className="text-sm text-gray-600">Author: {similarBook.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No similar books found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;