import { useState } from 'react';
import { FaBook, FaUsers, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    { id: 'books', label: 'Books', icon: <FaBook /> },
    { id: 'users', label: 'Users', icon: <FaUsers /> },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role'); // Remove role from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-700 rounded">
          <FaBars />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center p-4 hover:bg-gray-700 ${
              activeSection === item.id ? 'bg-gray-700' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-4 hover:bg-gray-700"
        >
          <span className="text-xl"><FaSignOutAlt /></span>
          {isOpen && <span className="ml-4">Logout</span>}
        </button>
      </nav>
    </div>
  );
}