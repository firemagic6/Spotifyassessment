import React from 'react';
import './Tracklist.css';
import Track from '../track/Track.jsx';

function Tracklist({searchResults, onAdd, onRemoval, onRemove}) {

  return (
    <div className="TrackList">
      {/* <!-- You will add a map method that renders a set of Track components  --> */}
      {searchResults && searchResults.map((track) => 
        <Track 
          track = {track} 
          onAdd = {onAdd}
          onRemoval = {onRemoval} 
          onRemove = {onRemove}/>
      )}
    </div>
  )
}

export default Tracklist