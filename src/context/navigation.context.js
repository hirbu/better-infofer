import { createContext } from "react";

const ScreenContext = createContext({
  screen: -1,
  setScreen: () => {},
});

export default ScreenContext;
