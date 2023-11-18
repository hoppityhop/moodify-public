import React from "react";
import Table from "react-bootstrap/Table";
// import tracks from "../../data/smallerData";
import SongRow from "./SongRow";

const SongCard = ({songs}) => {
  // console.log(tracks);
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song) => (
          <>
          {/* <div>{song.name}</div> */}
            <SongRow song={song} />
          </>
        ))}
      </tbody>
    </Table>
  );

  // return (
  //   <Card style={{ width: '18rem',
  //    marginBottom: '5rem'}}>
  //     <Card.Img variant="top" src={track.album.images[1].url} />
  //     <Card.Body>
  //       <Card.Title>{track.name}</Card.Title>
  //       <Card.Text>
  //         Album: {track.album.name}
  //         <br/>
  //         <br/>
  //         Artist: {track.album.artists[0].name}
  //       </Card.Text>
  //     </Card.Body>
  //     <ListGroup className="list-group-flush">
  //       <ListGroup.Item>Cras justo odio</ListGroup.Item>
  //       <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
  //       <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
  //     </ListGroup>
  //     <Card.Body>
  //       <Card.Link href="#">Card Link</Card.Link>
  //       <Card.Link href="#">Another Link</Card.Link>
  //     </Card.Body>
  //   </Card>

  // );
};

export default SongCard;
