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
  const titles = document.querySelectorAll(".title");

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

  /*titles?.map((element) => {
    if (
      element?.offsetWidth < element?.scrollWidth &&
      element?.classList.length < 2
    ) {
      element.classList.add("marquee");
      document.body.style.setProperty(
        "--marquee-width",
        `${element.scrollWidth}px`
      );
      document.body.style.setProperty(
        "--animation-duration",
        `${element.scrollWidth / 20}s`
      );
      document.body.style.setProperty("--content", `"${props.metadata.name}"`);
    }
    document.body.style.removeProperty("--marquee-width", "100%");
    document.body.style.removeProperty("--content", "");
    element?.classList.remove("marquee");
  });*/

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
