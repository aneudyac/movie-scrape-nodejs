const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { chromium } = require("playwright");

const getTomatomatelaSrc = async url => {
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);
    let src = $("#OptL1 > iframe").attr("data-src");
    src = "https:" + src.replace("player.php", "goto.php");

    return Promise.resolve(src);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getTomatomatelaEmbed = async urlPrm => {
  return new Promise(async (resolve, reject) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    let totalLoaded = 0;

    page.on("load", () => {
      totalLoaded++;
      const _redirectUrl = page.url();

      // console.log("page load", { _redirectUrl });
      if (_redirectUrl?.indexOf("embed.html") != -1) {
        resolve(_redirectUrl);
      }

      if (totalLoaded >= 5) return Promise.resolve(null);
      // console.log(page.url());
    });

    // page.on("domcontentloaded", () => {
    //   console.log("page domcontentloaded");
    //   console.log(page.url());
    // });

    await page.goto(urlPrm);
    await page.waitForNavigation();

    // while (true) {}
    // const href = await page.evaluate(() => {
    //   return Promise.resolve(location.href);
    // });

    // console.log({ href });
    // await browser.close();
  });
};

const getFile = async url => {
  try {
    console.log({ url });
    const response = await fetch(url);
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = async (url, headers) => {
  try {
    let src = await getTomatomatelaSrc(url);
    const embed = await getTomatomatelaEmbed(src);

    let file = embed.split("#")[1];
    let checkUrl = "https://tomatomatela.com/details.php?v=" + file;

    const data = await getFile(checkUrl);
    return Promise.resolve(data.file);
  } catch (error) {
    return Promise.reject(error);
  }
};
