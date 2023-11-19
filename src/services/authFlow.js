const clientId = "d4a40d7f2b794f5ebf8b80bec35da21e";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
   redirectToAuthCodeFlow(clientId);
} else {
   const accessToken = await getAccessToken(clientId, code);
   //    const profile = await fetchProfile(accessToken);
   console.log(accessToken); // Profile data logs to console

   //    populateUI(profile);
}

export async function redirectToAuthCodeFlow(clientId) {
   const verifier = generateCodeVerifier(128);
   const challenge = await generateCodeChallenge(verifier);

   localStorage.setItem("verifier", verifier);

   const params = new URLSearchParams();
   params.append("client_id", clientId);
   params.append("response_type", "code");
   params.append("redirect_uri", "http://localhost:3000/callback");
   params.append("scope", "user-read-private user-read-email");
   params.append("code_challenge_method", "S256");
   params.append("code_challenge", challenge);

   document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
   let text = "";
   let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   }

   return text;
}

async function generateCodeChallenge(codeVerifier) {
   const data = new TextEncoder().encode(codeVerifier);
   const digest = await window.crypto.subtle.digest("SHA-256", data);

   return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
}

export async function getAccessToken(clientId, code) {
   const verifier = localStorage.getItem("verifier");

   const params = new URLSearchParams();
   params.append("client_id", clientId);
   params.append("grant_type", "authorization_code");
   params.append("code", code);
   params.append("redirect_uri", "http://localhost:8000/callback");
   params.append("code_verifier", verifier);

   const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: params,
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
   });

   const { access_token } = await result.json();
   return access_token;
}

//TODO - add a function to handle the fetching of the tracks before parsing.
