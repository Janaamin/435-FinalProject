import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./../styles/Header.css";
import Logo from "../components/Logo"; // Importing the Logo component

const Header = () => {
  const [search, setSearch] = useState(''); // Search agents field
  const [area, setArea] = useState(''); // Free-typing location input
  const [specialization, setSpecialization] = useState(''); // Dropdown specialization
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      query: search || '', // Search agents query
      area: area || '', // Free-typed location
      specialization: specialization !== 'All Specializations' ? specialization : '', // Dropdown specialization
    }).toString();

    navigate(`/search?${queryParams}`); // Navigate to the correct search endpoint
  };

  return (
    <header>
      {/* Main Header */}
      <div className="main-header">
        <Link to="/" className="logo-link"> 
          <Logo /> 
        </Link>
        <nav className="auth-buttons">
          <Link to="/signup" className="btn">Sign up</Link>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/profile" className="btn">My Profile</Link>
        </nav>
      </div>

      {/* Secondary Header */}
      <div className="search-header">
        <div className="search-bar">
          {/* Search agents input */}
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search Agents"
          />
        </div>
        <div className="filters">
          {/* Free-typing location input */}
          <input
            type="text"
            placeholder="Enter location..."
            value={area}
            onChange={(e) => setArea(e.target.value)}
            aria-label="Enter Location"
            className="location-input"
          />

          {/* Predefined specialization dropdown */}
          <select
            className="dropdown"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            aria-label="Select Specialization"
          >
            <option value="All Specializations">All Specializations</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Luxury Homes">Luxury Homes</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
        <button className="btn search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
