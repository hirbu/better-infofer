import { useContext } from "react";

import ResultsContext from "../../context/results.context";
import InfoContext from "../../context/info.context";

import "./Info.css";

export default function Info() {
  const { results } = useContext(ResultsContext);
  const { index } = useContext(InfoContext);

  const result = results[index];

  const Pre = () => (
    <p className="text">The information about the trip will show here.</p>
  );

  const After = () => {
    let changes = [];

    for (let i = 0; i < result.changes.length - 1; i++) {
      changes = [
        ...changes,
        <div key={Math.random()}>
          <h3>Change #{i + 1}</h3>
          <hr className="double" />
          <p>
            <span>Station of departure </span>
            {result.changes[i].name}
          </p>
          <p>
            <span>Time of departure </span>
            {result.changes[i].departure.time}
          </p>
          <p>
            <span>Date of departure </span>
            {result.changes[i].departure.date}
          </p>
          <hr />
          <p>
            <span>Station of arrival </span>
            {result.changes[i + 1].name}
          </p>
          <p>
            <span>Time of arrival </span>
            {result.changes[i].arrival.time}
          </p>
          <p>
            <span>Date of arrival </span>
            {result.changes[i].arrival.date}
          </p>
          <hr />
          <p>
            <span>Past </span>
            {result.fare.completed ? "Yes" : "No"}
          </p>
          <p>
            <span>Train identification </span>
            {/*eslint-disable-next-line react/jsx-no-target-blank*/}
            <a
              target="_blank"
              rel="noopener nofollow"
              href={result.changes[i].train.url}
            >
              {result.changes[i].train.name}
            </a>
          </p>
          <p>
            <span>Length </span>
            {result.changes[i].train.length}
          </p>
          <p>
            <span>Operator </span>
            {result.changes[i].train.operator}
          </p>
          <p>
            <span>Facilities </span>
            {result.changes[i].train.facilities.map((facility) => (
              <span key={Math.random()} className="no comma">
                {facility}
              </span>
            ))}
          </p>
          <p>
            <span>Number of stops </span>
            {result.changes[i].stops.count}
          </p>
          <p>
            <span>Lists of stops </span>
            {result.changes[i].stops.list.map((stop) => (
              <span key={Math.random()} className="no comma">
                {stop}
              </span>
            ))}
          </p>
          <hr className="double" />
        </div>,
      ];
    }

    return <div>{changes.map((change) => change)}</div>;
  };

  return <div className="info">{index === -1 ? <Pre /> : <After />}</div>;
}
