import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { client } from "./apolloClient";
import SchoolList from "./components/SchoolList";

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <h2>React up and running</h2>
        <p>This is a react app.</p>
        <SchoolList />
      </ApolloProvider>
    </>
  );
};

function render() {
  ReactDOM.render(<App />, document.body);
}

render();
