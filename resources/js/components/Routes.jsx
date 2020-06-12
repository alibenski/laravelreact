import React from "react";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./authentication/LoginForm";
import SkillsGroup from "./skills/SkillsGroup";
import UserForm from "./form/UserForm";
import UserProfileGroup from "./profile/UserProfileGroup";
import CreateProfileGroup from "./profile/CreateProfileGroup";
import CreateProjectGroup from "./project/CreateProjectGroup";
import SearchProjectGroup from "./project/SearchProjectGroup";
import ViewProjectGroup from "./project/ViewProjectGroup";
import NotFound from "./pages/NotFound";
import Signup from "./authentication/SignUp";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UnauthenticatedRoute from "./authentication/UnauthenticatedRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPasswordForm from "./authentication/ResetPasswordForm";
import EditProject from "./project/EditProject";

export default function Routes() {
    return (
        <Switch>
            <UnauthenticatedRoute exact path="/login" component={LoginForm} />
            <UnauthenticatedRoute exact path="/signup" component={Signup} />
            <UnauthenticatedRoute exact path="/forgot-password" component={ForgotPassword} />
            <UnauthenticatedRoute exact path="/reset-password-form" component={ResetPasswordForm} />
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
            <AuthenticatedRoute
                exact
                path="/create-project"
                component={CreateProjectGroup}
            />
            <AuthenticatedRoute
                exact
                path="/search-projects"
                component={SearchProjectGroup}
            />
            <AuthenticatedRoute
                exact
                path="/view-projects"
                component={ViewProjectGroup}
            />
            <AuthenticatedRoute
                exact
                path="/edit-project/:id"
                component={EditProject}
            />
            <NotFound />
        </Switch>
    );
}
