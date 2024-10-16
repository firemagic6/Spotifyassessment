import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {

  // state management (useState() hook) - to create an Array called searchResults
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("My New PlayList");
  const [searchTerm, setSearchTerm] = useState("");

  // sideEffect (Document Load) - called useEffect hook
  // The blank bracket refers to running this hook only once
  useEffect(() => {
    Spotify.getAccessToken();
    
    // populate searchResults with defaultValues
    setSearchResults([
      // {
      //   id: 1,
      //   name: "Track 1",
      //   artist: "Track 1 Artist",
      //   album: "Track 1 Album",
      //   uri: "Track 1 Uri"
      // },
      // {
      //   id: 2,
      //   name: "Track 2",
      //   artist: "Track 2 Artist",
      //   album: "Track 2 Album",
      //   uri: "Track 2 Uri"
      // },
      // {
      //   id: 3,
      //   name: "Track 3",
      //   artist: "Track 3 Artist",
      //   album: "Track 3 Album",
      //   uri: "Track 3 Uri"
      // },
    ]);
    
    setPlayListTracks([
      // {
      //   id: 4,
      //   name: "Playlist 1",
      //   artist: "Playlist 1 Artist",
      //   album: "Playlist 1 Album",
      //   uri: "Playlist 1 Uri"
      // },
      // {
      //   id: 5,
      //   name: "Playlist 2",
      //   artist: "Playlist 2 Artist",
      //   album: "Playlist 2 Album",
      //   uri: "Playlist 2 Uri"
      // },
    ]);

  },[]); 
  
  // passed as a prop to SearchBar 
  // invokes the Spotify.search() 
  function search(term = ""){
    setSearchTerm(term);
  }

  function runSearch(){
    Spotify.search(searchTerm).then((response) => setSearchResults(response));
  }

  // passed as a prop to SearchResults 
  function addTrack(track) {
    const trackExists = playListTracks.find((currentTrack) => 
      currentTrack.id === track.id);

    if (!trackExists)
      setPlayListTracks([...playListTracks, track]);
  }

  // passed as a prop to Playlist 
  function removeTrack(track) { // return all the tracks except the track passed in (i.e. the track to be removed)
    const filteredTrack = playListTracks.filter((currentTrack) => currentTrack.id !== track.id);

    setPlayListTracks(filteredTrack);
  }

  // passed as a prop to PlayList (update playListName)
  function updatePlayListName(strName) {
    setPlayListName(strName);
  }

  // passed as a prop to PlayList (to save the new playlist)
  function savePlayList() {
    const tracksUri = playListTracks.map((track) => track.uri);
    Spotify.savePlaylist(playListName, tracksUri).then(() => {
      setPlayListName("My New PlayList");
      setPlayListTracks([]);
    })
  }

  console.log("my searchResults: ", searchResults);
  console.log("my playListTracks: ", playListTracks);
  console.log("my playListName: ", playListName);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar 
          onSearch = {search} 
          runSearch = {runSearch}
        />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults 
            searchResults = {searchResults} 
            onAdd = {addTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
            playListTracks = {playListTracks} 
            onRemove = {removeTrack}
            playListName = {playListName}
            updateName = {updatePlayListName}
            onSave = {savePlayList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;