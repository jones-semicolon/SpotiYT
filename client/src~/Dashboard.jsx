import { useState } from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import SpotifyApi, { refreshToken } from "./SpotifyApi";
import { Player } from "./components/Player";
import { observer, useLocalObservable } from "mobx-react-lite";


export default observer(function Dashboard() {
  const store = useLocalObservable(() => SpotifyApi);

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
