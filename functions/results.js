const chromium = require("chrome-aws-lambda");

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);

  const departure = params.departure;
  const arrival = params.arrival;
  const date = params.date;

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

  await page.goto(
    `https://mersultrenurilor.infofer.ro/en-GB/Itineraries?DepartureDate=${date}&DepartureStationName=${departure}&ArrivalStationName=${arrival}&MinutesInDay=0&TryToPost=true`
  );

  await page.waitForSelector(".div-itineraries-departure-arrival");

  let id = 0;
  const results = await page.evaluate((id) => {
    const fares = document.querySelectorAll("#div-results > ul > li");

    return [...fares].map((fare) => ({
      id: id++,

      departure: {
        station: fare.querySelectorAll(".text-1-1rem")[0].textContent.trim(),
        date: fare
          .querySelectorAll(".div-itineraries-departure-arrival")[0]
          .textContent.trim()
          .replace("Dep ", "")
          .slice(0, -6),
        time: fare.querySelectorAll(".text-1-4rem")[0].textContent,
      },

      arrival: {
        station: fare.querySelectorAll(".text-1-1rem")[1].textContent.trim(),
        date: fare
          .querySelectorAll(".div-itineraries-departure-arrival")[1]
          .textContent.trim()
          .replace("Arr ", "")
          .slice(0, -6),
        time: fare.querySelectorAll(".text-1-4rem")[1].textContent,
      },

      fare: {
        completed: fare.querySelectorAll(".color-gray").length > 0,
        duration: fare.querySelector(".d-inline-block").textContent.trim(),
        stops: [
          ...fare
            .querySelectorAll(".list-group-itinerary-part li")[1]
            .querySelectorAll(".col-9.color-blue"),
        ].map((stop) => stop.textContent.trim()),
      },

      train: {
        type: fare
          .querySelector(".col-8 .div-middle div > span")
          .textContent.trim(),
        number: fare
          .querySelector(".col-8 .div-middle div > a")
          .textContent.trim(),
        url: fare.querySelector(".col-8 .div-middle div > a").href,
      },
    }));
  }, id);

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};
