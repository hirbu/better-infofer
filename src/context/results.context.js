import { createContext } from "react";

const ResultsContext = createContext({
  results: [],
  setResults: () => {},
});

export default ResultsContext;
