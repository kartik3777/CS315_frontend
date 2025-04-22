import React from 'react';
import './VehicleCard.css';
import { Buffer } from 'buffer';
import Slider from 'react-slick'; // at the top
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';


const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
    const sliderSettings = {
      dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    };
    const handleBuyClick = () => {
      navigate(`${vehicle.vehicle_id}`);
    };
  
    return (
      <div className="vehicle-card">
        <div className="vehicle-info">
         
          <p><strong>Availability:</strong> {vehicle.availability ? 'Yes' : 'No'}</p>
          <p><strong>Type:</strong> {vehicle.type}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Registration Number:</strong> {vehicle.registration_number}</p>
          <p><strong>Price per Day:</strong> ₹{vehicle.price_per_day}</p>
          <p><strong>Owner_name:</strong> {vehicle.owner_name}</p>
          <p><strong>Owner_email:</strong> {vehicle.owner_email}</p>
          <p><strong>Manufacturing_date:</strong> {vehicle.manufacturing_date}</p>
        </div>
  
        {vehicle.images?.length > 0 && (
  <div className="vehicle-slider">
    {vehicle.images.length === 1 ? (
      // Just show the single image
      <img
        src={`data:image/jpeg;base64,${
          btoa(
            vehicle.images[0].encoded_image
              .replace(/^\\x/, '')
              .match(/\w{2}/g)
              .map(a => String.fromCharCode(parseInt(a, 16)))
              .join('')
          )
        }`}
        alt="vehicle"
        className="vehicle-slider-img"
      />
    ) : (
      // Show the slider for multiple images
      <Slider {...sliderSettings}>
        {vehicle.images.map((img, idx) => {
          if (!img.encoded_image) return null;

          const hex = img.encoded_image.replace(/^\\x/, '');
          const base64 = btoa(
            hex.match(/\w{2}/g).map(a => String.fromCharCode(parseInt(a, 16))).join('')
          );
          const imageUrl = `data:image/jpeg;base64,${base64}`;

          return (
            <div key={idx} className="vehicle-slide">
              <img
                src={imageUrl}
                alt={`vehicle-${idx}`}
                className="vehicle-slider-img"
              />
            </div>
          );
        })}
      </Slider>
    )}
  </div>
)}
  
  {vehicle.availability && <button onClick={handleBuyClick} className="pay-btn">Buy</button> }
       
      </div>
    );
  };
  

export default VehicleCard;
