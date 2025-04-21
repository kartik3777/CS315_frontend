import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users');  // Replace with real API
      // const data = await response.json();
      setUsers(response.data);
      console.log('==users in user==============================');
      console.log(response.data);
      console.log('====================================');
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Vehicles Owned</th>
            <th>Days</th>
            <th>Penalty</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id} onClick={() => navigate(`${user.user_id}`)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.vehicles?.length || 0}</td>
              <td>{user.role}</td>
              <td>₹{user.penalty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
