import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import SpotifyApi from "./SpotifyApi";
import { useState, useEffect } from "react";

const token = new URLSearchParams(window.location.hash).get("#access_token");

function App() {
  const [code, setCode] = useState("");
  useEffect(() => {
    if (token) {
      setCode(token);
      SpotifyApi.code = token
      return
    }
    setCode(window.localStorage.getItem("token"));
  }, []);



  return code ? <Dashboard /> : <Login />;
}

export default App;
