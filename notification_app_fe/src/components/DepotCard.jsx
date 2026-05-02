import React from 'react';
import { MapPin, Zap, Wrench } from 'lucide-react';

const DepotCard = ({ depot, index }) => {
  return (
    <div 
      className="depot-card" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header">
        <div className="depot-id">
          <MapPin size={22} color="#8b5cf6" />
          {depot.depotId}
        </div>
        <div className="impact-badge">
          <Zap size={16} fill="currentColor" />
          {depot.totalImpact} Impact
        </div>
      </div>
      
      <div className="tasks-section">
        <h3>
          <Wrench size={18} />
          Scheduled Tasks ({depot.tasks.length})
        </h3>
        {depot.tasks.length > 0 ? (
          <div className="tasks-list">
            {depot.tasks.map((task, i) => (
              <span key={i} className="task-tag">
                {task}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>
            No tasks scheduled.
          </p>
        )}
      </div>
    </div>
  );
};

export default DepotCard;
