import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, BaseProvider } from "baseui";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { client } from "./apolloClient";
import SchoolList from "./components/SchoolList";
import SheetList from "./components/SheetList";

const engine = new Styletron();

const App = () => {
  return (
    <>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <ApolloProvider client={client}>
            <MemoryRouter>
              <Switch>
                <Route exact path="/" component={SchoolList} />
                <Route path="/set/:id">
                  <SheetList />
                </Route>
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
