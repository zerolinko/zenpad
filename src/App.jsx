import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateToken from './pages/CreateToken';
import TokenDetail from './pages/TokenDetail';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateToken />} />
        <Route path="/token/:address" element={<TokenDetail />} />
      </Routes>
    </Router>
  );
}
