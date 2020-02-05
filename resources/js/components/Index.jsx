import React, { Fragment } from "react";
import ReactDOM from "react-dom";
// import TopBar from "./navigation/TopBar";
import TemporaryDrawer from "./navigation/TemporaryDrawer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SkillsGroup from "./skills/SkillsGroup";
import UserForm from "./form/UserForm";

function Index() {
    return (
        <Fragment>
            <Router>
                {/* <TopBar /> */}
                <TemporaryDrawer />
                <div className="app">
                    <Route exact path="/skill-index" component={SkillsGroup} />
                    <Route exact path="/user-form" component={UserForm} />
                </div>
            </Router>
        </Fragment>
    );
}

export default Index;

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
