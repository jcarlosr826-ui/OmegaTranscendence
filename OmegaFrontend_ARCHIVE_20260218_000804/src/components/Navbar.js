import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Omega Transcendence</h1>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/scraper">Store Scraper</Link></li>
        <li><Link to="/credit">AI Credit Repair</Link></li>
      </ul>
    </nav>
  );
}
