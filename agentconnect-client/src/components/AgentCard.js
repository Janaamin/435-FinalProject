const AgentCard = ({ name, specialization, experience, image, number, areaServed}) => (
  <div className="agent-card">
    <img src={image || 'https://via.placeholder.com/150'} alt={`${name}'s profile`} />
    <div className="agent-details">
      <h2>{name}</h2>
      <p><strong>Specialization:</strong> {specialization}</p>
      <p><strong>Experience: </strong>{experience} years</p>
      <p><strong>Phone Number: </strong> {number || 'N/A'}</p>
      <p><strong>Areas Served:</strong> {areaServed || 'N/A'}</p>

    </div>
  </div>
);

export default AgentCard;
