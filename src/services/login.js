import SpotifyWebApi from "spotify-web-api-js";

const login = () => {
  var client_id = "d4a40d7f2b794f5ebf8b80bec35da21e";
  var redirect_uri = "http://localhost:3000";

  var state = generateRandomString(16);

  localStorage.setItem(stateKey, state);

  var scope =
    "user-read-private playlist-modify-private playlist-modify-publicuser-read-email";

  var url = "https://accounts.spotify.com/authorize";

  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);
};

const fuckingAroundWithOAuth = () => {
  var url = window.location;

  var access_token = new URLSearchParams(url.search).get("access_token");

  spotifyApi.setAccessToken(access_token);
};

login();

// https://accounts.spotify.com/authorize?response_type=token&client_id=d4a40d7f2b794f5ebf8b80bec35da21e&scope=user-read-private&redirect_uri=http://localhost:3000

// export default login;
