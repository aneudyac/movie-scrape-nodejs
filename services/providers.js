import cuevana from "./cuevana.js";
import ennovelas from "./ennovelas.js";

export default url => {
  const _url = new URL(url);

  if (_url.host === "ww1.cuevana3.me") {
    return cuevana;
  }

  if (_url.host === "www.ennovelas.com") {
    return ennovelas;
  }

  throw new Error("Host not found: " + _url.host);
};
