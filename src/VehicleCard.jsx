import React from 'react';
import './VehicleCard.css';
import { Buffer } from 'buffer';
import Slider from 'react-slick'; // at the top
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const VehicleCard = ({ vehicle }) => {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
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
            <Slider {...sliderSettings}>
              {vehicle.images?.map((img, idx) => {
                const hex = img.encoded_image?.replace(/^\\x/, '');
                const base64 = Buffer.from(hex, 'hex').toString('base64');
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
          </div>
        )}
  
        <button className="pay-btn">Buy</button>
      </div>
    );
  };
  

export default VehicleCard;
