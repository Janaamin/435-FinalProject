import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AgentCard from '../components/AgentCard';
import "./../styles/SearchResults.css";

const SearchResults = () => {
  const [agents, setAgents] = useState([]); // State to store fetched agents
  const location = useLocation(); // Get search parameters from URL

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/agents/search${location.search}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }

        const data = await response.json();
        console.log('Fetched Agents:', data); // Debugging log
        setAgents(data);
      } catch (error) {
        console.error('Error fetching agents:', error.message);
      }
    };

    fetchAgents();
  }, [location.search]);

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <div className="cards-container">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <AgentCard
              key={agent._id}
              name={agent.name}
              specialization={agent.specializations?.join(', ') || 'N/A'} // Display specializations
              experience={agent.experience || 'N/A'} // Display experience
              image={`${process.env.REACT_APP_BACKEND_URL}${agent.image || '/uploads/placeholder.jpg'}`} // Display image
              number={agent.number || 'N/A'} // Display phone number
              areaServed={agent.areaServed?.length ? agent.areaServed.join(', ') : 'N/A'} // Correctly display areas served
            />
          ))
        ) : (
          <p>No agents found. Please refine your search or broaden your filters.</p> // Updated message
        )}
      </div>
    </div>
  );
};

export default SearchResults;
