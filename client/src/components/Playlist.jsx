import react from "react";
import { toJS } from "mobx";
import Track from "./Track";
import { Hide, Play, Thumbnail } from "../assets/Icons";
import {
  IconHeartFilled,
  IconDotsVertical,
  IconTextPlus,
} from "@tabler/icons-react";

export default function Playlist(props) {
  const data = toJS(props.playlist);
  function handleQueue() {
    props.store.track = data.items[0]?.track;
    data.items.splice(0, 1);
    props.store.queue = data.items;
  }

  function addQuery() {
    if (window.localStorage.getItem("Queries")) {
      props.store.addQuery = data.items;
    } else {
      props.store.queue = data.items;
    }
  }

  return (
    <section className="playlist">
      <div className="nav">
        <button className="icon" style={{ rotate: "90deg" }}>
          <Hide
            onClick={(e) => {
              e.stopPropagation;
              props.store.playlist = "";
            }}
          />
        </button>
        <button
          className="icon"
          style={{ rotate: "180deg" }}
          onClick={addQuery}
        >
          <IconTextPlus />
        </button>
      </div>
      <div className="top">
        <div
          className="cv"
          style={{
            background:
              data.name.toLowerCase() === "liked songs"
                ? "var(--liked-color)"
                : null,
          }}
        >
          {data.image ? (
            <img src={data.image} alt="" />
          ) : data.name.toLowerCase() === "liked songs" ? (
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
