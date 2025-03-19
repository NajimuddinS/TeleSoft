import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Admin from './pages/Admin'; // Import the Admin component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Regular user dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
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