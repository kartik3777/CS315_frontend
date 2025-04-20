import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";

function Profile() {
    const user = useSelector((state) => state.user);
      const [userData, setUserData] = useState({});
    console.log('================user================');
    console.log(user);
    console.log('====================================');

      useEffect(() => {
        setUserData(user);
      }, [user]); // runs whenever user changes
    
  return (
    <div>
   
      <h2>name: {userData?.name}</h2>
        <h2>email: {userData?.email}</h2>
        <h2>id: {userData?.user_id}</h2>
        <h2>role: {userData?.role}</h2>
        
        <h3>vehicles you own:</h3>
        <h3>vechiles you posted:</h3>

    </div>
  )
}

export default Profile


