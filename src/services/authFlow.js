const clientId = "d4a40d7f2b794f5ebf8b80bec35da21e";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
   redirectToAuthCodeFlow(clientId);
} else {
   const accessToken = await getAccessToken(clientId, code);
   const profile = await fetchProfile(accessToken);
   console.log(profile); // Profile data logs to console

   populateUI(profile);
}


export async function redirectToAuthCodeFlow(clientId) {


    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
}
