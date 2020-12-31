import { createContext } from "react";

import moment from "moment";

const QueryContext = createContext({
  departure: "",
  arrival: "",
  date: moment().add(2, "hours").format("YYYY-MM-DD"),
  setDeparture: () => {},
  setArrival: () => {},
  setDate: () => {},
});

export default QueryContext;
