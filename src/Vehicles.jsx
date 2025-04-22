import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './vehicles.css';
import { useSelector } from "react-redux";

import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const user = useSelector((state) => state.user);
  const [selected, setSelected] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    type: '',
    model: '',
    year: '',
    price_per_day:'',
    registration_no:'',
    availability: true,
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewVehicle(prev => ({ ...prev, images: files }));

    // Generate previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
  setImagePreviews(prev => [...prev, ...newPreviews]); // Append to existing previews
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVehicle(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullDate = `${newVehicle.year}-01-01`; // or any fixed month/day you want
  
    const formData = new FormData();
    formData.append('owner_id', user.user_id);
    formData.append('type', newVehicle.type);
    formData.append('model', newVehicle.model);
    formData.append('manufacturing_date', fullDate);
    formData.append('registration_number', newVehicle.registration_no);
    formData.append('price_per_day', newVehicle.price_per_day);
    // formData.append('availability', newVehicle.availability);
  
    // Append multiple images
    for (let i = 0; i < newVehicle.images.length; i++) {
      formData.append('encoded_image', newVehicle.images[i]); // "images" is key expected by backend
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/vehicles/addVehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Assuming the response returns the newly added vehicle
      const addedVehicle = response.data;
  
      setVehicles(prev => [...prev, addedVehicle]);
      setNewVehicle({ type: '',registration_no:'',price_per_day:'', model: '', year: '', availability: true, images: [] });
      setImagePreviews([]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle');
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicles'); // Replace with your API
      console.log("vehicles");
      console.log(response);
      
      setVehicles(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading) return <p>Loading vehicles...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAvailable = async () => {
    setSelected('available');
    try {
      setLoading(true);
      const url = 'http://localhost:5000/api/vehicles/available';
      const res = await axios.get(url);
      console.log('========available=======================');
      console.log(res.data);
      console.log('====================================');
      setVehicles(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  };
  const handleRented = async () => {
    setSelected('rented');
    setLoading(true);
    try {
      const url = 'http://localhost:5000/api/vehicles/currentbooked';
      const res = await axios.get(url);
      console.log('==============rented=================');
      console.log(res.data);
      console.log('====================================');
      setVehicles(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  };



  return (
    <div>
      <div className="vehicle-top">
      <h2>Vehicle List</h2>
      <div className="vehicle-filter">
      <button
        className={`btn-filter ${selected === 'available' ? 'active' : ''}`}
        onClick={handleAvailable}
      >
        Available
      </button>
      <button
        className={`btn-filter ${selected === 'rented' ? 'active' : ''}`}
        onClick={handleRented}
      >
        Rented
      </button>
    </div>

    <button className='add-button' onClick={() => setShowForm(true)} >
        + Add New Vehicle
      </button>
      </div>
   

      {showForm && (
        <div className='add-vehicle-form'>
          <h3>Add New Vehicle</h3>
          <form onSubmit={handleSubmit}>
            {/* <input type='text' name="name" placeholder="Name" value={newVehicle.name} onChange={handleChange} required /> */}
            <input type='text' name="type" placeholder="Type" value={newVehicle.type} onChange={handleChange} required />
            <input type='text' name="model" placeholder="Model" value={newVehicle.model} onChange={handleChange} required />
            <input type='text' name="year" placeholder="Year" value={newVehicle.year} onChange={handleChange} required />
            <input type='text' name="registration_no" placeholder="registration_no" value={newVehicle.registration_no} onChange={handleChange} required />
            <input type='text' name="price_per_day" placeholder="price_per_day" value={newVehicle.price_per_day} onChange={handleChange} required />
            <label>
              Available: <input type="checkbox" name="availability" checked={newVehicle.availability} onChange={handleChange} />
            </label>
            <br />
            <input type="file" multiple onChange={handleImageChange} accept="image/*" />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {imagePreviews.map((src, idx) => (
                <img key={idx} src={src} alt={`preview-${idx}`} style={{ width: '100px', height: 'auto' }} />
              ))}
            </div>
            <br />
            <button type="submit">Add Vehicle</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}

    <div className='vehicle-cont'>
      {vehicles && vehicles.length > 0 ? (
        vehicles.map((vehicle, index) => (
          <VehicleCard key={index} vehicle={vehicle} />
        ))
      ) : (
        <p className="no-vehicles">No vehicles found.</p>
      )}
    </div>
  </div>
  );
};

export default VehicleList;
