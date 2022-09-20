const cuevana = require("./cuevana.js");
const ennovelas = require("./ennovelas.js");

module.exports = url => {
  const _url = new URL(url);

  if (_url.host === "ww1.cuevana3.me") {
    return cuevana;
  }

  if (_url.host === "www.ennovelas.com") {
    return ennovelas;
  }

  throw new Error("Host not found: " + _url.host);
};
