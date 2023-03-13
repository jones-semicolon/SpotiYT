const express = require("express");
const fs = require("fs-extra");
const MusicSearch = require("@kamkam1_0/music-search");
const yts = require('yt-search')
const app = express();
app.use(express.json());
const path = require("path")
const PORT = process.env.PORT || 5174;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post("/api", async (req, res) => {
  var title = await req.body.title.replace(/\([^()]*\)|\s-.*/g, "");
  var artist = await req.body.artist;
  var goal = Math.round(req.body.duration / 1000);
  var query = artist + ' - ' + title + " official";
  let Youtube = new MusicSearch.Youtube();

  const output = (arr) => arr.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  try {
    const r = await yts({ query, order: 'viewCount' })
    const videos = r.videos
    let durs = [];
    let result = []
    await videos.forEach(async (video) => {
      if (video.title.toLowerCase().includes(title.toLowerCase()) && !video.title.toLowerCase().includes("live") && !video.title.toLowerCase().includes("instrumental")) {
        await durs.push(video.duration.seconds)
        if (video.seconds === output(durs)) {
          if (video.title.toLowerCase().includes("official")) {
            await result.push(video) 
            return;
          }
          if(result.length < 1) {
            await result.push(video)
          }
        }
      }
    })

    let streamLink = await Youtube.streamLink(
      await result[0].url,
      { type: "audio", codec: "opus" },
      false
    ); 
    res.json(streamLink);
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
module.exports = app
