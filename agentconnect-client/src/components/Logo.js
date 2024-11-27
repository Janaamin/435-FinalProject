// src/components/Logo.js
import React from "react";
import "./logo.png"; 

const Logo = () => {
  return (
    <div className="logo-container">
      <img src="/logo.png" alt="AgentConnect Logo" className="logo" />
      <h1 className="brand-name">AgentConnect</h1>
    </div>
  );
};

export default Logo;
