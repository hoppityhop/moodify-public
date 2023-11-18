import { useEffect, useState } from "react";
import "./styles.css";
import Spotify from "spotify-web-api-js";
import { fetchSynonyms } from "./helpers";

// happy, sad, neutral, angry, surprise, fearful, disgusted
export default function SpotifyWrapper() {
  const [emotion, setEmotion] = useState("");
  const [synonyms, setSynonyms] = useState();
  const [antonyms, setAntonyms] = useState();
  const [tracks, setTracks] = useState();
  var s = new Spotify();
  useEffect(() => {
    s.setAccessToken(
      "BQAKz0mkZFm0wIT66AZTMKek2q9FOe0SboVhb9Sj6cdl624jckrxynC6pUB-RdxagdaYGKe8o03_zZBdE5S3IOiDa7Fkqdq0HrqtHf9TFUwsaMQ9lwLl4nuvd-3RooyofpalR_kXEASGoeYMQlNZOHWqdZottwKPpPEli-d6MYsgcTgatwqS6mLSZ_L8h-FlRBrZ"
    );

    return () => {};
  }, []);

  //for printing out
  useEffect(() => {
    // console.log("synonyms", synonyms);
    // console.log("antonyms", antonyms);
    console.log("**log tracks", tracks);
  }, [synonyms, antonyms, tracks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchSynonyms(emotion);
    setSynonyms(data?.synonyms);
    setAntonyms(data?.antonyms);

    const tracks = await s.searchTracks(emotion);
    setTracks(tracks.tracks);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Emotion:
          <input
            type="text"
            name="name"
            onChange={(e) => setEmotion(e.target.value)}
            value={emotion}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <h2>Synonyms</h2>
        <ui>
          {synonyms?.map((el) => {
            return <li>{el}</li>;
          })}
        </ui>
        <br />
        <h2>Antonyms</h2>
        <ui>
          {antonyms?.map((el) => {
            return <li>{el}</li>;
          })}
        </ui>
        <h2>Tracks</h2>
        <ui>
          {tracks?.items?.map((track) => {
            return <li>{track.name}</li>;
          })}
        </ui>
      </div>
    </div>
  );
}
