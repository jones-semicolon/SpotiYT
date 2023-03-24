import { useRef, useEffect } from "react";
import { Hide, Share, Clear, Remove } from "../assets/Icons";
import { toJS } from "mobx";
import { useLongPress } from "use-long-press";

export default function Queries(props) {
  const data = props.query ? toJS(props.query) : null;
  const animation = useRef(null);

  const clearHandle = (e) => {
    e.stopPropagation();
    props.store.removeQueries();
  };

  const removeQueue = (index) => {
    props.store.removeQueue = index;
  };

  /*const bind = useLongPress(({ target }) => {
    const container = target.closest(".container");
    container.classList.add("marked");
  });*/

  const clickHandler = (item, i) => {
    removeQueue(i);
    props.store.track = item.track;
  };

  return (
    <div
      className="query"
      style={{ overflowY: "auto" }}
      aria-hidden={!props.ariaHidden}
    >
      <div className="top">
        <button className="icon">
          <Hide onClick={props.onClick} />
        </button>
        <div
          className="info"
          style={{ textAlign: "center", marginInline: "auto" }}
        >
          <div className="secondary" style={{ marginInline: "auto" }}>
            Now Playing
          </div>
          <div className="title" style={{ marginInline: "auto" }}>
            {props.playing}
          </div>
        </div>
        <button onClick={props.shareHandler} className="icon">
          <Share />
        </button>
      </div>
      <div
        style={{
          marginInline: "20px",
          fontSize: "12px",
          fontStyle: "italic",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="secondary" style={{ marginBlock: "auto" }}>
          Next in Queue
        </div>
        <button className="icon">
          <Clear onClick={clearHandle} className="secondary" />
        </button>
      </div>
      {data?.map((item, i) => (
        <div
          className="container"
          key={i}
          style={{ padding: "20px" }}
          //{...bind()}
          onClick={() => clickHandler(item, i)}
        >
          <button
            className="icon"
            style={{ height: "100%", stroke: "var(--mute-color)" }}
            onClick={(e) => {
              e.stopPropagation();
              removeQueue(i);
            }}
          >
            <Remove />
          </button>
          <div className="info" style={{ maxWidth: "90%" }}>
            <div className="title">{item.track.name}</div>
            <div className="artist">{item.track.artists[0].name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
