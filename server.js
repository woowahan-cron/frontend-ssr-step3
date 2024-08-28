import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";

// React 컴포넌트 정의 (JSX 없이)
const App = () => {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello, SSR with React!"),
    React.createElement("p", null, "This content is rendered on the server.")
  );
};

// Express 서버 설정
const app = express();

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  const appString = renderToString(React.createElement(App));

  const indexFile = path.resolve("./public/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html file:", err);
      return res.status(500).send("An error occurred");
    }

    res.setHeader("Cache-Control", "no-store"); // 캐시 비활성화
    res.status(200).send(data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`));
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
