import { useState, useEffect } from "react";
import { Thumbnail } from "../assets/Icons";

export default function Library(props) {
  //props.store.init;
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    props.store.userPlaylists.then((playlists) => {
      setPlaylist(playlists.items);
    }).catch(() => {
    	window.localStorage.removeItem("token")
    })
  }, []);

  const handlePlaylist = (id, name, image) => {
    props.store.tracksInPlaylist(id, name, image);
  };

  return playlist?.map((item, i) => {
    return (
      <div
        className="container"
        key={i}
        onClick={() => handlePlaylist(item.id, item.name, item.images[1]?.url)}
      >
        <div className="cv">
          {item.images[1] ? (
            <img src={item.images[1].url} alt="" />
          ) : (
            <Thumbnail
              style={{
                position: "absolute",
                inset: "50%",
                transform: "translate(-50%, -50%)",
                height: "60%",
                width: "60%",
              }}
            />
          )}
        </div>
        <div className="info">
          <div className="name">{item.name}</div>
          <div className="total">{`${item.tracks.total} songs`}</div>
        </div>
      </div>
    );
  });
}
