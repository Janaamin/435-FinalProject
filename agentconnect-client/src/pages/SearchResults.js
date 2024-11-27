import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AgentCard from '../components/AgentCard';
import "./../styles/SearchResults.css";

const SearchResults = () => {
  const [agents, setAgents] = useState([]);
  const location = useLocation();

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
        console.log('Fetched Agents:', data); 
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
              specialization={agent.specializations?.join(', ')}
              experience={agent.experience}
              image={`${process.env.REACT_APP_BACKEND_URL}${agent.image || '/uploads/placeholder.jpg'}`}
              number={agent.number}
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
