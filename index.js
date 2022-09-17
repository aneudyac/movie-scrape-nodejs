import {
  getTomatomatelaSrc,
  getTomatomatelaEmbed,
  getFile,
  testRedirect,
} from "./services/cuevana.js";
const url = "https://ww1.cuevana3.me/61578/doragon-boru-supa-supa-hiro";

(async () => {
  let src = await getTomatomatelaSrc(url);
  const embed = await getTomatomatelaEmbed(src);

  let file = embed.split("#")[1];
  let checkUrl = "https://tomatomatela.com/details.php?v=" + file;

  const data = await getFile(checkUrl);
  console.log({ data });
})();
