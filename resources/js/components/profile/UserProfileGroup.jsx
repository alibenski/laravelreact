import React, { useEffect } from "react";
import DetailComponent from "./DetailComponent";
import SkillsSelector from "../skills/SkillsSelector";
import Grid from "@material-ui/core/Grid";
import LoaderButton from "../components/LoaderButton";
import { Container } from "@material-ui/core";

const UserProfileGroup = () => {
    const state = {
        // nodes: [],
        // checked: [],
        // expanded: [],
        phone: [],
        gender: [],
        checkbox: [],
        fields: [],
        selected: []
    };
    const handleSelected = x => {
        state.selected = x
    };
    const handleFields = x => {
        state.fields = x
    };
    const handlePhone = x => {
        state.phone = x;
    };
    const handleGender = x => {
        state.gender = x
    };
    const handleCheck = x => {
        state.checkbox = x
    }
    const handleSubmit = () => {
        const token = localStorage.userToken;

        let $request = {
            state: state
        };
        console.log($request)
        axios
            .post("api/update-user-profile", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(errors => {
                console.log(errors);
                alert(errors);
            });
    };

    return (
        <Container fixed>
            <Grid container
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                spacing={2}
                className="mt-4">

                <DetailComponent handleFields={handleFields} handlePhone={handlePhone} handleGender={handleGender} handleCheck={handleCheck} handleSelected={handleSelected} />
                <br />
                <Grid item xs={8}>
                    {/* <SkillsSelector state={state} /> */}
                    <br />
                    <LoaderButton
                        variant="contained"
                        color="default"
                        // className={classes.submit}
                        fullWidth
                        // disabled={!validateForm()}
                        // isLoading={isLoading}
                        onClick={handleSubmit}
                    >
                        Update Profile
                    </LoaderButton>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfileGroup;
