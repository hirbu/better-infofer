import { useContext } from "react";

import InfoContext from "../../../context/info.context";

import "./Result.css";

export default function Result({ result }) {
  const { setIndex } = useContext(InfoContext);

  return (
    <li
      className="result"
      data-disabled={result.fare.completed ? "true" : "false"}
      onClick={() => {
        setIndex(result.id);
      }}
    >
      <h3>{result.departure.time}</h3>
      <div className="rdecoration">
        <p>{result.train.type + result.train.number}</p>
        <hr />
        <p>{result.fare.duration}</p>
      </div>
      <h3>{result.arrival.time}</h3>
    </li>
  );
}
