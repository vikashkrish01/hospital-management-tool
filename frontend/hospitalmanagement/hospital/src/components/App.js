import React from "react";
import Header from "../ui/Header";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "../ui/Landing";
import store from "../Store/Store";
import "../../src/App.css";
import FooterPage from "../ui/FooterPage";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            {
              //Public Routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Landing} />
          </Switch>
          {/* <Route exact path="/register" component={Register} /> */}
          {/* <Route exact path="/login" component={Login} /> */}

          <FooterPage />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
