import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "https://www.bookswagon.com/bannerimages/81_inr.jpg?v=3.6",
    "https://www.bookswagon.com/bannerimages/2_inr.jpg?v=3.6",
    "https://www.bookswagon.com/bannerimages/85_inr.jpg?v=3.6",
    "https://www.bookswagon.com/bannerimages/70_inr.jpg?v=3.6",
    "https://www.bookswagon.com/bannerimages/79_inr.jpg?v=3.6"
  ];
  const categories = [
    { name: "Best Seller", icon: "🏆" },
    { name: "Award Winners", icon: "🏅" },
    { name: "Box Sets", icon: "📦" },
    { name: "International Best Seller", icon: "🌎" },
    { name: "New Arrivals", icon: "📚" },
    { name: "Fictions Books", icon: "📝" },
    { name: "Children Books", icon: "🧸" },
    { name: "Comic Books", icon: "💬" },
    { name: "Tarot Cards", icon: "🃏" }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Handle manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // Handle navigation logic
  const handleNavigation = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Navigate to dashboard if logged in
    } else {
      navigate('/login'); // Navigate to login if not logged in
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" 
                  alt="LibHub" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}  
                />
              </Link>
              <span className="ml-2 text-2xl font-bold text-gray-900">LibHub</span>
            </div>
            
            <div className="flex items-center">
              <Link to="/login" className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="ml-2 font-medium">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Carousel */}
        <div className="relative">
          <div className="overflow-hidden relative h-64 md:h-96">
            {carouselImages.map((image, index) => (
              <div 
                key={index}
                className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                  src={image} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
            {/* Carousel Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'} transition-opacity duration-200`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={handleNavigation} // Navigate on click
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700 text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-red-400 transition-colors duration-200">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-red-400 transition-colors duration-200">Contact Us</Link></li>
                <li><Link to="/careers" className="hover:text-red-400 transition-colors duration-200">Careers</Link></li>
                <li><Link to="/press" className="hover:text-red-400 transition-colors duration-200">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-red-400 transition-colors duration-200">Help Center</Link></li>
                <li><Link to="/faq" className="hover:text-red-400 transition-colors duration-200">FAQs</Link></li>
                <li><Link to="/terms" className="hover:text-red-400 transition-colors duration-200">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-red-400 transition-colors duration-200">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/category/fiction" className="hover:text-red-400 transition-colors duration-200">Fiction</Link></li>
                <li><Link to="/category/non-fiction" className="hover:text-red-400 transition-colors duration-200">Non-Fiction</Link></li>
                <li><Link to="/category/children" className="hover:text-red-400 transition-colors duration-200">Children</Link></li>
                <li><Link to="/category/education" className="hover:text-red-400 transition-colors duration-200">Education</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
              <p className="text-sm text-gray-400">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-gray-900 bg-white rounded-l focus:outline-none"
                />
                <button className="bg-red-600 px-4 py-2 rounded-r hover:bg-red-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} LibHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;