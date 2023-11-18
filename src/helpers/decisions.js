import SpotifyWebApi from "spotify-web-api-js";
//function below this point
/**
 * Args: mood, an array of songs
 * Returns: an array of songs that will be the * playlist
 */

const SPOTIFY_ACCESS_TOKEN =
  "BQCTWoZb0fFcCPQGWy5zy9aAfKRehhTP1obWtHmDiTE-OXETKJ6ZjdrjB50fgJJHsMva-2RqIdg1G_GGwcKVesGsm-Nd7X65Dz2_uT1z075mFWHu7losmtRiEnac8lWX7vWTRuGjHXwQLmh8IyfIIlE7k_FNtpePRjx1SAasCelin_jsXxm8uJeVx7Cvi5r1x9tz";
const SPOTIFY_API = new SpotifyWebApi();
SPOTIFY_API.setAccessToken(SPOTIFY_ACCESS_TOKEN);

export async function makeDecision(mood) {
  let allTracks = await getTracksFromFeaturedPlaylists();
  const trackIDs = allTracks.map(track => track.id);
  console.log("trackIDs", trackIDs);

  const IDs = await getSongBasedOnMood(mood, trackIDs.slice(0, 100).join());
  const IDs2 = await getSongBasedOnMood(mood, trackIDs.slice(100, 200).join());
  const IDs3 = await getSongBasedOnMood(mood, trackIDs.slice(200, 300).join());
  const IDs4 = await getSongBasedOnMood(mood, trackIDs.slice(300, 400).join());
  const IDs5 = await getSongBasedOnMood(mood, trackIDs.slice(400, 500).join());
  const IDs6 = await getSongBasedOnMood(mood, trackIDs.slice(500, 600).join());

  const res = [...IDs, ...IDs2, ...IDs3, ...IDs4, ...IDs5, ...IDs6];
  console.log("***", res);

  return (await SPOTIFY_API.getTracks(res)).tracks;
}

async function getSongBasedOnMood(mood, trackIDs) {
  const features = await SPOTIFY_API.getAudioFeaturesForTracks(trackIDs);
  console.log("*features", features);

  // mood = "happy";
  const matchedTracks = features.audio_features.map(feature => {
    const { valence, energy, danceability } = feature;
    if (mood == "angry") {
      if (valence <= 0.4 && energy >= 0.7 && danceability <= 0.4) {
        return feature.id;
      }
    } else if (mood == "sad") {
      if (valence <= 0.4 && energy <= 0.4 && danceability <= 0.4) {
        return feature.id;
      }
    } else if (mood == "neutral") {
      if (
        valence <= 0.7 &&
        valence >= 0.4 &&
        energy <= 0.7 &&
        energy >= 0.4 &&
        danceability <= 0.7 &&
        energy >= 0.4
      ) {
        return feature.id;
      }
    } else if (mood == "happy") {
      if (valence >= 0.5 && energy >= 0.6 && danceability >= 0.6) {
        return feature.id;
      }
    } else if (mood == "fearful") {
      if (
        valence >= 0.4 &&
        valence <= 0.7 &&
        energy >= 0.5 &&
        energy <= 0.8 &&
        danceability <= 0.4
      ) {
        return feature.id;
      }
    } else if (mood == "surprised") {
      if (
        valence >= 0.7 &&
        energy >= 0.7 &&
        danceability >= 0.4 &&
        danceability <= 0.7
      ) {
        return feature.id;
      }
    }
  });
  return matchedTracks.filter(e => e);
}

export async function getTracksFromFeaturedPlaylists() {
  const featuredPlaylist = (await SPOTIFY_API.getFeaturedPlaylists()).playlists
    .items;

  const featuredPlaylistIDs = featuredPlaylist.map(playlist => playlist.id);

  const featuredPlaylistTracks = featuredPlaylistIDs.map(async id => {
    const playlistTracks = (await SPOTIFY_API.getPlaylistTracks(id)).items;
    return playlistTracks.map(el => el.track);
  });

  return (await Promise.all(featuredPlaylistTracks)).flat();
}
