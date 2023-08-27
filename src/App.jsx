import React, { useState, useEffect } from 'react';
import './App.css';
import ViewCreator from './pages/ViewCreator';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import { supabase } from './client';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function App() {
  const [creators, setCreators] = useState([]);
  const [typedTitle, setTypedTitle] = useState('');
  const title = "WOMENVERSE";

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
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('id, name, url, description, imageURL');

      if (error) {
        console.error('Error fetching creators:', error);
        return;
      } else {
        console.log('data', data);
        setCreators(data);
      }
    };
    fetchCreators();
  }, []);

  useEffect(() => {
    let timeoutId;
    let reverse = false;
  
    const typeLetter = (index) => {
      if (index <= title.length && !reverse) {
        setTypedTitle(title.substring(0, index));
        timeoutId = setTimeout(() => typeLetter(index + 1), 100);
      } else if (index > 0 && reverse) {
        setTypedTitle(title.substring(0, index));
        timeoutId = setTimeout(() => typeLetter(index - 1), 100);
      } else {
        reverse = !reverse;
        if (reverse) {
          timeoutId = setTimeout(() => typeLetter(index - 1), 100);
        } else {
          timeoutId = setTimeout(() => typeLetter(index + 1), 100);
        }
      }
    };
  
    typeLetter(1);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  

  return (
    <BrowserRouter>
      <div className="App-content">
        <h1 className="title">{typedTitle}</h1>
        <nav className="button-box">
          <NavLink className="button" to="/AddCreator">
            Add Creator
          </NavLink>
          <NavLink className="button" to="/ShowCreators">
            Show Creators
          </NavLink>
        </nav>
  
        <Routes>
          <Route path="AddCreator" element={<AddCreator />} />
          <Route path="ShowCreators" element={<ShowCreators />} />
          <Route path="EditCreator/:id" element={<EditCreator />} />
          <Route path="ViewCreator/:id" element={<ViewCreator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );  
}


export default App;
