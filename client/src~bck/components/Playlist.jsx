import react from "react";
import { toJS } from "mobx";
import Track from "./Track";
import { Hide, Play } from "../assets/Icons";

export default function Playlist(props) {
  const data = toJS(props.playlist);
  function handleQueue() {
    props.store.track = data.items[0]?.track;
    data.items.splice(0, 1)
    props.store.queue = data.items;
  }

  return (
    <section>
      <button
        style={{
          rotate: "90deg",
          position: "fixed",
          backgroundColor: "hsl(0 0% 20% / .6)",
          padding: "10px",
          borderRadius: "50%",
          zIndex: 2,
          maxHeight: "40px",
        }}
        className="icon"
      >
        <Hide
          onClick={(e) => {
            e.stopPropagation;
            props.store.playlist = "";
          }}
        />
      </button>
      <div className="top">
        <div className="cv">
          <img src={data.image} alt="" />
        </div>
        <div className="info">
          <div className="name">{data.name}</div>
          <div className="total">{data.total} songs</div>
        </div>
        <button className="icon">
          <Play onClick={handleQueue} />
        </button>
      </div>
      <div className="tracks-container">
        {data.items.map((item) => (
          <Track
            key={item.track.id}
            items={item.track}
            selectedTrack={(e) => (props.store.track = e)}
            store={props.store}
          />
        ))}
      </div>
    </section>
  );
}
