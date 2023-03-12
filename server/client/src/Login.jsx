import react from "react";
import { Spotify, Yt } from "./assets/Icons";

export default function Login() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const RESPONSE_TYPE = "token";
  const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_URL;
  const SCOPES = [
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "ugc-image-upload",
    "app-remote-control",
    "streaming",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];

  return (
    <main style={{ alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "var(--fill-color)" }}>
        <Spotify />
        Spoti
        <span style={{ color: "hsl(0 40% 50%)" }}>
          YT
          <Yt />
        </span>
      </h1>
      <p style={{ textIndent: "10%" }}>
        Hello User, if you want to be a Tester please make sure you have the
        grant to the Developer in order to gain you access. You can DM the
        Developer in any of this platform. Thank you and enjoy this Spotify
        Clone.
      </p>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join(
          "%20"
        )}`}
        style={{ marginTop: "auto" }}
      >
        Login With Spotify
      </a>
    </main>
  );
}
