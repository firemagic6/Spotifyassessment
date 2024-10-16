import React from 'react'
import './Track.css';

function Track({track, onAdd, onRemoval, onRemove}) {

  // TODO: renderAction function (27)
  function renderAction(event) {
    if (onRemoval) { // button to remove track
      return (
        <button className="Track-action" onClick = {removeTrack}>
        {/* <!-- + or - will go here --> */}
        -
      </button>
      );
    } else {
      return (
        <button className="Track-action" onClick = {addTrack}>
        {/* <!-- + or - will go here --> */}
        +
      </button>
      );
    }
  }
  
  function addTrack() {
    onAdd(track);
  }

  function removeTrack() {
    onRemove(track);
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>
          {/* <!-- track name will go here --> */}
          {track.name}
        </h3>
        <p>
          {/* <!-- track artist will go here--> */} {/* <!-- track album will go here --> */}
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  )
}

export default Track