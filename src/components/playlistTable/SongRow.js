import React from "react";

const SongRow = ({song}) => {
  const track = song;
  // console.log(track);

  return (
    <>
    <tr>
      <td>
        <img src={track.album.images[2].url}></img>
      </td>
      <td>{track.name}</td>
      <td>{track.album.artists[0].name}</td>
      <td>{track.album.name}</td>
      <td>
        <iframe
          src="https://p.scdn.co/mp3-preview/8ed48cfd04dd1c7de4ed5459cafe80e6c5af7735?cid=774b29d4f13844c495f206cafdad9c86"
          title="description"
        ></iframe>
      </td>
    </tr>
    </>
  );
};

export default SongRow;
