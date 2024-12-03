import React, { useEffect, useState } from 'react';
import "./../styles/main.css";

const AgentProfile = ({ id }) => {
  const [agent, setAgent] = useState(null);
  const [learnMore, setLearnMore] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/users/agents/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch agent');
        }
        const data = await response.json();
        console.log('Fetched agent:', data); // Debug log
        setAgent(data);
        setLearnMore(data.learnMore || ''); // Initialize "Learn More" field
      } catch (error) {
        console.error('Error fetching agent:', error);
      }
    };
  
    fetchAgent();
  }, [id]);
  
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ learnMore }), // Send the learnMore field
      });
  
      if (!response.ok) {
        throw new Error('Failed to update agent details');
      }
  
      const updatedAgent = await response.json();
      setAgent(updatedAgent); // Update the state with the latest details
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };
  

  if (!agent) {
    return <p>Loading agent details...</p>;
  }

  return (
    <div className="agent-profile">
      <img
        src={agent.image}
        alt={`${agent.name}'s profile`}
        className="agent-image-large"
      />
      <h2>{agent.name}</h2>
      <p>
        <strong>📞 Phone Number:</strong> {agent.number || 'N/A'}
      </p>
      <p>
        <strong>🏠 Specialty:</strong> {agent.specializations?.join(', ') || 'N/A'}
      </p>
      <p>
        <strong>🕒 Experience:</strong> {agent.experience || 'N/A'} Years
      </p>
      <p>
        <strong>📍 Areas Served:</strong> {agent.areaServed?.join(', ') || 'N/A'}
      </p>
      <div className="learn-more-section">
        <h3>Learn More About {agent.name}</h3>
        {isEditing ? (
          <div>
            <textarea
              value={learnMore}
              onChange={(e) => setLearnMore(e.target.value)}
              rows="5"
              cols="50"
              placeholder="Add more details about yourself..."
            />
            <div className="button-container">
              <button className="btn" onClick={handleSave}>
                Save
              </button>
              <button className="btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{learnMore || 'No additional details provided.'}</p>
            <button className="btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default AgentProfile;
