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
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    if (
      req.resourceType() === "stylesheet" ||
      req.resourceType() === "font" ||
      req.resourceType() === "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url);

  await page.waitForSelector(".fa-stopwatch");

  const result = await page.evaluate(() => {
    return document
      .querySelectorAll(".text-1-1rem")[2]
      .textContent.trim()
      .replace("\n", "")
      .replace("            ", " ");
  });

  await browser.close();

  return {
    statusCode: 200,
    body: result,
  };
};
