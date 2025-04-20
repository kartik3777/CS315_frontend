import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './vehicles.css';
import { Buffer } from 'buffer';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
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
  
    const formData = new FormData();
    formData.append('name', newVehicle.name);
    formData.append('type', newVehicle.type);
    formData.append('model', newVehicle.model);
    formData.append('year', newVehicle.year);
    formData.append('registration_no', newVehicle.registration_no);
    formData.append('price_per_day', newVehicle.price_per_day);
    formData.append('availability', newVehicle.availability);
  
    // Append multiple images
    for (let i = 0; i < newVehicle.images.length; i++) {
      formData.append('images', newVehicle.images[i]); // "images" is key expected by backend
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/vehicles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Assuming the response returns the newly added vehicle
      const addedVehicle = response.data;
  
      setVehicles(prev => [...prev, addedVehicle]);
      setNewVehicle({ name: '', type: '', model: '', year: '', availability: true, images: [] });
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

  return (
    <div>
      <div className="vehicle-top">
      <h2>Vehicle List</h2>
    <button className='add-button' onClick={() => setShowForm(true)} >
        + Add New Vehicle
      </button>
      </div>
   

      {showForm && (
        <div className='add-vehicle-form'>
          <h3>Add New Vehicle</h3>
          <form onSubmit={handleSubmit}>
            <input type='text' name="name" placeholder="Name" value={newVehicle.name} onChange={handleChange} required />
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
      {vehicles.map((vehicle, index) => (
        <p className='vehicle-data' key={index}>
          <p><strong>Availability:</strong> {vehicle.availability ? 'Yes' : 'No'}</p>
          <p><strong>Type:</strong> {vehicle.type}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Registration_number:</strong> {vehicle.registration_number}</p>
          <p><strong>Price_per_day:</strong> {vehicle.price_per_day}</p>
          <button className='pay-btn'>Buy</button>

          {vehicle.images.map((img, idx) => {
  const hex = img.encoded_image.replace(/^\\x/, '');
  const base64 = Buffer.from(hex, 'hex').toString('base64');
  const imageUrl = `data:image/jpeg;base64,${base64}`;

  return (
    <img key={idx} src={imageUrl} alt={`vehicle-${idx}`} style={{ width: '200px', margin: '10px' }} />
  );
})}

        </p>
      ))}
    </div>
  </div>
  );
};

export default VehicleList;
