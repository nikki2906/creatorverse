import React, { useState, useEffect } from 'react';
import ContentCard from '../components/CreatorCard'; 
import './ShowCreators.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const SUPABASE_URL = 'https://nnuhnrmjudxdnvbtazsg.supabase.co/rest/v1';
  const SUPABASE_HEADERS = {
    "apikey": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udWhucm1qdWR4ZG52YnRhenNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwODM1NjgsImV4cCI6MjAwODY1OTU2OH0.CTjUkFB1xgo_pKfQeSzLf4BPPgEocqtIdpU-of7pkbQ',
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udWhucm1qdWR4ZG52YnRhenNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwODM1NjgsImV4cCI6MjAwODY1OTU2OH0.CTjUkFB1xgo_pKfQeSzLf4BPPgEocqtIdpU-of7pkbQ`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };


  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/creators`, {
        method: 'GET',
        headers: SUPABASE_HEADERS
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      setCreators(data);
    } catch (error) {
      console.error('Error fetching creators: ', error);
    }
  };
  

  return (
    <div className="pico-card-list">
      {creators.length > 0 
        ? creators.map((creator) => (
            <ContentCard 
            id={creator.id} 
            name={creator.name} 
            url={creator.url} 
            description={creator.description} 
            imageURL={creator.imageURL}
            cardSize="small"
            />
          ))
        : <p>No creators found.</p>
      }
    </div>
  );
};

export default ShowCreators;