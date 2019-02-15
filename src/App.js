import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// import ItemModal from "./components/ItemModal";
import AppNavbar from "./components/AppNavbar";
import GiftList from "./components/GiftList";
import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
// import FilteredGiftList from "./components/FilteredGiftList";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <>
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/list" component={GiftList} />
                {/* <Route exact path="/modal" component={ItemModal} /> */}
                <Route exact path="/quiz" component={Quiz} />
                {/* <Route exact path="/ftlist" component={FilteredGiftList} /> */}
              </Switch>
            </div>
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
