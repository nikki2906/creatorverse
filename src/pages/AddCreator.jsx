import React, { useState } from 'react';
import { supabase } from '../client';
import './AddCreator.css'; // Import your custom CSS file

const AddCreator = () => {
  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleAddCreator = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('creators')
      .insert([
        { name: name, url: url, description: description, imageURL: imageURL },
      ]);
    
    if (error) {
      console.error('Error adding creator: ', error);
    } else {
      alert('Creator added successfully!');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Add a new creator</h1>
      <form onSubmit={handleAddCreator} className="creator-form">
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="url">URL to their social media:</label>
          <input type="text" id="url" value={url} onChange={e => setURL(e.target.value)} required/>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
          <textarea 
            id="description"
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required 
            rows="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL:</label>
          <p>Provide a link to an image of your creator. Be sure to include the http://</p>
          <input type="text" id="imageURL" value={imageURL} onChange={e => setImageURL(e.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;