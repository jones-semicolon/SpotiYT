import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import SpotifyApi, { refreshToken } from "./SpotifyApi";
import { Player } from "./components/Player";
import { observer, useLocalObservable } from "mobx-react-lite";

export default observer(function Dashboard() {
  const store = useLocalObservable(() => SpotifyApi);
  const [show, setShow] = useState(true);
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
    const main = document.querySelector("main > section:not(.login)");
    if (typeof main !== "undefined") {
      main.addEventListener("scroll", controlNavbar);

      return () => {
        main.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  store.track?.color || store.PlaylistColor
    ? document.body.style.setProperty(
        "--player-color",
        store.track?.color || store.PlaylistColor
      )
    : document.body.style.setProperty("--player-color", "black");
  return (
    <main>
      <Content
        tab={store.tab}
        profile={store.user}
        store={store}
        playlist={store.playlist}
        onClick={(e) => setPlaylist(e)}
        query={store.query}
      />
      <Navbar store={store} tab={store.tab} />
      {store.track ? (
        <Player
          metadata={store.track}
          query={store.queue}
          nextSong={store.nextSong}
          store={store}
          prevMeta={store.prevMeta}
        />
      ) : null}
    </main>
  );
});
