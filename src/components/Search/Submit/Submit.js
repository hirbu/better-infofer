import { useContext } from "react";

import moment from "moment";

import QueryContext from "../../../context/query.context";
import ErrorsContext from "../../../context/errors.context";
import ResultsContext from "../../../context/results.context";
import InfoContext from "../../../context/info.context";
import ScreenContext from "../../../context/navigation.context";

import "./Submit.css";

const stations = require("../../../data/stations.json");

export default function Submit() {
  const { departure, arrival, date } = useContext(QueryContext);
  const { setDepartureErr, setArrivalErr } = useContext(ErrorsContext);
  const { setResults } = useContext(ResultsContext);
  const { setIndex } = useContext(InfoContext);
  const { setScreen } = useContext(ScreenContext);

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
      setScreen("aresults");
      setResults([]);

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
          setIndex(-1);
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
