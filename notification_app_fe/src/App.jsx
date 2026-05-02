import React, { useState } from 'react';
import axios from 'axios';
import { Play, Loader2, AlertCircle } from 'lucide-react';
import DepotCard from './components/DepotCard';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runScheduler = async () => {
    setLoading(true);
    setError(null);
    try {
      // The backend server is running on port 3000
      const response = await axios.get('http://localhost:3000/schedule');
      if (response.data && response.data.data) {
        setResults(response.data.data);
      } else {
        setResults([]);
        setError("No data returned from scheduler.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch schedule. Ensure the backend is running and CORS is enabled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Vehicle Fleet Scheduler</h1>
        <p className="subtitle">
          Optimize maintenance tasks across all depots using dynamic programming to maximize overall impact.
        </p>
      </header>

      <button 
        className="run-button" 
        onClick={runScheduler} 
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="spin-icon" size={24} />
            Optimizing...
          </>
        ) : (
          <>
            <Play size={24} fill="currentColor" />
            Run Scheduler
          </>
        )}
      </button>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {results.length > 0 ? (
        <div className="results-grid">
          {results.map((depot, index) => (
            <DepotCard 
              key={depot.depotId || index} 
              depot={depot} 
              index={index} 
            />
          ))}
        </div>
      ) : !loading && !error && (
        <div className="empty-state">
          <p>Click "Run Scheduler" to calculate the optimal maintenance tasks.</p>
        </div>
      )}
    </div>
  );
}

export default App;
