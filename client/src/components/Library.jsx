import { useState, useEffect } from "react";
import { Thumbnail } from "../assets/Icons";
import { IconHeartFilled } from "@tabler/icons-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Library(props) {
  //props.store.init;
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.store.userPlaylists
      .then((playlists) => {
        setPlaylist(playlists.items);
        setLoading(false);
      })
      .catch((e) => {
        window.localStorage.removeItem("token");
        window.location = "/";
      });
  }, []);

  return Object.keys(playlist).length ? (
    playlist.map((item, i) => {
      return (
        <div className="container" key={i} onClick={() => props.onClick(item)}>
          <div
            className="cv"
            style={{
              background:
                item.name.toLowerCase() === "liked songs"
                  ? "var(--liked-color)"
                  : null,
            }}
          >
            {item.images && item.images[1] ? (
              <LazyLoadImage src={item.images[1].url} alt="" />
            ) : item.name.toLowerCase() === "liked songs" ? (
              <IconHeartFilled
                style={{
                  position: "absolute",
                  inset: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "50%",
                  width: "50%",
                  fill: "white",
                  stroke: "transparent",
                }}
              />
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
    })
  ) : !loading ? (
    <div
      className="secondary"
      style={{
        fontSize: "4vw",
        margin: "auto",
        marginBottom: "auto",
      }}
    >
      Looks like you don't have any Playlist.
    </div>
  ) : (
    <Loading />
  );
}

function Loading() {
  return (
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
