const express = require("express");
const fs = require("fs-extra");
const MusicSearch = require("@kamkam1_0/music-search");
const yts = require("yt-search");
const app = express();
app.use(express.json());
const path = require("path");
const PORT = process.env.PORT || 5174;

app.use(express.static(path.join(__dirname, "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api", async (req, res) => {
  let artistList = ["savella - topic"];
  var title = await req.body.title;
  var artist = await req.body.artist;
  for (const item of artistList) {
    if (item.includes(artist.toLowerCase())) {
      artist = item;
    }
  }
  var goal = Math.round(req.body.duration / 1000);
  var query = artist + " - " + title;
  let Youtube = new MusicSearch.Youtube();

  const output = (arr) =>
    arr.reduce((prev, curr) =>
      Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
    );
  try {
    const r = await yts({ query, order: "viewCount" });
    const videos = r.videos;
    let durs = [];
    let result = [];
    let newDurs = [];
    let exclude = [
      "live",
      "instrumental",
      "karaoke",
      "tutorial",
      "cover",
      "loop",
      "remix",
    ];
    let excludeChannel = ["onemusicph"];
    await exclude.forEach(async (ex, index) => {
      if (title.toLowerCase().includes(ex)) {
        await exclude.splice(index, 1);
      }
      await videos.map(async (vid, i) => {
        if (vid.title.toLowerCase().includes(ex)) {
          //console.log(vid);
          await videos.splice(i, 1);
        }
      });
    });

    const vid = await videos.map(async (video, vidInd) => {
      const vidTitle = await video.title.toLowerCase();

      if (
        (await vidTitle.includes(
          title.replace(/\([^()]*\)|\s-.*/g, "").toLowerCase()
        )) &&
        (await !excludeChannel.includes(video.author.name.toLowerCase()))
      ) {
        await durs.push(video.duration.seconds);

        if (
          vidTitle.includes("official") ||
          video.author.name.toLowerCase().includes(artist.toLowerCase()) ||
          vidTitle.toLowerCase().includes(artist.toLowerCase())
        ) {
          //console.log(video);
          await newDurs.push(video.seconds);
          if (video.seconds === output(newDurs)) {
            await result.push(video);
            return await video;
          }
        }
        if (
          !result.length &&
          video.seconds === output(durs) &&
          !newDurs.length
        ) {
          console.log("hello");
          //await result.push(video);
          return await video;
        }
      }
    });

    Promise.all(vid)
      .then(async (vidRes) => {
        vidRes = vidRes.filter((v) => typeof v !== "undefined");
        if (vidRes.length) {
          await console.log(vidRes);
          let streamLink = await Youtube.streamLink(
            await vidRes[0].url,
            { type: "audio", codec: "opus" },
            false
          );
          res.json(streamLink);
          return;
        } else {
          res.json(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    res.sendStatus(400);
  }
});

app.post("/api/dl", async (req, res) => {
  const track_url = req.body.trackUrl;
  const data = await spotify.getTrack(track_url);
  const song = await spotify.downloadTrack(track_url);
  await fs.writeFileSync(`${data.name}.mp3`, song);
  res.json(song);
});

app.listen(PORT);
module.exports = app;
