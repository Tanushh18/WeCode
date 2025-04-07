import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();


  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env. REACT_APP_REGISTER_URI, formData); // Update the URL as per your backend route
      setMessage('User registered successfully!');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Registration failed1.');
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #0f0c29, #1f1b3a, #121212)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "100px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "30px" }}>
          Register User
        </h2>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '20px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #aaa',
            }}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '20px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #aaa',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '20px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #aaa',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '18px',
              borderRadius: '5px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Register
          </button>
  
          
  
          
            <button
              onClick={navigateToLogin}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '18px',
                borderRadius: '5px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
            
          
          <p style={{ fontSize: '16px', marginBottom: '15px' }}>{message}</p>
        </form>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "10px 20px",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "16px",
          animation: "float 3s ease-in-out infinite",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          zIndex: 4,
        }}
      >
        🟢 Live Auth Server
      </div>
    </div>
  );
};

export default Register;