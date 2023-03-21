import { useState, useEffect } from "react";

export default function Profile(props) {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    props.profile.then((data) => setInfo(data.body));
  }, [props.profile]);

  function signOutHandler() {
    props.store.signOut();
  }
  return Object.keys(info).length ? (
    <div className="profile">
      <div className="cv">
        <img src={info.images[0]?.url} />
      </div>
      <div className="name">{info.display_name}</div>
      <div className="followers">
        <div className="total">{info.followers.total}</div>
        <div>FOLLOWING</div>
      </div>
      <button
        style={{
          fontSize: ".8rem",
          border: "1px solid var(--fill-color)",
          padding: "8px 16px",
          borderRadius: "5rem",
          textTransform: "uppercase",
        }}
        onClick={signOutHandler}
      >
        Sign Out
      </button>
    </div>
  ) : null;
}
