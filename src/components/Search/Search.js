import Decorative from "./Decorative/Decorative";
import Inputs from "./Inputs/Inputs";
import Submit from "./Submit/Submit";

import "./Search.css";

export default function Search() {
  return (
    <div className="search">
      <Decorative />
      <Inputs />
      <Submit />
    </div>
  );
}
