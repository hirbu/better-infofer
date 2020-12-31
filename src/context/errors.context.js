import { createContext } from "react";

const ErrorsContext = createContext({
  departureErr: "",
  arrivalErr: "",
  setDepartureErr: () => {},
  setArrivalErr: () => {},
});

export default ErrorsContext;
