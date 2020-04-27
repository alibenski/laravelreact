import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

function Index() {
    return (
        <Fragment>
            <Router>
                <App />
            </Router>
        </Fragment>
    );
}

export default Index;

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
