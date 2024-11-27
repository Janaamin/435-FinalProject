import React, { useEffect, useState } from 'react';
import AgentCard from '../components/AgentCard';
import "./../styles/agent-profile.css";

const Profile = () => {
  const [agent, setAgent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(''); // For previewing uploaded images

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in to view your profile');
      return;
    }

    const fetchAgent = async () => {
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/agents/${userData.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch agent. Status: ${response.status}`);
        }

        const data = await response.json();
        setAgent(data);
        setFormData(data);
        setPreviewImage(data.image); // Set the initial image preview
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agent:', error.message);
        alert('Failed to load profile information. Please try again later.');
        setLoading(false);
      }
    };

    fetchAgent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'specializations' || name === 'areaServed') {
      setFormData({ ...formData, [name]: value.split(',').map((v) => v.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setPreviewImage(URL.createObjectURL(file)); // Update the preview to show the selected image
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const formDataObj = new FormData();

      // Append form fields
      for (const key in formData) {
        if (key === 'imageFile' && formData[key]) {
          formDataObj.append('image', formData[key]); // Append the image file
        } else if (key !== 'imageFile') {
          formDataObj.append(key, formData[key]);
        }
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setAgent(updatedData);
      setFormData(updatedData);
      setPreviewImage(updatedData.image); // Update the preview with the saved image URL
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading agent details...</p>;
  }

  if (!agent) {
    return <p>No profile information available.</p>;
  }

  return (
    <div className="agent-profile">
      <h1>My Profile</h1>
      {/* Display AgentCard */}
      <AgentCard
        name={agent.name}
        specialization={agent.specializations?.join(', ')}
        experience={agent.experience}
        image={`${process.env.REACT_APP_BACKEND_URL}${agent.image || '/uploads/placeholder.jpg'}`}
        number={agent.number}
        areaServed={agent.areaServed?.join(', ')} 
      />

      {/* Edit Form */}
      <div className="edit-section">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            disabled={!editMode}
            className="form-input"
          />
        </div>
        <div>
          <label>Specializations:</label>
          <input
            type="text"
            name="specializations"
            value={formData.specializations?.join(', ') || ''}
            onChange={handleChange}
            disabled={!editMode}
            className="form-input"
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="number"
            name="experience"
            value={formData.experience || ''}
            onChange={handleChange}
            disabled={!editMode}
            className="form-input"
          />
        </div>
        <div>
          <label>Areas Served:</label>
          <input
            type="text"
            name="areaServed" 
            value={formData.areaServed?.join(', ') || ''} // Join array for display
            onChange={handleChange}
            disabled={!editMode}
            className="form-input"
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number || ''}
            onChange={handleChange}
            disabled={!editMode}
            className="form-input"
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={!editMode}
            className="form-input"
          />
        </div>
        {editMode ? (
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
