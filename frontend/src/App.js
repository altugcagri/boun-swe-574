import React, { Component } from "react";

// Controllers
import history from "./controllers/history";
import Navigator from "./controllers/navigator";
import "bootstrap/dist/css/bootstrap.min.css";

// Deps
import { Router } from "react-router-dom";
import { checkLoginStatus } from "data/store.user";
import "@babel/polyfill";

//require('es6-object-assign/auto');
//require('es6-promise').polyfill();

class App extends Component {
    componentDidMount() {
        checkLoginStatus();
    }

    render() {
        return (
            <Router history={history}>
                <Navigator />
            </Router>
        );
    }
}

export default App;
