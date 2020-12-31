import { useContext } from "react";

import Input from "./Input/Input";
import DatePicker from "./DatePicker/DatePicker";

import QueryContext from "../../../context/query.context";
import ErrorsContext from "../../../context/errors.context";

import "./Inputs.css";

export default function Inputs() {
  const {
    departure,
    arrival,
    date,
    setDeparture,
    setArrival,
    setDate,
  } = useContext(QueryContext);

  const { departureErr, arrivalErr } = useContext(ErrorsContext);

  return (
    <div className="inputs">
      <div>
        <label onClick={() => setDeparture("")}>Departure Station</label>
        <Input
          id="departure"
          value={departure}
          set={setDeparture}
          placeholder="e.g. București Nord"
        />
        <span className="error">{departureErr}</span>
      </div>

      <div>
        <label onClick={() => setArrival("")}>Arrival Station</label>
        <Input
          id="arrival"
          value={arrival}
          set={setArrival}
          placeholder="e.g. Brașov"
        />
        <span className="error">{arrivalErr}</span>
      </div>

      <div>
        <label onClick={() => setDate(new Date().toISOString().split("T")[0])}>
          Date of Departure
        </label>
        <DatePicker
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
