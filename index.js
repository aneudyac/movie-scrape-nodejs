import express from "express";
import cors from "cors";
import getVideoUrlController from "./controllers/getVideoUrl.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("MOVIE API");
});

app.get("/ping", (req, res) => {
  const { url } = req.query;
  res.send({ url });
});

app.get("/get-stream", async (req, res) => {
  try {
    const { url } = req.query;
    const data = await getVideoUrlController({ url });
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message || error);
  }
});

app.listen(3000, () => {
  console.log("Express server listening on 3000 - Vercel");
});

module.exports = app;

// const url = "https://ww1.cuevana3.me/61578/doragon-boru-supa-supa-hiro";
// const url = "https://ww1.cuevana3.me/59691/thor-love-and-thunder";
// const url = "https://www.ennovelas.com/bqoary82m9ie";

// (async () => {
//   const data = await getVideoUrlController({ url });
//   console.log({ data });
// })();
