import { useContext } from "react";

import InfoContext from "../../../context/info.context";
import ScreenContext from "../../../context/navigation.context";

import "./Result.css";

export default function Result({ result }) {
  const { index, setIndex } = useContext(InfoContext);
  const { setScreen } = useContext(ScreenContext);

  let train = result.changes[0].train.name;
  if (result.changes.length > 2) {
    if (result.changes.length > 3) {
      train += " > (" + (result.changes.length - 3) + ")";
    }
    train += " > " + result.changes[result.changes.length - 2].train.name;
  }

  let classes = "result";
  if (index === result.id) {
    classes += " current";
  }

  return (
    <li
      className={classes}
      onClick={() => {
        setIndex(result.id);
        setScreen("ainfo");
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
