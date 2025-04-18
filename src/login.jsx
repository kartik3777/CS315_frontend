import React, {useState} from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const[user, setUser] = useState("")
    const [otpFromApi, setOtpFromApi] = useState("");
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      otp: '',
      password: ''
    });
    const [message, setMessage] = useState('');
  
    // Toggle between Sign Up and Sign In
    const toggleForm = () => {
      setIsSignUp(!isSignUp);
      setFormData({ name: '', email: '', otp: '', password: '' });
      setMessage('');
    };
  
    // Handle form data change
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(otpFromApi != formData.otp){
        alert("otp not matched");
        setMessage(''); // Clear previous messages
        return;
      }
      setMessage(''); // Clear previous messages
  
      try {
        if (isSignUp) {
          // Sign Up Request
          const response = await axios.post('http://localhost:5000/api/user/signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
          console.log(response);
          
          setMessage(response.data.message || 'Sign up successful!');
        } else {

          // Sign In Request
          const response = await axios.post('http://localhost:5000/api/user/login', {
            email: formData.email,
            password: formData.password
          });
          console.log(response.data);
          // setUser(response.data.data.user.name);
          localStorage.setItem('userData', JSON.stringify(response.data.data.user));
          navigate("/nav");
          setMessage(response.data.message || 'Sign in successful!');
        }
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred');
      }
    };

    const hanldeotp = async () => {
            try {
              const response = await axios.post('http://localhost:5000/api/user/sendotp', {
               email : formData.email
              });
              alert("otp sended !!");
              //set the otp
              setOtpFromApi(response.data.otp);
              console.log(response);
              
            } catch (error) {
              alert("send otp error");
            }
    }

    // function getdata(){
    //   console.log("data from local storage");
    //   const savedData = localStorage.getItem('userData');
    //   console.log(JSON.parse(savedData));
    //   setUser(JSON.parse(savedData).name);
    // }
    // function logout(){
    //   setUser("");
    //   localStorage.removeItem('userData'); 
    // }

  return (
    <div style={{padding: isSignUp? "40px 30px": "70px 30px"}} className="login-outer">
    <div className="auth-container">
      <h2 style={{margin:isSignUp ? "5px":"8px 0px 35px 0px"}}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {isSignUp && (
          <>
               <label className='labels' htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}
         <label className='labels' htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Write your email"
          id='email-input'
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        {
          isSignUp && <>
          <div onClick={hanldeotp} className="otp-btn">Send Otp</div>
          
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </>
        }
          <label className='labels' htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div style={{marginTop:"12px"}}>
        <p>You do not have an account?
             <span onClick={toggleForm} className='sign-up-link'>
                 {isSignUp ? 'Sign In' : 'Sign Up'}
             </span>
        </p>
        <p id='forgot'>forgot your password</p>
        </div>
        <p id="message">{message}</p>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
        {/* <h3 onClick={getdata}>get data</h3>
        <h4>{user}</h4>
        <h3 onClick={logout}>log out</h3> */}
    </div>
    </div>
  )
}

export default Login
