import React, { useEffect } from "react";
import DetailComponent from "./DetailComponent";
import SkillsSelector from "../skills/SkillsSelector";
import Grid from "@material-ui/core/Grid";

const UserProfileGroup = () => {
    const state = {
        nodes: [],
        checked: [],
        expanded: []
    };
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <DetailComponent />
            </div>

            <div className="row justify-content-center">
                <Grid item xs={8}>
                    <SkillsSelector state={state} />
                </Grid>
            </div>
        </div>
    );
};

export default UserProfileGroup;
