import { useRef, useEffect, useState } from "react";
import {
  Hide,
  Share,
  Play,
  Pause,
  Heart,
  Shuffle,
  Preview,
  Next,
  Repeat,
  Queue,
  Download,
} from "../assets/Icons";
import {
  isSaved,
  removeSavedTrack,
  addSavedTrack,
  downloadTrack,
} from "../SpotifyApi";
import Queries from "./Queries";
import { useLongPress } from "use-long-press";

export function Player(props) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initTime, setInitTime] = useState(0);
  const [initDuration, setInitDuration] = useState(0);
  const [isMini, setIsMini] = useState(true);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [seek, setSeek] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [idle, setIdle] = useState(true);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [error, setError] = useState(false);
  const runOnce = useRef(true);

  function eventHandler(event) {
    switch (event.type) {
      case "play":
        setIsPlaying(true);
        break;
      case "waiting":
        setIdle(true);
        setIsPlaying(false);
        break;
      case "playing":
        setIdle(false);
        setIsPlaying(true);
        runOnce.current = true;
        break;
      case "loadedmetadata":
        setIdle(false);
        setDuration(formatTime(audioRef.current.duration));
        break;
      case "pause":
      case "ended":
        setIsPlaying(false);
        break;
      case "error":
        setIsPlaying(false);
        setIdle(true);
        if (props.query) setError(true);
        if (!props.query) {
            setError(true);
          setTimeout(() => {
          props.store.song = {};
          setError(false);
          }, 2000);
        }
        break;
      case "timeupdate":
        setSeek(
          toPercentage(
            audioRef.current?.currentTime,
            audioRef.current?.duration
          )
        );
        setCurrentTime(formatTime(audioRef.current?.currentTime));
        break;
      default:
        console.log(event.type);
    }
    if (event.type === "timeupdate") {
      return;
    }
    audioRef.current?.removeEventListener(event.type, eventHandler);
  }

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", eventHandler);
    audioRef.current?.addEventListener("pause", eventHandler);
    audioRef.current?.addEventListener("playing", eventHandler);
    audioRef.current?.addEventListener("loadedmetadata", eventHandler);
    audioRef.current?.addEventListener("waiting", eventHandler);
    audioRef.current?.addEventListener("play", eventHandler);
    audioRef.current.addEventListener("ended", eventHandler);
    audioRef.current.addEventListener("error", eventHandler);
  }, [isPlaying, currentTime]);

  useEffect(() => {
    const endEvent = (event) => {
      audioRef.current.removeEventListener(event.type, endEvent);
      setIsPlaying(false);
      audioRef.current.currentTime = 0;
      nextSong();
    };
    audioRef.current.addEventListener("ended", endEvent);
    const initQuery = () => {
      if (!props.nextSong && props.query && runOnce.current) {
        runOnce.current = false;
        props.store.queue = props.query;
      }
    };
    initQuery();
    if (error) {
      nextSong();
      setError(false);
    }
  }, [props.nextSong]);

  useEffect(() => {
    if (error && props.nextSong) {
      nextSong();
      setError(false);
    }
  }, [props.nextSong, error]);

  const nextSong = (e) => {
    e?.stopPropagation();
    if (props.nextSong) {
      props.store.song = props.nextSong;
      runOnce.current = true;
      props.query.splice(0, 1);
      props.store.nextSong = {};
    }
  };

  useEffect(() => {
    isSaved(props.metadata.id).then((bool) => setFavorite(bool));
    audioRef.current.src = props.metadata.audio;
    const initQuery = () => {
      if (!props.nextSong && props.query && runOnce.current) {
        runOnce.current = false;
        props.store.queue = props.query;
      }
    };
    initQuery();
  }, [props.metadata]);

  useEffect(() => {
    if (shuffle) {
      let query = shuffleQuery(props.query);
      props.store.shuffledQueue = query;
    }
  }, [shuffle]);

  document.body.style.setProperty("--current-time", `${seek > 0 ? seek : 0}%`);

  const playState = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const seekHandler = (e) => {
    audioRef.current.currentTime = e;
  };

  const loopState = (e) => {
    e.stopPropagation();
    loop ? setLoop(false) : setLoop(true);
  };

  const favoriteState = async (e) => {
    e.stopPropagation();
    favorite
      ? await removeSavedTrack(props.metadata.id)
      : await addSavedTrack(props.metadata.id);
    isSaved(props.metadata.id).then((bool) => setFavorite(bool));
  };

  function shareHandler() {
    navigator.share({
      title: props.metadata.name,
      url: props.metadata.url,
    });
  }

  return (
    <>
      {error ? <Notification /> : null}
      <audio autoPlay ref={audioRef} loop={loop} />
      <MiniPlayer
        audio={props.audio}
        metadata={props.metadata}
        onClick={() => setIsMini(false)}
        isPlaying={isPlaying}
        store={props.store}
        favorite={favorite}
        idle={idle}
        setFavorite={(e) => favoriteState(e)}
        setIsPlaying={(e) => playState(e)}
      />
      <FullPlayer
        audio={props.audio}
        metadata={props.metadata}
        onClick={() => setIsMini(true)}
        isPlaying={isPlaying}
        setIsPlaying={(e) => playState(e)}
        currentTime={currentTime}
        setSeek={(e) => seekHandler(e)}
        duration={audioRef?.current?.duration}
        favorite={favorite}
        formattedDuration={duration}
        seek={seek}
        idle={idle}
        loop={loop}
        setFavorite={(e) => favoriteState(e)}
        setLoop={(e) => loopState(e)}
        share={shareHandler}
        query={props.query}
        nextSong={(e) => nextSong(e)}
        store={props.store}
        next={props.nextSong}
        shuffle={shuffle}
        setShuffle={() => (shuffle ? setShuffle(false) : setShuffle(true))}
        ariaHidden={isMini}
      />
    </>
  );
}

function MiniPlayer(props) {
  //document.body.style.overflowY = "auto";
  const body = document.body;
  /*body.style.position = "";
  body.style.top = "";*/
  var element = document.querySelector(".mini-player .title");
  //console.log(element?.offsetWidth, element?.scrollWidth);
  if (element?.offsetWidth < element?.scrollWidth) {
    element.classList.add("marquee");
    body.style.setProperty(
      "--marquee-width",
      `${element.scrollWidth / 2 - 10}px`
    );
    body.style.setProperty("--content", `"${props.metadata.name}"`);
  } else if (element?.offsetWidth >= element?.scrollWidth) {
    body.style.setProperty("--marquee-width", "100%");
    body.style.setProperty("--content", "");
    element?.classList.remove("marquee");
  }

  return (
    <div className="mini-player" onClick={props.onClick}>
      <div className="cv">
        <img src={props.metadata.image} alt="" />
      </div>
      <div className="info">
        <div className="title">{props.metadata.name}</div>
        <div className="artist">{props.metadata.artists}</div>
      </div>
      <button
        className="icon heart"
        aria-selected={props.favorite}
        onClick={(e) => props.setFavorite(e)}
      >
        <Heart />
      </button>
      <button
        className="icon"
        onClick={(e) => props.setIsPlaying(e)}
        disabled={props.idle}
      >
        {!props.isPlaying ? <Play /> : <Pause />}
      </button>
    </div>
  );
}

function FullPlayer(props) {
  const [queueView, setQueueView] = useState(false);
  const bind = useLongPress(() => {
    props.store.song = {};
  });
  /*if (!queueView) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    document.body.style.position = "";
    document.body.style.top = "";
  }*/

  return (
    <div className="player" aria-hidden={props.ariaHidden}>
      <div className="top">
        <button className="icon">
          <Hide onClick={props.onClick} />
        </button>
        <button className="icon">
          <Share onClick={props.share} />
        </button>
      </div>
      <div className="cv lg">
        <img src={props.metadata.image} alt={props.metadata.name} />
      </div>
      <div>
        <div className="info">
          <div className="title">{props.metadata.name}</div>
          <div className="artist">{props.metadata.artists}</div>
        </div>
        <button
          className="icon heart"
          aria-selected={props.favorite}
          onClick={(e) => props.setFavorite(e)}
        >
          <Heart />
        </button>
      </div>
      <div className="track">
        <div className="aud-track">
          <input
            type="range"
            value={props.seek ? props.seek : 0}
            onChange={(e) =>
              props.setSeek(toMs(e.target.value, props.duration))
            }
            min="0"
            max="100"
          />
          <div className="runnable" disabled></div>
        </div>
        <div className="time">
          <div className="crnt">{props.currentTime}</div>
          <div className="total">{props.formattedDuration}</div>
        </div>
      </div>
      <div className="controller">
        <button
          className="icon"
          onClick={props.setShuffle}
          aria-selected={props.shuffle}
        >
          <Shuffle />
        </button>
        <button
          className="icon"
          disabled={props.currentTime !== "0:00" ? false : true}
        >
          <Preview onClick={() => props.setSeek(0)} />
        </button>
        <button
          className="icon"
          onClick={(e) => props.setIsPlaying(e)}
          {...bind()}
          disabled={props.idle}
        >
          {!props.isPlaying ? <Play /> : <Pause />}
        </button>
        <button className="icon" disabled={props.next ? false : true}>
          <Next onClick={(e) => props.nextSong(e)} />
        </button>
        <button
          className="icon"
          aria-selected={props.loop}
          onClick={(e) => props.setLoop(e)}
        >
          <Repeat />
        </button>
      </div>
      <div className="bottom">
        <button
          className="icon"
          //onClick={() => downloadTrack(props.metadata.url)}
          disabled
        >
          <Download />
        </button>
        <button className="icon">
          <Queue onClick={() => setQueueView(true)} />
        </button>
      </div>
      <Queries
        onClick={() => setQueueView(false)}
        query={props.query}
        playing={props.metadata.name}
        shareHandler={props.share}
        store={props.store}
        ariaHidden={queueView}
      />
    </div>
  );
}

function formatTime(ms) {
  let sec = Math.floor(ms);
  let min = Math.floor(ms / 60);
  let hr = Math.floor(min / 60);
  sec = sec % 60;
  min = min % 60;
  if (hr && min < 10) {
    min = `0${min}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return hr ? `${hr}:${min}:${sec}` : `${min}:${sec}`;
}

function toPercentage(ms, duration) {
  return (ms * 100) / duration;
}

function toMs(perc, duration) {
  return Math.floor((perc / 100) * duration);
}

function shuffleQuery(cue) {
  let currentIndex = cue.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cue[currentIndex], cue[randomIndex]] = [
      cue[randomIndex],
      cue[currentIndex],
    ];
  }

  return cue;
}

function Notification() {
  let notifStyle = {
    position: "fixed",
    backgroundColor: "hsl(0 0% 3% / 0.8)",
    inset: "50px auto 50% 50%",
    transform: "translateX(-50%)",
    fontWeight: 400,
    fontSize: "1rem",
    borderRadius: ".5rem",
    padding: "10px 20px",
    maxHeight: "fit-content",
    maxWidth: "100%",
    zIndex: "9999999",
  };
  return <div style={notifStyle}>Can't play this song</div>;
}
