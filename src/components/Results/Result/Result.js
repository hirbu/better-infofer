import "./Result.css";

export default function Result({ result }) {
  return (
    <li
      className="result"
      key={result.train.number}
      data-disabled={result.fare.completed ? "true" : "false"}
    >
      <h3>{result.departure.time}</h3>
      <div class="rdecoration">
        <p>{result.train.type + result.train.number}</p>
        <hr />
        <p>{result.fare.duration}</p>
      </div>
      <h3>{result.arrival.time}</h3>
    </li>
  );
}
