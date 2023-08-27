import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';
import ContentCard from '../components/CreatorCard';
import './ViewCreator.css';

const ViewCreator = () => {
  const { id } = useParams(); 
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
  
    const startHue = 200; // Hue value for baby blue
    const endHue = 240;   // Hue value for dark/navy blue
  
    const startSaturation = 80;  // Saturation for baby blue
    const endSaturation = 100;   // Saturation for dark/navy blue
  
    const startLightness = 95;  // Lightness for baby white
    const endLightness = 20;   // Lightness for dark/navy blue
  
    const currentHue = startHue - scrollFraction * (startHue - endHue);
    const currentSaturation = startSaturation - scrollFraction * (startSaturation - endSaturation);
    const currentLightness = startLightness - scrollFraction * (startLightness - endLightness);
  
    document.body.style.background = `linear-gradient(to bottom, hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%), hsl(${currentHue}, ${currentSaturation}%, ${currentLightness - 30}%))`;
  });
  
  useEffect(() => {
    fetchCreator();
  }, [id]);


  const fetchCreator = async () => {
    const { data, error } = await supabase
      .from('creators')
      .select('id, name, url, description, imageURL')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching creator: ', error);
    } else {
      setCreator(data);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator: ', error);
    } else {
      alert('Creator deleted successfully!');
      navigate('/ShowCreators'); // navigate back to the list of creators
    }
  };

  return (
    <div>
      {creator ? (
        <>
          <ContentCard 
  id={creator.id} 
  name={creator.name} 
  url={creator.url} 
  description={creator.description} 
  imageURL={creator.imageURL}
  cardSize="small"
>

            <button onClick={handleDelete} style={{backgroundColor: 'red', color: 'white'}}>Delete Creator</button>
          </ContentCard>
        </>
        ) : <p>Loading...</p>
      }
    </div>
  );
  
};

export default ViewCreator;
