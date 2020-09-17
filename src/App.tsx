import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { BookView } from "./containers/Book/BookView";
import { Home } from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/book/:id/:value">
            <BookView />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
