import React, { useState } from 'react'
import "./SearchBar.css"

function SearchBar({onSearch, runSearch}) {

  function handleSearchChange(event) { 
    // call a method to render the search
    onSearch(event.target.value);
  }

  function handleSearchClick() {   
    runSearch();
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchChange} />
      <button className="SearchButton" onClick={handleSearchClick}>SEARCH</button>
    </div>
  )
}

export default SearchBar