import { useContext, useState, useEffect } from "react";

import ResultsContext from "../../context/results.context";
import InfoContext from "../../context/info.context";

import "./Info.css";

export default function Info() {
  const [delay, setDelay] = useState("Loading...");

  const { results } = useContext(ResultsContext);
  const { index } = useContext(InfoContext);

  const result = results[index];

  useEffect(() => {
    if (index !== -1) {
      const url = result.train.url;

      fetch("/.netlify/functions/delay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          url: url,
        }),
      })
        .then((data) => data.text())
        .then((text) => setDelay(text));
    }
  });

  const Pre = () => (
    <p className="text">The information about the trip will show here.</p>
  );

  const After = () => (
    <div>
      <p>
        <span>Station of departure: </span>
        {result.departure.station}
      </p>
      <p>
        <span>Time of departure: </span>
        {result.departure.time}
      </p>
      <p>
        <span>Date of departure: </span>
        {result.departure.date}
      </p>
      <hr />
      <p>
        <span>Station of arrival: </span>
        {result.arrival.station}
      </p>
      <p>
        <span>Time of arrival: </span>
        {result.arrival.time}
      </p>
      <p>
        <span>Date of arrival: </span>
        {result.arrival.date}
      </p>
      <hr />
      <p>
        <span>Delay: </span>
        {delay}
      </p>
      <p>
        <span>Past: </span>
        {result.fare.completed ? "Yes" : "No"}
      </p>
      <p>
        <span>Train type and number: </span>
        <a href={result.train.url} rel="noopener nofollow" target="_blank">
          {result.train.type}
          {result.train.number}
        </a>
      </p>
      <p>
        <span>Numbers of train stops: </span>
        {result.fare.stops.length}
      </p>
      <p>
        <span>Train stops: </span>
        {result.fare.stops.join(", ")}
      </p>
    </div>
  );

  return <div className="info">{index === -1 ? <Pre /> : <After />}</div>;
}
