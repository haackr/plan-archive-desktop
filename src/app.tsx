import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <>
      <h2>React up and running</h2>
      <p>This is a react app.</p>
    </>
  );
};

function render() {
  ReactDOM.render(<App />, document.body);
}

render();
