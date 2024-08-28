import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello, SSR with React!"),
    React.createElement("p", null, "This content is rendered on the client.")
  );
};

const root = ReactDOM.hydrateRoot(document.getElementById("root"), React.createElement(App));
