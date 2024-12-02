import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AgentProfile from './components/AgentProfile'; // For agent details
import Profile from './pages/Profile'; // Profile for logged-in user
import SearchResults from './pages/SearchResults';
import AgentDetails from './pages/AgentDetails';

import "./styles/main.css";

const App = () => (
  <Router>
    <div className="app-container">
      <Header />
      <main>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profile" element={<Profile />} /> 
  <Route path="/search" element={<SearchResults />} />
  <Route path="/agents/:id" element={<AgentDetails />} /> {/* Use only AgentDetails */}
</Routes>

      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
