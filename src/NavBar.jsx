import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    // Check if user data is already saved in local storage
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : null;
  });
   function logout(){
      localStorage.removeItem('userData'); 
      navigate("/");
    }
  return (
    <div>
         hii i'm navbar
        <h3>name: {userData?.name}</h3>
        <h3>email: {userData?.email}</h3>
        <h3>id: {userData?._id}</h3>
       <button onClick={logout}>log out </button>
    </div>
  )
}

export default NavBar
