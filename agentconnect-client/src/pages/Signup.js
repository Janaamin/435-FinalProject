import React, { useState, useEffect } from 'react';
import { signup } from '../api'; // API function for signup
import "./../styles/signup.css"; // Import main styles

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agent',
    number: '',
  });

  useEffect(() => {
    // Reset form data on component mount
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'agent',
      number: '',
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData); // Signup API call
      console.log('Signup Response:', response.data);
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup Error:', error.response || error.message);
      alert('Error during signup. Please check your input.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          required
          className="form-input"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-select"
        >
          <option value="client">Client</option>
          <option value="agent">Agent</option>
        </select>
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
