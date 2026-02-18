import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Card({ title, description, link }) {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(link)}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
