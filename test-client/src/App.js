import React, { useState } from "react";
import "./App.css";
import ApiExamples from "./components/ApiExamples";
import Setup from "./components/Setup";
import Overview from "./components/Overview";

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Overview />
        <ApiExamples />
        <Setup />
      </div>
    </div>
  );
};

export default App;
