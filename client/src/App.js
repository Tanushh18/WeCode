import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Dashboard from "./screens/Dashboard";
import UserDetails from "./screens/UserDetails";
import CustomRoom from "./Rooms/CustomRoom";
import Livechatroom from "./Rooms/livechatroom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room/:roomId" element={<CustomRoom />} />
        <Route path="/questionroom/:roomId" element={<Livechatroom />} />

        


        

      </Routes>
    </Router>
  );
}

export default App;