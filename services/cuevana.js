import fetch from "node-fetch";
import cheerio from "cheerio";
import { chromium } from "playwright";

export const getTomatomatelaSrc = async url => {
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

export const getTomatomatelaEmbed = async urlPrm => {
  return new Promise(async (resolve, reject) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    let totalLoaded = 0;

    page.on("load", () => {
      totalLoaded++;
      const _redirectUrl = page.url();

      if (_redirectUrl?.indexOf("embed.html") != -1) {
        console.log("page load", { _redirectUrl });
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

export const getFile = async url => {
  try {
    console.log({ url });
    const response = await fetch(url);
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const testRedirect = () => {
  // const request = https.request(
  //   new URL(
  //     "https://apialfa.tomatomatela.com/ir/goto.php?h=bHJMRW1oTVhldDJJZnZnUE10V3NBQmx5b2ZqemljRFk1RmUybGphTUI2ZFhTWTNzZkUwOXAza0NTSktMWW9vQ1pWSXViY2JaOEdPazE4bjBVS2NMUXhlRWUwWWhxU0ZjdGNIT0dBWFI5U2VWdTJaK0ZiTDQ4UGVXckcwTG5RcEpmRTVLZlZCVE9OTHVlQVBOa3FrSHdNVCtOZTBHSnpFQWFvN0kvL2d2Ty9SUjdxMitPcnNQbi8rVk53cHZWVTNLaDJQWlJHYWgvNFl2aGNsb09NdnQ1b3I4bm1kRjJKWkY3WTV2Z3pwNTlvM3NWNWdCM3VKZWV6VEFDOEJ4R1BRbXF5NWFrU0RVU2FPd1FLSUZRaWhlU0IzVmI0M3FsNUM2OC92bC9CaUN3QXVYZmZZSGdvbFI5SktISUxVWE9zWWQ3cTlaeFlVOVZSeFAvTXBVRXl5NXF3PT0"
  //   ),
  //   // new URL("https://bitly.com/UHfDGO"),
  //   response => {
  //     console.log(response.responseUrl);
  //     // 'http://duckduckgo.com/robots.txt'
  //   }
  // );
  // request.end();
};
