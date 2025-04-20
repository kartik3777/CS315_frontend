import React, {useState} from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from './redux/userSlice';
import { saveState } from './redux/localStorage';
import { store } from './redux/store';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    // const[user, setUser] = useState("")
    const [otpFromApi, setOtpFromApi] = useState("");
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      otp: '',
      password: '',
      role:''
    });
    const [message, setMessage] = useState('');
  
    // Toggle between Sign Up and Sign In
    const toggleForm = () => {
      setIsSignUp(!isSignUp);
      setFormData({ name: '', email: '', otp: '', password: '', role:'' });
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
          const response = await axios.post('http://localhost:5000/api/users/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role : formData.role
          });
          console.log(response);
          
          setMessage(response.data.message || 'Sign up successful!');
        } else {

          // Sign In Request
          const response = await axios.post('http://localhost:5000/api/users/login', {
            email: formData.email,
            password: formData.password
          });
          console.log(response.data);
                              ///////////////store data here///////////////////
                              const userData = {
                                ...response.data.user,
                                token: response.data.token, // <-- manually attach token here
                              };
                        
                              dispatch(setUser(userData));
                              saveState(store.getState()); // only saves { user }

          navigate("/nav/home");
          setMessage(response.data.message || 'Sign in successful!');
        }
      } catch (error) {
        console.log(error);
        
        setMessage(error.response?.data?.message || 'An error occurred');
      }
    };

    const hanldeotp = async () => {
            try {
              const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
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
        {
          isSignUp && <> 
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
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
