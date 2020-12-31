import Logo from "./Logo/Logo";

import "./Decorative.css";

export default function Decorative() {
  return (
    <div className="decorative">
      <h1 className="title">better</h1>
      <div className="logo-wrapper">
        <Logo />
      </div>
      <h1 className="title">infofer</h1>
    </div>
  );
}
