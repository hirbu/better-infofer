import { useContext } from "react";

import "./Navigation.css";

import ScreenContext from "../../context/navigation.context";

export default function Navigation() {
  const { screen, setScreen } = useContext(ScreenContext);

  if (screen === "asearch") {
    return <div className="navigation"></div>;
  }

  const PreviousButton = () => {
    return (
      <div>
        <button
          onClick={() =>
            setScreen(screen === "aresults" ? "asearch" : "aresults")
          }
        >
          {"<"}
        </button>
      </div>
    );
  };

  return (
    <div className="navigation">
      <PreviousButton />
    </div>
  );
}
