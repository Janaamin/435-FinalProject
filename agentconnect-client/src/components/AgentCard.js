const AgentCard = ({ name, specialization, experience, image, number}) => (
  <div className="agent-card">
    <img src={image || 'https://via.placeholder.com/150'} alt={`${name}'s profile`} />
    <div className="agent-details">
      <h2>{name}</h2>
      <p>Specialization: {specialization}</p>
      <p>Experience: {experience} years</p>
      <p>Phone Number: {number || 'N/A'}</p>
    </div>
  </div>
);

export default AgentCard;
