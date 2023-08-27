import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: ""
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('id, name, url, description, imageURL')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };
    fetchCreator();
  }, [id]);

  const handleUpdateCreator = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('creators')
      .update(creator)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating creator: ', error);
    } else {
      alert('Creator updated successfully!');
    }
  };

  const handleInputChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Edit a creator</h1>
      <form onSubmit={handleUpdateCreator} className="creator-form">
        
        <div className="form-group">
          <label>
            Name:
            <input type="text" name="name" value={creator.name} onChange={handleInputChange} required/>
          </label>
        </div>

        <div className="form-group">
          <label>
            URL to their social media!:
            <input type="text" name="url" value={creator.url} onChange={handleInputChange} required/>
          </label>
        </div>

        <div className="form-group">
          <label>
            Description:
            <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
            <textarea 
              name="description" 
              value={creator.description} 
              onChange={handleInputChange} 
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Image URL:
            <p>Provide a link to an image of your creator. Be sure to include the http://</p>
            <input type="text" name="imageURL" value={creator.imageURL} onChange={handleInputChange}/>
          </label>
        </div>

        <button type="submit">Update Creator</button>
      </form>
    </div>
  );
};

export default EditCreator;
