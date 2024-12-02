import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import "./../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Use React Router's navigation

  useEffect(() => {
    // Reset form data on component mount
    setFormData({
      email: '',
      password: '',
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData); // Login API call
      localStorage.setItem('token', data.token); // Save token in localStorage

      // Decode JWT to fetch user information (if needed)
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
      console.log('User ID:', decodedToken.userId); // Debugging or future use

      alert('Login successful!');
      navigate('/profile'); // Redirect to profile page after login
    } catch (error) {
      console.error('Login Error:', error.response || error.message);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
