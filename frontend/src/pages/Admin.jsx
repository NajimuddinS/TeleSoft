import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';
import UserList from '../components/UserList';

function Admin() {
  const [activeSection, setActiveSection] = useState('books');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1">
        {activeSection === 'books' ? <BookList /> : <UserList />}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Admin;