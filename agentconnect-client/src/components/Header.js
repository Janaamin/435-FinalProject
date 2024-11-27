import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./../styles/Header.css";

const Header = () => {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      query: search || '',
      area: area !== 'All Areas' ? area : '',
      specialization: specialization !== 'All Specializations' ? specialization : '',
    }).toString();
  
    navigate(`/search?${queryParams}`); // Navigate to the correct search endpoint
  };
  
  

  return (
    <header>
      {/* Main Header */}
      <div className="main-header">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="/logo.svg" alt="AgentConnect Logo" className="logo" />
            <h1 className="brand-name">AgentConnect</h1>
          </Link>
        </div>
        <nav className="auth-buttons">
          <Link to="/signup" className="btn">Sign up</Link>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/profile" className="btn">My Profile</Link>
        </nav>
      </div>

      {/* Secondary Header */}
      <div className="search-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search Agents"
          />
        </div>
        <div className="filters">
        <select
  className="dropdown"
  value={area}
  onChange={(e) => setArea(e.target.value)}
  aria-label="Select Area"
>
  <option value="All Areas">All Areas</option>
  <option value="New York">New York</option>
  <option value="Los Angeles">Los Angeles</option>
</select>
<select
  className="dropdown"
  value={specialization}
  onChange={(e) => setSpecialization(e.target.value)}
  aria-label="Select Specialization"
>
  <option value="All Specializations">All Specializations</option>
  <option value="Residential">Residential</option>
  <option value="Commercial">Commercial</option>
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
