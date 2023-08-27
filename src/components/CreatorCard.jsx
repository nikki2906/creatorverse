// CreatorCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CreatorCard.css'; // Import the CSS file

const ContentCard = ({ id, name, url, description, imageURL, children }) => {
  return (
    <div className="pico-card-container">
      <Link to={`/ViewCreator/${id}`} className="pico-link">
        <div className="pico-card" style={{ backgroundImage: `url(${imageURL})` }}>
          <div className="pico-content">
            <h5>{name}</h5>
            <p>{description}</p>
            <button onClick={() => window.open(url, "_blank")} className="pico-btn pico-space">Visit Creator's Site</button>
            <Link to={`/EditCreator/${id}`} className="pico-btn pico-secondary">Edit Creator</Link>
            {children}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;
