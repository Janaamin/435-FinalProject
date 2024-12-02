import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./../styles/agent-details.css";

const AgentDetails = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Unauthorized. Please log in.');
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/agents/${id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch agent details');
        }

        const data = await response.json();
        setAgent(data);
      } catch (error) {
        console.error('Error fetching agent details:', error.message);
      } finally {
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

        {/* Agent Name */}
        <div className="agent-info">
          <h1>{agent.name}</h1>
          <p><strong>📞 Phone Number:</strong> {agent.number || 'N/A'}</p>
          <p><strong>🏠 Specializations:</strong> {agent.specializations?.join(', ') || 'N/A'}</p>
          <p><strong>🕒 Experience:</strong> {agent.experience || 'N/A'} Years</p>
          <p><strong>📍 Areas Served:</strong> {agent.areaServed?.join(', ') || 'N/A'}</p>
        </div>

        {/* More Info Section */}
        <div className="more-info">
          <h2>More About {agent.name}</h2>
          {agent.learnMore ? (
            <p>{agent.learnMore}</p> // Use the dynamically fetched "learnMore" field
          ) : (
            <>
              <p>With over {agent.experience || '0'} years of experience in the industry, {agent.name} is known for their expertise and dedication.</p>
              <p>Contact {agent.name} today to explore real estate opportunities in {agent.areaServed?.join(', ') || 'various locations'}.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
