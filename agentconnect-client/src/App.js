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

import "./styles/main.css";

const App = () => (
  <Router>
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home displays agents */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agents/:id" element={<AgentProfile />} /> {/* Agent Profile */}
          <Route path="/profile" element={<Profile />} /> {/* Logged-in user's profile */}
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
