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
import SkillDesiredSearch from "../skills/SkillDesiredSearch";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useFormFields } from "../libs/hooksLib";
import SelectOrganization from "../components/SelectOrganization";
import SelectCountries from "../components/SelectCountries";

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

const DetailComponent = ({ handleFields, handlePhone, handleGender, handleCheck, handleSelected, handleSelectedDesired, handleSelectedOrg, handleSelectedCountry, handleDeleteSkill, details }) => {
    const classes = useStyles();
    const [fields, handleFieldChange] = useFormFields({
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        bio: "",
    });
    const [gender, setGender] = useState(details.gender);
    const [phone, setPhone] = useState(details.phone);
    const [checkbox, setCheckBox] = useState({
        shadow: details.shadow,
        mentor: details.mentor,
        mentee: details.mentee,
        host: details.host,
        volunteer: details.volunteer
    });
    const handleRadioChange = e => {
        setGender(e.target.value);
    };
    const handlePhoneChange = value => {
        setPhone(value);
    };
    const handleCheckBox = event => {
        setCheckBox({ ...checkbox, [event.target.name]: event.target.checked });
    };

    handleGender(gender);
    handlePhone(phone);
    handleCheck(checkbox);
    handleFields(fields);

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
                                    id="firstname"
                                    label="First Name"
                                    placeholder={details.firstname}
                                    className={classes.fields}
                                    onChange={handleFieldChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    id="lastname"
                                    label="Last Name"
                                    placeholder={details.lastname}
                                    className={classes.fields}
                                    onChange={handleFieldChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    placeholder={details.email}
                                    className={classes.fields}
                                    onChange={handleFieldChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend"></FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        defaultValue={gender}
                                        aria-label="gender"
                                        onChange={handleRadioChange}
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
                                        name: "phone",
                                        required: true
                                    }}
                                    value={phone || ""}
                                    onChange={handlePhoneChange}
                                />
                                <TextField
                                    id="dob"
                                    label="Birthday"
                                    type="date"
                                    defaultValue={details.dob}
                                    className={classes.fields}
                                    onChange={handleFieldChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </FormGroup>

                            <SelectCountries handleSelectedCountry={handleSelectedCountry} details={details} />
                            <SelectOrganization handleSelectedOrg={handleSelectedOrg} details={details} />

                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    Do you wish to...
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkbox.shadow == 1 ? true : false}
                                                onChange={handleCheckBox}
                                                name="shadow"
                                            />
                                        }
                                        label="shadow"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkbox.mentor == 1 ? true : false}
                                                onChange={handleCheckBox}
                                                name="mentor"
                                            />
                                        }
                                        label="mentor "
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkbox.mentee == 1 ? true : false}
                                                onChange={handleCheckBox}
                                                name="mentee"
                                            />
                                        }
                                        label="mentee "
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkbox.host == 1 ? true : false}
                                                onChange={handleCheckBox}
                                                name="host"
                                            />
                                        }
                                        label="host a shadow"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkbox.volunteer == 1 ? true : false}
                                                onChange={handleCheckBox}
                                                name="volunteer"
                                            />
                                        }
                                        label="volunteer for a project"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormGroup>
                                <TextField
                                    id="bio"
                                    label="Short Bio"
                                    placeholder="Describe yourself a little bit more..."
                                    multiline
                                    rowsMax={10}
                                    defaultValue={details.bio}
                                    // onChange={handleChange}
                                    className={classes.fields}
                                    onChange={handleFieldChange}
                                    variant="filled">
                                </TextField>
                            </FormGroup>
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
                        <UserSkillsComponent handleDeleteSkill={handleDeleteSkill} details={details} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} className="row justify-content-center">
                <Card className={classes.rootSelect}>
                    <CardHeader
                        title="Add Acquired Skills"
                        subheader=""
                    >
                    </CardHeader>
                    <SkillMultiSelectSearch handleSelected={handleSelected} />
                </Card>
            </Grid>
            <Grid item xs={12} className="row justify-content-center">
                <Card className={classes.rootSelect}>
                    <CardHeader
                        title="Add Skills to Develop"
                        subheader="">
                    </CardHeader>
                    <SkillDesiredSearch handleSelectedDesired={handleSelectedDesired} handleDeleteSkill={handleDeleteSkill} details={details} />
                </Card>
            </Grid>
        </React.Fragment>
    );
};

export default DetailComponent;
