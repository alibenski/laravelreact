import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import TopBar from "./navigation/TopBar";
import LoginForm from "./authentication/LoginForm";
import TemporaryDrawer from "./navigation/TemporaryDrawer";
import SkillsGroup from "./skills/SkillsGroup";
import UserForm from "./form/UserForm";
import UserProfileGroup from "./profile/UserProfileGroup";
import CreateProfileGroup from "./profile/CreateProfileGroup";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";

function Index() {
    const theme = createMuiTheme({
        palette: {
            primary: orange,
            secondary: blueGrey
        }
    });

    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <Router>
                    {/* <TopBar /> */}
                    <TemporaryDrawer />
                    <div className="app">
                        <Route exact path="/login" component={LoginForm} />
                        <Route
                            exact
                            path="/skill-index"
                            component={SkillsGroup}
                        />
                        <Route exact path="/user-form" component={UserForm} />
                        <Route
                            exact
                            path="/profile"
                            component={UserProfileGroup}
                        />
                        <Route
                            exact
                            path="/create-profile"
                            component={CreateProfileGroup}
                        />
                    </div>
                </Router>
            </ThemeProvider>
        </Fragment>
    );
}

export default Index;

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
