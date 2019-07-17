const puppeteer = require("puppeteer");

module.exports = async function() {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();
    await page.goto("https://subterrane.com");
    await page.screenshot({ path: "subterrane.png" });

    await browser.close();
    return true;
  } catch (err) {
    return false;
  }
};
