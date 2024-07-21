import React, { useState, useEffect } from 'react';
import './user.css'; // Ensure this file exists and is correctly named

const User = () => { // Capitalize component name
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLoggedInUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/logged-in-users');
        const data = await response.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchLoggedInUsers();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Logged-In Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User; // Correct export statement
