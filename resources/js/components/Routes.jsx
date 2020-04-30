import React from "react";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./authentication/LoginForm";
import SkillsGroup from "./skills/SkillsGroup";
import UserForm from "./form/UserForm";
import UserProfileGroup from "./profile/UserProfileGroup";
import CreateProfileGroup from "./profile/CreateProfileGroup";
import NotFound from "./pages/NotFound";
import Signup from "./authentication/SignUp";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UnauthenticatedRoute from "./authentication/UnauthenticatedRoute";

export default function Routes() {
    return (
        <Switch>
            <UnauthenticatedRoute exact path="/login" component={LoginForm} />
            <UnauthenticatedRoute exact path="/signup" component={Signup} />
            <AuthenticatedRoute exact path="/" component={Home} />
            <AuthenticatedRoute
                exact
                path="/skill-index"
                component={SkillsGroup}
            />
            {/* <AuthenticatedRoute exact path="/user-form" component={UserForm} /> */}
            <AuthenticatedRoute
                exact
                path="/profile"
                component={UserProfileGroup}
            />
            <AuthenticatedRoute
                exact
                path="/create-profile"
                component={CreateProfileGroup}
            />
            <NotFound />
        </Switch>
    );
}
