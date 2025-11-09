import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling
import { FiLogOut } from "react-icons/fi"; // Logout icon
import logo from "./assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // Get user role from localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("role"); // Remove role
    localStorage.removeItem("ally-supports-cache"); // Remove role
    localStorage.removeItem("debug");
    localStorage.removeItem("state");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("viewedEvents");
    navigate("/", { replace: true });
    window.location.reload(); // Redirect to the home page or landing page
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="EduVents Logo" />
      </div>

      <div className="navbar-links">
        <Link to="/events">HOME</Link>
        {/* Conditional rendering based on user role */}
        {userRole === "coordinator" ? (
          <Link to="/creatorevents">OUR EVENTS</Link> // Updated link for coordinators
        ) : (
          <Link to="/myevents">MY EVENTS</Link>
        )}
        <Link to="/profile">PROFILE</Link>
      </div>
      <div className="navbar-logout" onClick={() => handleLogout()}>
        <FiLogOut size={24} color="black" />
      </div>
    </nav>
  );
};

export default Navbar;
