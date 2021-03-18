import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "./apolloClient";
import SchoolList from "./components/SchoolList";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <h2>React up and running</h2>
          <p>This is a react app.</p>
          <SchoolList />
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
};

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
