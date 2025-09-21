import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import AdminDashboard from "./components/AdminDashboard";
import Hospital from "./components/HospitalPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/hospital" element={<Hospital />} />

      </Routes>
    </Router>
  );
}

export default App;
