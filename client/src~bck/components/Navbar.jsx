import { Library, Search, User } from "../assets/Icons";

export default function Navbar(props) {
  return (
    <nav aria-hidden="false">
      <button
        aria-selected={props.tab == "library" ? true : false}
        onClick={() => (props.store.tab = "library")}
      >
        <div className="icon">
          <Library />
        </div>
        <div>Library</div>
      </button>
      <button
        aria-selected={props.tab == "search" ? true : false}
        onClick={() => (props.store.tab = "search")}
      >
        <div className="icon">
          <Search />
        </div>
        <div>Search</div>
      </button>
      <button
        aria-selected={props.tab == "profile" ? true : false}
        onClick={() => (props.store.tab = "profile")}
      >
        <div className="icon">
          <User />
        </div>
        <div>Profile</div>
      </button>
    </nav>
  );
}
