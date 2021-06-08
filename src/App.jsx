import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Search from "./components/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/Search">
            <Nav />
            <Search />
          </Route>
          <Route exactpath="/">
            <Nav />
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
