const chromium = require("chrome-aws-lambda");

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);

  const url = params.url;

  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920 / 3,
    height: 1080,
  });

  await page.setRequestInterception(true);

  page.on("request", (req) => {
    if (req.resourceType() === "font") {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url);

  await page.waitForSelector("#button-map");

  await page.clickAndWaitForNavigation("#button-map");

  await page.evaluate(() => {
    document
      .querySelector("#div-fullscreen-2-map-div")
      .style("filter", "grayscale(0)");
  });

  const map = await page.$("#div-fullscreen-2-map-div");

  const result = await map.screenshot({
    encoding: "base64",
  });

  await browser.close();

  return {
    statusCode: 200,
    body: result,
  };
};
