let accessToken = "";
const clientID = "2f68cc82ed3f49f091c0e849d6716e6e";
//const redirectUrl = "http://localhost:3000";
const redirectUrl = "https://Firemagicspotify.surge.sh";

// const Spotify stores function objects
const Spotify = {
  getAccessToken() {    // getAccessToken Function Object creates the accessToken if not found
    // First check for the access token
    if (accessToken) return accessToken;

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    // Second check for the access token
    if (tokenInURL && expiryTime) {
      // setting access token and expiry time variables
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      console.log("AccessToken: " + accessToken, "Expiry: " + expiresIn);

      // Setting the access token to expire at the value for expiration time
      // clear accessToken after expiry
      // If expires_in = 3600 (1 hour), accessToken'll be cleared after 1 hour (3600 * 1000 ms = 3,600,000 ms or 1 hour).
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }else{
      // Third check for the access token if the first and second check are both false
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
      window.location = redirect;
    }
  },

  async search(term) {    // search Function Object takes in a term to search for

    if (term === null || term === undefined || term === "")
      return;

    accessToken = Spotify.getAccessToken();
    return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonresponse) => {
        if (!jsonresponse) {
          console.error("Response error");
        }
        return jsonresponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },

  savePlaylist(name, trackUris) {   // savePlayList takes in the name and the Url of the track to save
    if (!name || !trackUris) return;
    const aToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };
    let userId = "";
    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        let playlistId = "";
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "post",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "post",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },

};

export { Spotify };