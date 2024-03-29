import React, { useState, useEffect } from "react";
import DetailComponent from "./DetailComponent";
import SkillsSelector from "../skills/SkillsSelector";
import Grid from "@material-ui/core/Grid";
import LoaderButton from "../components/LoaderButton";
import { Container, TextField, Card, CardContent } from "@material-ui/core";
import { onError } from "../libs/errorLib";

const UserProfileGroup = () => {
    const token = localStorage.userToken;
    const [details, setDetails] = useState("");
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        axios
            .get("api/details", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setDetails(response.data.success);
            })
            .catch(errors => {
                console.log(errors);
            });
    };
    console.log('details', details);

    const state = {
        // nodes: [],
        // checked: [],
        // expanded: [],
        phone: [],
        gender: [],
        checkbox: [],
        fields: [],
        selected: [],
        selectedDesired: [],
        organization: [],
        station: [],
        language: [],
    };
    const handleSelected = x => {
        state.selected = x;
    };
    const handleSelectedDesired = x => {
        state.selectedDesired = x;
    };
    const handleSelectedOrg = x => {
        state.organization = x;
    };
    const handleSelectedCountry = x => {
        state.station = x;
    };
    const handleFields = x => {
        state.fields = x;
    };
    const handlePhone = x => {
        state.phone = x;
    };
    const handleGender = x => {
        state.gender = x;
    };
    const handleCheck = x => {
        state.checkbox = x;
    };
    const handleSelectedLanguage = x => {
        state.language = x;
    };
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {
        let $request = {
            state: state
        };
        setIsLoading(true);
        console.log($request);
        axios
            .post("api/update-user-profile", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response.data);
                setDetails(response.data);
                setIsLoading(false);
            })
            .catch(errors => {
                console.log(errors);
                onError(errors);
            });
    };

    const handleDeleteSkill = x => {
        let $request = {
            skillId: x['0'],
            skillType: x['1']
        };
        axios
            .post("api/delete-user-skill", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setDetails(response.data);
            })
            .catch(errors => {
                console.log(errors.response);
            });
    };
    return (
        !details.firstname ?
            <div>Loading...</div> :
            <Container fixed>
                <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                    spacing={2}
                    className="mt-4">

                    <DetailComponent handleFields={handleFields} handlePhone={handlePhone} handleGender={handleGender} handleCheck={handleCheck} handleSelected={handleSelected} handleSelectedDesired={handleSelectedDesired} handleSelectedOrg={handleSelectedOrg} handleSelectedCountry={handleSelectedCountry} handleDeleteSkill={handleDeleteSkill} handleSelectedLanguage={handleSelectedLanguage} details={details} />
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
                            isLoading={isLoading}
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
