import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import VehicleCard from './VehicleCard';

function Profile() {
    const user = useSelector((state) => state.user);
     const [vehicles, setVehicles] = useState([]);
      const [userData, setUserData] = useState({});
      useEffect(() => {
        const fetchDetails = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/${user.user_id}`);  // API call by user ID

          setVehicles(response.data.vehiclesRented);
          console.log("user id array");
          console.log(response.data);
        };
    
        fetchDetails();
      }, [user.user_id]);

      useEffect(() => {
        setUserData(user);
      }, [user]); // runs whenever user changes
    
  return (
    <div>
   
      <h2>name: {userData?.name}</h2>
        <h2>email: {userData?.email}</h2>
        <h2>id: {userData?.user_id}</h2>
        <h2>role: {userData?.role}</h2>
        
        <h3>vehicles you rented:</h3>
        {vehicles && vehicles.length > 0 ? (
        vehicles.map((vehicle, index) => (
          <VehicleCard key={index} vehicle={vehicle.vehicleDetails} />
        ))
      ) : (
        <p className="no-vehicles">No vehicles found.</p>
      )}

        <h3>vechiles you posted:</h3>

    </div>
  )
}

export default Profile


