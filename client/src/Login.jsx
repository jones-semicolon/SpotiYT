import react from "react";
import { Spotify, Yt } from "./assets/Icons";
import {
  IconBrandMessenger,
  IconBrandInstagram,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTiktok,
} from "@tabler/icons-react";

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
    <main
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        height: "100dvh",
      }}
      className="login"
    >
      <h1 style={{ color: "var(--fill-color)" }}>
        <Spotify />
        Spoti
        <span style={{ color: "hsl(0 40% 50%)" }}>
          YT
          <Yt />
        </span>
      </h1>
      <p style={{ textIndent: "10%", width: "fit-content" }}>
        Dear User, We would like to inform you that if you wish to become a
        Tester for our Spotify Clone, it is essential that you possess the
        necessary grant from the Developer to gain access. To acquire the grant,
        please send a direct message to the Developer on any of the available
        platforms. We kindly remind you to ensure that you have the appropriate
        permission before proceeding with the testing process. Thank you for
        your cooperation, and we hope you enjoy our Spotify Clone
      </p>
      <div
        className="platform"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "10px",
          marginTop: "50px",
          maxWidth: "min(90%, 400px)",
        }}
      >
        <a
          href="https://facebook.com/IAmJonestly"
          style={{
            background: "none",
            paddingBlock: "0",
            display: "grid",
            placeItems: "center",
            height: "50px",
            aspectRatio: 1,
          }}
        >
          <IconBrandMessenger className="icon" size="100%" />
        </a>
        <a
          href="https://instagram.com/iamjonestly?igshid=ZDdkNTZiNTM="
          style={{
            background: "none",
            paddingBlock: "0",
            display: "grid",
            placeItems: "center",
            height: "50px",
            aspectRatio: 1,
          }}
        >
          <IconBrandInstagram className="icon" size="100%" />
        </a>
        <a
          href="https://discord.com/users/753564377667469352"
          style={{
            background: "none",
            paddingBlock: "0",
            display: "grid",
            placeItems: "center",
            height: "50px",
            aspectRatio: 1,
          }}
        >
          <IconBrandDiscord className="icon" size="100%" />
        </a>
        <a
          href="tiktok.com/@jonestlyy"
          style={{
            background: "none",
            paddingBlock: "0",
            display: "grid",
            placeItems: "center",
            height: "50px",
            aspectRatio: 1,
          }}
        >
          <IconBrandTiktok className="icon" size="100%" />
        </a>
        <a
          href="https://github.com/jonestly-source"
          style={{
            background: "none",
            paddingBlock: "0",
            display: "grid",
            placeItems: "center",
            height: "50px",
            aspectRatio: 1,
          }}
        >
          <IconBrandGithub className="icon" size="100%" />
        </a>
        <a
          href="https://www.buymeacoffee.com/jonestly"
          target="_blank"
          style={{
            background: "none",
            paddingBlock: 0,
            gridColumn: "2 / 5",
            borderRadius: ".5rem",
            overflow: "hidden",
          }}
        >
          <img
            src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
            alt="Buy Me A Coffee"
            height="100%"
            width="100%"
          />
        </a>
      </div>
      <p
        style={{
          marginTop: "auto",
          fontSize: ".7rem",
          width: "90%",
          textIndent: "2ch",
          color: "var(--mute-color)",
        }}
      >
        This is just a beta expect some crash and bugs, you can go to my{" "}
        <a
          href="https://github.com/jonestly-source/SpotiYT"
          style={{
            background: "none",
            paddingBlock: 0,
            color: "var(--fill-color)",
            fontSize: "inherit",
            textTransform: "inherit",
            fontWeight: "inherit",
            textDecoration: "underline",
          }}
        >
          repository
        </a>{" "}
        to learn more about this web app
      </p>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join(
          "%20"
        )}`}
        style={{ maxWidth: "400px" }}
      >
        Login With Spotify
      </a>
    </main>
  );
}
