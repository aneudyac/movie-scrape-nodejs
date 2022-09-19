import getVideoUrlController from "./controllers/getVideoUrl.js";

// const url = "https://ww1.cuevana3.me/61578/doragon-boru-supa-supa-hiro";
// const url = "https://ww1.cuevana3.me/59691/thor-love-and-thunder";
const url = "https://www.ennovelas.com/bqoary82m9ie";

(async () => {
  const data = await getVideoUrlController({ url });
  console.log({ data });
})();
