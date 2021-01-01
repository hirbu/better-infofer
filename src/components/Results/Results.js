import { useContext, useState } from "react";

import "./Results.css";

import ResultsContext from "../../context/results.context";

import Result from "./Result/Result";

export default function Results() {
  const { results } = useContext(ResultsContext);

  const [displayPastTrains, setDisplayPastTrains] = useState(false);

  const Pre = () => <p className="text">Results will show here.</p>;

  const After = () => {
    const Button = () => (
      <li
        className="display"
        onClick={() => setDisplayPastTrains(!displayPastTrains)}
      >
        Click here to {displayPastTrains ? "hide" : "display"} past trains
      </li>
    );

    const Past = () =>
      displayPastTrains
        ? results
            .filter((result) => result.fare.completed)
            .map((result) => <Result key={result.id} result={result} />)
        : null;

    const Future = () =>
      results
        .filter((result) => !result.fare.completed)
        .map((result) => <Result key={result.id} result={result} />);

    return (
      <ul>
        <Past />
        <Button />
        <Future />
      </ul>
    );
  };

  return (
    <div className="results">{results.length === 0 ? <Pre /> : <After />}</div>
  );
}
