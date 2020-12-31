import Search from "./components/Search/Search";
import Results from "./components/Results/Results";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";

import { useState } from "react";

import moment from "moment";

import QueryContext from "./context/query.context";
import ErrorsContext from "./context/errors.context";
import ResultsContext from "./context/results.context";
import InfoContext from "./context/info.context";

import "./App.css";

export default function App() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(
    moment().add(2, "hours").format("YYYY-MM-DD")
  );

  const [departureErr, setDepartureErr] = useState("");
  const [arrivalErr, setArrivalErr] = useState("");

  const [results, setResults] = useState([]);

  const [index, setIndex] = useState(-1);

  return (
    <main className="app">
      <QueryContext.Provider
        value={{
          departure,
          arrival,
          date,
          setDeparture,
          setArrival,
          setDate,
        }}
      >
        <ResultsContext.Provider value={{ results, setResults }}>
          <InfoContext.Provider value={{ index, setIndex }}>
            <ErrorsContext.Provider
              value={{
                departureErr,
                arrivalErr,
                setDepartureErr,
                setArrivalErr,
              }}
            >
              <Search />
            </ErrorsContext.Provider>
            <Results />
            <Info />
          </InfoContext.Provider>
        </ResultsContext.Provider>
      </QueryContext.Provider>
      <Footer />
    </main>
  );
}
