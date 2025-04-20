import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import VehicleList from './Vehicles';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const location = useLocation();


  useEffect(() => {
    setUserData(user);
  }, [user]); // runs whenever user changes

  console.log(userData); 
  

   function logout(){
    dispatch(logout());
    // localStorage.clear();
     navigate("/");
     window.location.reload();
    }
    function test(){
      navigate("/nav/test");
    }
  return (
    <div>
         {/* hii i'm navbar
        <h3>name: {userData?.name}</h3>
        <h3>email: {userData?.email}</h3>
        <h3>id: {userData?._id}</h3>
       <button onClick={logout}>log out </button>
       <button onClick={test}>test</button>
       <VehicleList /> */}
      <>
      <nav className="navbar">
        <div className="navbar-brand">MyApp</div>
        <ul className="navbar-menu">
          <li>
            <Link
              to="home"
              className={`navbar-item ${location.pathname.endsWith('/home') || location.pathname === '/nav' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="vehicles"
              className={`navbar-item ${location.pathname.endsWith('/vehicles') ? 'active' : ''}`}
            >
              Vehicles
            </Link>
          </li>
          <li>
            <Link
              to="profile"
              className={`navbar-item ${location.pathname.endsWith('/profile') ? 'active' : ''}`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </>
       
    </div>
  )
}

export default NavBar
