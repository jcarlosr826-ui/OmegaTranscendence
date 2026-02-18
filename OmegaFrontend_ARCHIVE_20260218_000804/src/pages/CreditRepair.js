import React, { useState } from 'react';
import { generateDisputeLetter } from '../api';


export default function CreditRepair() {
  const [reportItem, setReportItem] = useState('');
  const [reason, setReason] = useState('');
  const [letter, setLetter] = useState('');


  const handleSubmit = async () => {
    try {
      const res = await generateDisputeLetter(reportItem, reason);
      setLetter(res.data.disputeLetter);
    } catch (err) {
      alert('Failed to generate letter');
    }
  };


  return (
    <div className="container">
      <h1>AI Credit Repair</h1>
      <input placeholder="Report Item" value={reportItem} onChange={e => setReportItem(e.target.value)} />
      <input placeholder="Dispute Reason" value={reason} onChange={e => setReason(e.target.value)} />
      <button onClick={handleSubmit}>Generate Letter</button>


      {letter && (
        <div className="letter-output">
          <h2>Dispute Letter</h2>
          <pre>{letter}</pre>
        </div>
      )}
    </div>
  );
}
