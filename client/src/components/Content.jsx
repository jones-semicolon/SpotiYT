import Library from "./Library";
import Search from "./Search";
import Profile from "./Profile";
import Greeting from "./Greeting";
import Playlist from "./Playlist";
import { useState, useEffect } from "react";

export default function Content(props) {
  const [playlist, setPlaylist] = useState({});
  const [hidePlaylist, setHidePlaylist] = useState(false);

  useEffect(() => {
    if (props.tab === "library" && hidePlaylist) {
      setHidePlaylist(false);
      return;
    } 
    setHidePlaylist(true);
  }, [props.tab, playlist]);

  const playlistHandle = (item) => {
    if (item.name.toLowerCase() === "liked songs") {
      setPlaylist({
        name: item.name,
        items: item.tracks.items,
        total: item.tracks.total,
        color: "var(--fill-color), hsl(0 60% 50%)",
      });
      return;
    }
    props.store
      .tracksInPlaylist(
        item.id,
        item.name,
        item.images[1] ? item.images[1].url : null
      )
      .then((e) => {
        setPlaylist(e);
      });
  };

  return (
    <>
      <section>
        <header>
          {
            <div className="greet">
              {props.tab === "library" ? (
                <Greeting />
              ) : props.tab === "search" ? (
                "Search"
              ) : props.tab === "profile" ? (
                "Profile"
              ) : null}
            </div>
          }
        </header>
        {props.tab === "library" ? (
          <Library store={props.store} onClick={(e) => playlistHandle(e)} />
        ) : props.tab === "search" ? (
          <Search store={props.store} />
        ) : props.tab === "profile" ? (
          <Profile profile={props.profile} store={props.store} />
        ) : null}
      </section>
      {Object.keys(playlist).length ? (
        <Playlist
          playlist={playlist}
          setPlaylist={() => setPlaylist({})}
          store={props.store}
          query={props.query}
          ariaHidden={hidePlaylist}
        />
      ) : null}
    </>
  );
}
