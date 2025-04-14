import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// require("dotenv").config();

const LoginScreen = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverstatus, setServerStatus] = useState("");
  

  useEffect(() => {
    checkserverstatus();
  }, []);

  
    const navigate = useNavigate();

    const navigation = () => {
        navigate("/register");
    };
  
    const handlelogin = async () => {
        try {
            const response = await axios.post(
                process.env.REACT_APP_LOGIN_URI,
                { email, password },
                { withCredentials: true } // ✅ Ensure cookies are set from backend // this is used to send the credentials during a login
            );
            
          setMessage(response.data.message);
          navigate("/Feed");
          
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Login failed.");
            
        }
    };
  
   
    const checkserverstatus = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_CHECK);
        // console.log(response.data);
        setServerStatus("🟢 Live Server");
      } catch (error) {
        // console.error(error);
        setServerStatus("🔴 Down Server");
      }
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
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Login Screen
          </h1>
      
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlelogin();
            }}
          >
            <input
              type="text"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "20px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #aaa",
              }}
            />
      
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "20px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #aaa",
              }}
            />
      
            <button
              type="submit"
              onClick={handlelogin}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "18px",
                borderRadius: "5px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                marginBottom: "20px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              Login
            </button>
      
            <button
              type="button"
              onClick={navigation}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "18px",
                borderRadius: "5px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0069d9")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              Register
            </button>
          </form>
          
          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {message}
            </div>
          )}
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
          {serverstatus}

        </div>
        


        
          
      </div>
    );
};

export default LoginScreen ;
