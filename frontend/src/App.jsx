import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home'; // Import the Home component
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home as the main route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/add-book" element={
        <AdminRoute>
          <AddBook />
        </AdminRoute>
      } />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  );
}

export default App;