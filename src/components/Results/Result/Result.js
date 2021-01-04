import { useContext } from "react";

import InfoContext from "../../../context/info.context";

import "./Result.css";

export default function Result({ result }) {
  const { setIndex } = useContext(InfoContext);

  let train = result.changes[0].train.name;
  if (result.changes.length > 2) {
    if (result.changes.length > 3) {
      train += " > (" + (result.changes.length - 3) + ")";
    }
    train += " > " + result.changes[result.changes.length - 2].train.name;
  }

  return (
    <li
      className="result"
      onClick={() => {
        setIndex(result.id);
      }}
    >
      <h3>{result.changes[0].departure.time}</h3>
      <div>
        <p className="first">{train}</p>
        <p className="second">{result.fare.duration}utes</p>
      </div>
      <h3>{result.changes[result.changes.length - 2].arrival.time}</h3>
    </li>
  );
}
