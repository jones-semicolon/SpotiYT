import { useEffect, useState } from "react";
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
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = (e) => {
    if (typeof e !== "undefined") {
      const target = e.target;
      if (target.scrollTop > lastScrollY) {
        document.body.style.setProperty("--scroll", "250%");
        setTimeout(() => {
          document.body.style.setProperty("--scroll", "0%");
        }, 500);
      }
      setLastScrollY(target.scrollTop);
    }
  };

  useEffect(() => {
    const main = document.querySelector("section.playlist");
    if (typeof main !== "undefined") {
      main.addEventListener("scroll", controlNavbar);

      return () => {
        main.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);
  function handleQueue() {
    props.store.track = data.items[0]?.track;
    const filtered = data.items.filter((v) => data.items.indexOf(v) !== 0);
    props.store.queue = filtered;
  }

  function addQuery() {
    if (window.localStorage.getItem("Queries")) {
      props.store.addQuery = data.items;
    } else {
      props.store.queue = data.items;
    }
  }

  return (
    <section
      className="playlist"
      style={{
        backgroundImage: `linear-gradient(to top,hsl(0 0% 8%) 60%,${props.playlist.color} 100%)`,
      }}
      aria-hidden={props.ariaHidden}
    >
      <div className="nav">
        <button className="icon" style={{ rotate: "90deg" }}>
          <Hide onClick={props.setPlaylist} />
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
        {data.items.map((item, i) => (
          <Track
            key={i}
            items={item.track}
            selectedTrack={(e) => (props.store.track = e)}
            store={props.store}
          />
        ))}
      </div>
    </section>
  );
}
