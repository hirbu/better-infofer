import { createContext } from "react";

const InfoContext = createContext({
  index: -1,
  setIndex: () => {},
});

export default InfoContext;
