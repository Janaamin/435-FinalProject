import React, { useEffect, useState } from 'react';
import "./../styles/main.css";

const AgentProfile = ({ id }) => {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/users/agents/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch agent');
        }
        const data = await response.json();
        setAgent(data);
      } catch (error) {
        console.error('Error fetching agent:', error);
      }
    };

    fetchAgent();
  }, [id]);

  if (!agent) {
    return <p>Loading agent details...</p>;
  }

  return (
    <div className="agent-profile">
      <img src={agent.image} alt={`${agent.name}'s profile`} className="agent-image-large" />
      <h2>{agent.name}</h2>
      <p><strong>📞 Phone Number:</strong> {agent.number || 'N/A'}</p> {/* Updated field */}
      <p><strong>🏠 Specialty:</strong> {agent.specializations?.join(', ') || 'N/A'}</p>
      <p><strong>🕒 Experience:</strong> {agent.experience || 'N/A'} Years</p>
      <p><strong>📍 Areas Served:</strong> {agent.areaServed?.join(', ') || 'N/A'}</p>
    </div>
  );
  
};

export default AgentProfile;
