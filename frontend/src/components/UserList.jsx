import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    if (!token) {
      toast.error('You are not authorized to access this page');
      setIsLoading(false); // Set loading to false even if there's an error
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const response = await axios.get('https://telesoft-2ubl.onrender.com/api/auth/getusers', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setUsers(response.data); // Set the users state with the fetched data
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false); // End loading whether successful or not
    }
  };

  const Spinner = () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Users Management</h2>
      
      {isLoading ? (
        <Spinner /> // Show the spinner when loading
      ) : (
        <div className="overflow-x-auto">
          {users.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}