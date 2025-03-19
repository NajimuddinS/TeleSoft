import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const [allBooks, setAllBooks] = useState([]); // Store all books
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    // Redirect admin users to the admin panel
    if (isAdmin) {
      navigate("/admin");
      return;
    }
    
    fetchAllBooks();
  }, []); 

  const fetchAllBooks = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await api.get("/books"); // Fetch all books
      setAllBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Filter books based on search query
  const filteredBooks = allBooks.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
  });

  // Recalculate totalPages based on filtered books
  const totalPages = Math.ceil(filteredBooks.length / limit);

  // Paginate the filtered books
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * limit, // Start index
    currentPage * limit // End index
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to the first page when changing the limit
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-80 bg-gray-300"></div> {/* Image placeholder */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div> {/* Title placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Author placeholder */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Library Dashboard</h1>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by title, author, or genre"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to the first page when search query changes
              }}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: limit }).map((_, index) => (
                <SkeletonLoader key={index} /> // Show skeleton while loading
              ))
            : paginatedBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/book/${book._id}`)}
                >
                  {/* Cover Image */}
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-80 object-cover"
                  />

                  {/* Book Details */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
                    <p className="text-sm text-gray-600">Author: {book.author}</p>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-8">
          <ul className="flex items-center -space-x-px h-10 text-base">
            {/* Previous Button */}
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    currentPage === page
                      ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Dashboard;