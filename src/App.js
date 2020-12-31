import Search from "./components/Search/Search";
import Results from "./components/Results/Results";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
//
import { useState } from "react";

import moment from "moment";

import QueryContext from "./context/query.context";
import ErrorsContext from "./context/errors.context";

import "./App.css";
import ResultsContext from "./context/results.context";

export default function App() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(
    moment().add(2, "hours").format("YYYY-MM-DD")
  );
  const [clicked, setClicked] = useState(false);

  const [departureErr, setDepartureErr] = useState("");
  const [arrivalErr, setArrivalErr] = useState("");

  const [results, setResults] = useState([]);

  return (
    <main className="app">
      <ResultsContext.Provider value={{ results, setResults }}>
        <QueryContext.Provider
          value={{
            departure,
            arrival,
            date,
            clicked,
            setDeparture,
            setArrival,
            setDate,
            setClicked,
          }}
        >
          <ErrorsContext.Provider
            value={{ departureErr, arrivalErr, setDepartureErr, setArrivalErr }}
          >
            <Search />
          </ErrorsContext.Provider>
          <Results />
          <Info />
        </QueryContext.Provider>
      </ResultsContext.Provider>
      <Footer />
    </main>
  );
}
