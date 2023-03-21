import {useState, useEffect} from "react";

export default function Greeting() {
  const date = new Date().getHours();
  const [greetings, setGreetings] = useState("");
  useEffect(() => {
    if (date < 12) {
      setGreetings("Good Morning");
    } else if (date < 18) {
      setGreetings("Good Afternoon");
    } else if (date < 24) {
      setGreetings("Good Evening");
    }
  }, [date]);
  return greetings;
}
