import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, BaseProvider } from "baseui";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { client } from "./apolloClient";
import SchoolList from "./components/SchoolList";

const engine = new Styletron();

const App = () => {
  return (
    <>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <ApolloProvider client={client}>
            <MemoryRouter>
              <Switch>
                <Route path="/" component={SchoolList} />
              </Switch>
            </MemoryRouter>
          </ApolloProvider>
        </BaseProvider>
      </StyletronProvider>
    </>
  );
};

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
