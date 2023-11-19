import SpotifyWebApi from "spotify-web-api-js";

const CLIENT_ID = "d4a40d7f2b794f5ebf8b80bec35da21e";
const CLIENT_SECRET = "6def9f6a4c7d441d8854a2029a460c7c";
var redirect_uri = "http://localhost:3000";

const login = () => {
   var client_id = "d4a40d7f2b794f5ebf8b80bec35da21e";
   var redirect_uri = "http://localhost:3000";

   var state = generateRandomString(16);

   var scope =
      "user-read-private playlist-modify-private playlist-modify-public user-read-email";

   var authUrl = new URL("https://accounts.spotify.com/authorize");

   const params = {
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
   };

   const toPrint = (authUrl.search = new URLSearchParams(params).toString());
   console.log(toPrint);
   window.location.href = authUrl.toString();

   //  url += "?response_type=token";
   //  url += "&client_id=" + encodeURIComponent(client_id);
   //  url += "&scope=" + encodeURIComponent(scope);
   //  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
   //  url += "&state=" + encodeURIComponent(state);
};

function generateRandomString(length) {
   let result = "";
   let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

async function exchangeForToken() {
   let params = new URLSearchParams(window.location.search);

   var code = params.get("code");
   var state = params.get("state");
   console.log("code", code);
   console.log("state", state);

   var exchangeResults = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      },
      body: new URLSearchParams({
         code: code,
         redirect_uri: redirect_uri,
         grant_type: "authorization_code",
      }),
   })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

   console.log("exchangeResults", exchangeResults);
   return exchangeResults;
}

const loginProcess = {
   login,
   exchangeForToken,
   generateRandomString,
};

export default loginProcess;
