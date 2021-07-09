import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [albumId, setAlbumId] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const fetchRequest = (e, id) => {
    e.preventDefault();
    if (id > 0 && id < 101) {
      if (photos.length > 1) {
        setPhotos([]);
      }
      axios
        .get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then((res) => getAlbum(res.data));
    } else {
      setError(true);
      setPhotos(false);
    }
  };

  function getAlbum(data) {
    if (data.length > 1) {
      setPhotos(data);
    }
  }

  return (
    <div className="container">
      <h1>ALBUMS DISPLAY</h1>
      {error && (
        <div className="error-message">
          <p>You can only search an Id within 1 to 100</p>
          <span onClick={() => setError(false)}>&#10006;</span>
        </div>
      )}
      <div className="search">
        <div className="search-container">
          <div className="input-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Enter an Album Id"
              pattern="[0-9.]+"
              onChange={(e) => setAlbumId(e.target.value)}
            />
          </div>
          <div
            className="button-container"
            onClick={(e) => fetchRequest(e, albumId)}
          >
            <span>Get Album</span>
          </div>
        </div>
      </div>
      {photos.length > 1 ? (
        <div className="image_container">
          {photos.map((e, index) => (
            <div className="image-card" key={index}>
              <img className="image" src={e.url} alt={e.title} />
              <p className="title">{e.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
