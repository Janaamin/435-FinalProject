import React, { useEffect, useState } from 'react';
import AgentCard from '../components/AgentCard';
import "./../styles/agent-profile.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [agent, setAgent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(''); // For previewing uploaded images
  const navigate = useNavigate(); // Initialize navigate for redirection

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
        setFormData({
          ...data,
          specializations: data.specializations?.join(', ') || '', // Convert array to string for editing
          areaServed: data.areaServed?.join(', ') || '', // Convert array to string for editing
        });
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

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!agent || !agent._id) {
        console.error("Agent ID is undefined");
        alert("Failed to delete account. Please try again.");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/profile/${agent._id}`, // Ensure _id is passed correctly
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      alert("Your account has been deleted successfully.");
      localStorage.removeItem("token"); // Clear user token
      navigate("/signup"); // Redirect to sign-up page
    } catch (error) {
      console.error("Error deleting account:", error.message);
      alert("Failed to delete your account. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value, // Update form data for editing
    });
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

      // Normalize specializations and areas served into arrays
      const normalizedFormData = {
        ...formData,
        specializations: formData.specializations
          ?.split(',')
          .map((v) => v.trim())
          .filter(Boolean), // Convert string to array
        areaServed: formData.areaServed
          ?.split(',')
          .map((v) => v.trim())
          .filter(Boolean), // Convert string to array
      };

      // Append form fields
      for (const key in normalizedFormData) {
        if (key === 'imageFile' && normalizedFormData[key]) {
          formDataObj.append('image', normalizedFormData[key]); // Append the image file
        } else if (key !== 'imageFile') {
          formDataObj.append(key, normalizedFormData[key]);
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
      setFormData({
        ...updatedData,
        specializations: updatedData.specializations?.join(', ') || '', // Convert array to string for editing
        areaServed: updatedData.areaServed?.join(', ') || '', // Convert array to string for editing
      });
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
      <AgentCard
        name={agent.name}
        specialization={agent.specializations?.join(', ')}
        experience={agent.experience}
        image={`${process.env.REACT_APP_BACKEND_URL}${agent.image || '/uploads/placeholder.jpg'}`}
        number={agent.number}
        areaServed={agent.areaServed?.join(', ')} 
      />

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
            value={formData.specializations || ''}
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
            value={formData.areaServed || ''} // Ensure areas served is displayed
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
        <button className="btn delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
