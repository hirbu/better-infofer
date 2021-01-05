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

    return [...fares].map((fare) => {
      let changes = [];

      const dataPoints = fare.querySelectorAll("li");

      for (let i = 0; i < dataPoints.length; i++) {
        if (i + 1 >= dataPoints.length) {
          changes = [
            ...changes,
            {
              name: dataPoints[i]
                .querySelector(".color-blue")
                .textContent.trim(),
              type: "end",
            },
          ];
        } else {
          changes = [
            ...changes,
            {
              name: dataPoints[i++]
                .querySelector(".color-blue")
                .textContent.trim(),
              type: i === 1 ? "begin" : "intermediary",
              departure: {
                time: dataPoints[i]
                  .querySelectorAll(".div-itineraries-departure-arrival")[0]
                  .textContent.trim()
                  .substr(-6),
                date:
                  dataPoints[i]
                    .querySelectorAll(".div-itineraries-departure-arrival")[0]
                    .textContent.trim()
                    .replace("Dep ", "")
                    .slice(0, -6) +
                  " " +
                  new Date().getFullYear(),
              },
              arrival: {
                time: dataPoints[i]
                  .querySelectorAll(".div-itineraries-departure-arrival")[1]
                  .textContent.trim()
                  .substr(-6),
                date:
                  dataPoints[i]
                    .querySelectorAll(".div-itineraries-departure-arrival")[1]
                    .textContent.trim()
                    .replace("Arr ", "")
                    .slice(0, -6) +
                  " " +
                  new Date().getFullYear(),
              },
              train: {
                name: dataPoints[i]
                  .querySelector(".col-6.col-md-7.col-lg-8")
                  .querySelector(".col-md-6.col-lg-5.align-self-center")
                  .textContent.trim()
                  .replaceAll("\n", " ")
                  .replace(/ +(?= )/g, "")
                  .split(" with ")[1]
                  .replace(" ", ""),
                length: dataPoints[i]
                  .querySelector(".col-6.col-md-7.col-lg-8")
                  .querySelector(".col-md-6.col-lg-5.align-self-center")
                  .textContent.trim()
                  .replaceAll("\n", " ")
                  .replace(/ +(?= )/g, "")
                  .split(" with ")[0],
                url: dataPoints[i]
                  .querySelector(".col-6.col-md-7.col-lg-8")
                  .querySelector("a").href,
                operator: dataPoints[i]
                  .querySelector(".col-6.col-md-7.col-lg-8")
                  .querySelector(".col-12.col-lg-6.align-self-center")
                  .textContent.trim()
                  .replaceAll("\n", " ")
                  .replace(/ +(?= )/g, "")
                  .replace("Operated by ", ""),
                facilities: [
                  ...dataPoints[i]
                    .querySelector(".col-6.col-md-7.col-lg-8")
                    .querySelectorAll(".sr-only"),
                ].map((facility) =>
                  facility.textContent.replace(
                    " (the ticket is issued compulsory and automatically with the reservation included in the price)",
                    ""
                  )
                ),
              },
              stops: {
                list: [
                  ...dataPoints[i].querySelectorAll(".color-blue"),
                ].map((stop) => stop.textContent.trim()),
                count: dataPoints[i].querySelectorAll(".color-blue").length,
              },
            },
          ];
        }
      }

      return {
        id: id++,
        changes: changes,
        fare: {
          completed: fare.querySelectorAll(".color-gray").length > 0,
          duration: fare.querySelector(".d-inline-block").textContent.trim(),
        },
      };
    });
  }, id);

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
};
