import react from "react";
import { Add } from "../assets/Icons";
import { formatTime, isSaved } from "../SpotifyApi";
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function Track(props) {
  function handlePlay() {
    props.selectedTrack(props.items);
  }

  function checkFav(id) {
    isSaved(id).then((v) => {
      return v;
    });
  }

  const addQueue = (e) => {
    e.stopPropagation();
    if (window.localStorage.getItem("Queries")) {
      const data = [{track: props.items }]
      props.store.addQuery = data
    } else {
      const data = [{ track: props.items }];
      props.store.queue = data
    }
  };

  return (
    <div className="container" onClick={handlePlay}>
      <div className="cv">
        <LazyLoadImage src={props.items.album.images[1]?.url} alt="" />
      </div>
      <div className="info">
        <div className="title">{props.items.name}</div>
        <div className="artist">{props.items.artists[0].name}</div>
      </div>
      <div className="time">{formatTime(props.items.duration_ms)}</div>
      <button className="icon" onClick={addQueue}>
        <Add />
      </button>
    </div>
  );
}
