import fetch from "node-fetch";
import cheerio from "cheerio";
import { chromium } from "playwright";

export default async (url, headers) => {
  return new Promise(async (resolve, reject) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    let totalLoaded = 0;

    await page.goto(url);

    const video = await page.evaluate(() => {
      return Promise.resolve(document.querySelector("video").src);
    });

    resolve(video);
    await browser.close();
  });
};
