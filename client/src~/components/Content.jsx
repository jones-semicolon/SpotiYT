import Library from "./Library";
import Search from "./Search";
import Profile from "./Profile";
import Greeting from "./Greeting";
import Playlist from "./Playlist";

export default function Content(props) {
  return (
    <>
      <header>
      { !props.playlist ?
        <div className="greet">
          {props.tab === "library" ? (
            <Greeting />
          ) : props.tab === "search" ? (
            "Search"
          ) : props.tab === "profile" ? (
            "Profile"
          ) : null}
        </div> : null}
      </header>
      <section>
        {props.tab === "library" ? (
          props.store.playlist ? (
            <Playlist playlist={props.playlist} store={props.store} query={props.query}/>
          ) : (
            <Library store={props.store} />
          )
        ) : props.tab === "search" ? (
          <Search store={props.store} />
        ) : props.tab === "profile" ? (
          <Profile profile={props.profile} store={props.store}/>
        ) : null}
      </section>
    </>
  );
}
