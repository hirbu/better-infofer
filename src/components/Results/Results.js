import { useContext } from "react";

import "./Results.css";

import ResultsContext from "../../context/results.context";

import Result from "./Result/Result";

export default function Results() {
  const { results } = useContext(ResultsContext);

  const Pre = () => <p className="text">Results will show here.</p>;

  const After = () => (
    <ul>
      {results.map((result) => (
        <Result result={result} />
      ))}
    </ul>
  );

  return (
    <div className="results">{results.length === 0 ? <Pre /> : <After />}</div>
  );
}
