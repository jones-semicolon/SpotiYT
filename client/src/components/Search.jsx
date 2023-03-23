import { useState, useEffect } from "react";
import { Search as SearchIcon } from "../assets/Icons";
import Track from "./Track";

export default function Search(props) {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (query === "") {
      setSearch(null);
      return;
    }
    props.store.search(query).then((data) => {
      setSearch(data.body.tracks.items);
    });
  }, [query]);

  return (
    <>
      <div className="search-container">
        <div className="icon">
          <SearchIcon />
        </div>
        <input
          type="search"
          placeholder="Artists, Songs, Playlists"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <section className="tracks-container">
        {search?.map((track, i) => (
          <Track
            key={i}
            items={track}
            selectedTrack={(e) => (props.store.track = e)}
            store={props.store}
          />
        ))}
      </section>
    </>
  );
}
