import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, CardHeader, Checkbox } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AvatarComponent from "./AvatarComponent";
import UserSkillsComponent from "./UserSkillsComponent";
import SkillMultiSelectSearch from "../skills/SkillMultiSelectSearch";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const useStyles = makeStyles(theme => ({
    root: {
        // display: "flex",
        "& > *": {
            margin: theme.spacing(3)
        },
        minWidth: 400
    },
    rootSelect: {
        "& > *": {
            margin: theme.spacing(3)
        },
        minWidth: 400,
        minHeight: 500
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    fields: {
        margin: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(3)
    }
}));

const DetailComponent = () => {
    const classes = useStyles();
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

    return (
        <React.Fragment>
            <Grid item xs={12} className="row justify-content-center">
                <Card className={classes.root}>
                    <CardContent>
                        <AvatarComponent />
                        <br />
                        <Typography>
                            ID # {details.id} {details.name}
                        </Typography>
                        <form
                            // className={classes.root}
                            noValidate
                            autoComplete="off"
                        >
                            <FormGroup>
                                <TextField
                                    id="standard-basic"
                                    label="First Name"
                                    placeholder={details.firstname}
                                    className={classes.fields}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    id="filled-basic"
                                    label="Last Name"
                                    placeholder={details.lastname}
                                    className={classes.fields}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    placeholder={details.email}
                                    className={classes.fields}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        defaultValue=""
                                        aria-label="gender"
                                        // onChange={handleRadioChange}
                                        row
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <PhoneInput
                                    className={classes.fields}
                                    country={"ch"}
                                    inputProps={{
                                        name: "Phone",
                                        required: true
                                    }}
                                // onChange={handleOnChange}
                                />
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue=""
                                    className={classes.fields}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </FormGroup>
                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    Assign Role
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            // checked={gilad}
                                            // onChange={handleChange}
                                            // name="gilad"
                                            />
                                        }
                                        label="Do you wish to shadow?"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            // checked={jason}
                                            // onChange={handleChange}
                                            // name="jason"
                                            />
                                        }
                                        label="Do you wish to mentor? "
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            // checked={antoine}
                                            // onChange={handleChange}
                                            // name="antoine"
                                            />
                                        }
                                        label="Do you wish to host a shadow?"
                                    />
                                </FormGroup>
                            </FormControl>
                        </form>
                        <br />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} className="row justify-content-center">
                <Card className={classes.root}>
                    <CardHeader
                        title="Acquired Skills"
                        subheader="Skills you’re good at"
                    />
                    <CardContent>
                        <UserSkillsComponent />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} className="row justify-content-center">
                <Card className={classes.rootSelect}>
                    <SkillMultiSelectSearch />
                    <Typography>Instructions here if needed</Typography>
                </Card>
            </Grid>
            {/* <Grid item xs={12} className="row justify-content-center">
                <Card className={classes.root}>
                    <CardHeader
                        title="Searching for Skills"
                        subheader="Skills you wish to develop"
                    />
                    <CardContent>
                        <FormGroup>
                            <TextField
                                id="search-field"
                                label="Skills to Develop"
                                placeholder="video editing"
                                className={classes.fields}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
            </Grid> */}
        </React.Fragment>
    );
};

export default DetailComponent;
