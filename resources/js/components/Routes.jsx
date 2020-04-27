import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./authentication/LoginForm";
import SkillsGroup from "./skills/SkillsGroup";
import UserForm from "./form/UserForm";
import UserProfileGroup from "./profile/UserProfileGroup";
import CreateProfileGroup from "./profile/CreateProfileGroup";
import NotFound from "./pages/NotFound";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/skill-index" component={SkillsGroup} />
            <Route exact path="/user-form" component={UserForm} />
            <Route exact path="/profile" component={UserProfileGroup} />
            <Route
                exact
                path="/create-profile"
                component={CreateProfileGroup}
            />
            <NotFound />
        </Switch>
    );
}
