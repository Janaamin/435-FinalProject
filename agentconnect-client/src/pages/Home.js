import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAgents } from '../api'; 
import "./../styles/home.css";

const Home = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchAgents(); // Fetch agents from API
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error.response || error.message);
      }
    };

    fetchData();
  }, []);

  const handleLearnMore = (agentId) => {
    navigate(`/agents/${agentId}`); // Navigate to agent profile page
  };

  return (
    <div className="home-container">
      <h1>Our Agents</h1>
      <div className="cards-container">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <div key={agent._id} className="agent-card">
            {/* Picture and Name Container */}
            <div className="agent-top-section">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${agent.image || '/uploads/placeholder.jpg'}`}
                alt={`${agent.name}'s profile`}
                className="agent-image"
              />
              <h2>{agent.name}</h2>
            </div>
          
            {/* Details Section */}
            <div className="agent-details">
              <p><strong>📞 Phone Number:</strong> {agent.number || 'N/A'}</p>
              <p><strong>🏠 Specialty:</strong> {agent.specializations?.join(', ') || 'N/A'}</p>
              <p><strong>🕒 Experience:</strong> {agent.experience || 'N/A'} Years</p>
              <p><strong>📍 Areas Served:</strong> {agent.areaServed?.join(', ') || 'N/A'}</p>
              <button
                className="btn learn-more"
                onClick={() => handleLearnMore(agent._id)}
              >
                Learn More
              </button>
            </div>
          </div>
          
          ))
        ) : (
          <p>No agents found. Please check back later!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
