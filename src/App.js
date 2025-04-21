import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login'
import NavBar from './NavBar'
import Profile from './Profile';
import Home from './Home';
import VehicleList from './Vehicles';
import Users from './Users';
import UserDetails from './UserDetails';

function App() {

  return (
    <BrowserRouter>
    <Routes>
   
    <Route path="/" element={<Login />} />
    <Route path="Login" element={<Login  />} />
      {/* nested routes below */}
      <Route path="nav" element={<NavBar />}>
          <Route index element={<Home />} />           {/* default route */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetails />} />

        </Route>

    </Routes>
  </BrowserRouter>

  )
}

export default App
