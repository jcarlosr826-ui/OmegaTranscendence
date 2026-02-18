import React, { useState } from 'react';
import { scrapeStore } from '../api';


export default function StoreScraper() {
  const [url, setUrl] = useState('');
  const [product, setProduct] = useState(null);


  const handleScrape = async () => {
    try {
      const res = await scrapeStore(url);
      setProduct(res.data.product);
    } catch (err) {
      alert('Failed to scrape product');
    }
  };


  return (
    <div className="container">
      <h1>Store Scraper</h1>
      <input placeholder="Enter product URL" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={handleScrape}>Scrape</button>


      {product && (
        <div className="scraper-result">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      )}
    </div>
  );
}
