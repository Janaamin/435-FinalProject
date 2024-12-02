import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./../styles/agent-details.css";

const AgentDetails = () => {
  const { id } = useParams(); // Get the agent ID from the URL
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/agents/${id}`);
        console.log('Raw response:', response); // Debug: Log raw response
        if (!response.ok) throw new Error(`Failed to fetch agent details. Status: ${response.status}`);
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid JSON response from server');
        }
  
        const data = await response.json();
        setAgent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agent details:', error.message);
        setLoading(false);
      }
    };
  
    fetchAgent();
  }, [id]);
  

  if (loading) return <p className="loading-message">Loading agent details...</p>;

  if (!agent) return <p className="error-message">Agent not found.</p>;

  return (
    <div className="agent-details-container">
      <div className="agent-details-card">
        {/* Profile Image */}
        <div className="agent-image-container">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${agent.image || '/uploads/placeholder.jpg'}`}
            alt={`${agent.name}'s profile`}
            className="agent-profile-image"
          />
        </div>

        {/* Agent Information */}
        <div className="agent-info">
          <h1>{agent.name}</h1>
          <p><strong>📞 Phone Number:</strong> {agent.number || 'N/A'}</p>
          <p><strong>🏠 Specializations:</strong> {agent.specializations?.join(', ') || 'N/A'}</p>
          <p><strong>🕒 Experience:</strong> {agent.experience || 'N/A'} Years</p>
          <p><strong>📍 Areas Served:</strong> {agent.areaServed?.join(', ') || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
