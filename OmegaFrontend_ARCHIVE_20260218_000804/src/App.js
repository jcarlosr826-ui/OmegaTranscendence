import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StoreScraper from './pages/StoreScraper';
import CreditRepair from './pages/CreditRepair';


export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scraper" element={<StoreScraper />} />
          <Route path="/credit" element={<CreditRepair />} />
        </Routes>
      </div>
    </Router>
  );
}
