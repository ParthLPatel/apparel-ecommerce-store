import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-light text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron text-center mt-5">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

    <footer className="fixed-bottom footer bg-dark mt-auto py-3">
      <div className="container text-center">
        <span className="text-white">© 2022 Copyright</span>
      </div>
    </footer>
  </div>
);

export default Base;
