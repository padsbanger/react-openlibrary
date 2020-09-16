import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Book } from "./containers/Book/Book";
import { Home } from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">Search books</header>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/book/:id">
            <Book />
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
