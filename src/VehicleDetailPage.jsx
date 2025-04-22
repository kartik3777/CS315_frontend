// VehicleDetailsPage.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './VehicleDetailPage.css';

const VehicleDetailsPage = () => {
  const { vehicle_id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${vehicle_id}`);
        setVehicle(res.data.vehicleDetails);
        console.log('=============vehicle detail====================');
        console.log(res.data);
        console.log('====================================');
      } catch (err) {
        console.error('Error fetching vehicle:', err);
      }
    };
  
    fetchVehicle();
  }, [vehicle_id]);
  

  if (!vehicle) return <div>Loading...</div>;

  const totalPrice = days * vehicle.price_per_day;

  return (
    <div className="vehicle-details-container">
        <div className="veh_det">
        <h2>Vehicle Details</h2>
      <p><strong>Type:</strong> {vehicle.type}</p>
      <p><strong>Model:</strong> {vehicle.model}</p>
      <p><strong>Registration Number:</strong> {vehicle.registration_number}</p>
      <p><strong>Price per Day:</strong> ₹{vehicle.price_per_day}</p>
      <p><strong>Owner:</strong> {vehicle.owner_name} ({vehicle.owner_email})</p>
        </div>
      
      <div className="booking-form">
        <h3>Book this vehicle</h3>
        <label>
          Number of Days:
          <input
            type="number"
            min="1"
            value={days}
            onChange={e => setDays(Number(e.target.value))}
          />
        </label>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
        <button className="pay-btn">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
