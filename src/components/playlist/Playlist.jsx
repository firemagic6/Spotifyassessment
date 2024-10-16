import React from 'react'
import './Playlist.css';
import Tracklist from '../tracklist/Tracklist.jsx'

function Playlist({playListTracks, onRemove, playListName, updateName, onSave}) {

  function handleChange(event) {
    updateName(event.target.value);
  }

  function handleSave() {
    onSave();
  }

  return (
    <div className="Playlist">
      <input type = "text" onChange = {handleChange} value = {playListName}/>
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        searchResults = {playListTracks}
        onRemoval = {true} 
        onRemove = {onRemove}/>
      <button onClick={handleSave} className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist
