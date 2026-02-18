import React from 'react';
import Card from '../components/Card';


export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to Omega Transcendence</h1>
      <div className="cards">
        <Card title="Store Scraper" description="Scrape products from any store in seconds." link="/scraper" />
        <Card title="AI Credit Repair" description="Generate credit dispute letters instantly." link="/credit" />
      </div>
    </div>
  );
}
