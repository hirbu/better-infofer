import { useContext } from "react";

import moment from "moment";

import QueryContext from "../../../context/query.context";
import ErrorsContext from "../../../context/errors.context";
import ResultsContext from "../../../context/results.context";

import "./Submit.css";

const stations = require("../../../data/stations.json");

export default function Submit() {
  const { departure, arrival, date } = useContext(QueryContext);
  const { setDepartureErr, setArrivalErr } = useContext(ErrorsContext);
  const { setResults } = useContext(ResultsContext);

  const error = (string, value, setErr) => {
    if (value === "") {
      setErr(`Plese fill in the desired ${string} station.`);
      return false;
    }

    const station = stations.find((station) => station[0] === value);

    if (station === undefined) {
      setErr(`This ${string} station doesn't exists.`);
      return false;
    }

    setErr("");
    return station[0];
  };

  const submit = () => {
    const departureChecked = error("departure", departure, setDepartureErr);
    const arrivalChecked = error("arrival", arrival, setArrivalErr);
    const dateChecked = moment(date).format("DD.MM.YYYY");

    if (departureChecked && arrivalChecked) {
      fetch("/.netlify/functions/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          departure: departureChecked,
          arrival: arrivalChecked,
          date: dateChecked,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setResults(json);
        });
    }
  };

  return (
    <div className="submit">
      <button className="button" onClick={submit}>
        Search
      </button>
    </div>
  );
}
