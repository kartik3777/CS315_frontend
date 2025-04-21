import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserDetails.css';
import axios from 'axios';
import VehicleCard from './VehicleCard';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);  // API call by user ID
    //   const data = await response.json();
      setUser(response.data.user);
      setVehicles(response.data.vehiclesRented);
      console.log("user id array");
      console.log(response.data);
    };

    fetchDetails();
  }, [userId]);

  if (!user) return <p className="loading-text">Loading user details...</p>;

  return (
    <div className="user-details">
      <h2>Profile:</h2>
      <div className="user-info">
        <p>Name: {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* <p><strong>Vehicles Owned:</strong> {user.vehicles?.join(', ') || 'None'}</p> */}
        <p><strong>Penalty:</strong> ₹{user.penalty}</p>
        <h2>vehicles rented by user:</h2>


        {vehicles && vehicles.length > 0 ? (
        vehicles.map((vehicle, index) => (
          <VehicleCard key={index} vehicle={vehicle.vehicleDetails} />
        ))
      ) : (
        <p className="no-vehicles">No vehicles found.</p>
      )}

      </div>
    </div>
  );
};

export default UserDetails;
