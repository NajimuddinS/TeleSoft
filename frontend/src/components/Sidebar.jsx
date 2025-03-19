import { useState } from 'react';
import { FaBook, FaUsers, FaBars } from 'react-icons/fa';

export default function Sidebar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'books', label: 'Books', icon: <FaBook /> },
    { id: 'users', label: 'Users', icon: <FaUsers /> },
  ];

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
      </nav>
    </div>
  );
}