import React, { Component, PropTypes } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import SkillsSelector from "../skills/SkillsSelector";
import TextField from "@material-ui/core/TextField";

class CreateProfileGroup extends Component {
    userGender = "female";
    firstName = "";
    familyName = "";
    email = "";
    state = {
        nodes: [],
        checked: [],
        expanded: [],
    };

    constructor(props){
        super(props);
        this.handleQuerySkill = this.handleQuerySkill.bind(this);
    }

    handleQuerySkill(properties) {

        let $request = {state:this.state,
                           userGender:this.userGender,
                           firstName:this.firstName,
                           familyName:this.familyName,
                           email:this.email}

        axios
            .post("api/user", $request)
            .then(response => {})
            .catch(errors => {
                console.log(errors);
            });
    }

    handleRadioChange(e) {
        this.gender = e.target.value;
        this.userGender = e.target.value;
    }

    render() {
        return (
            <div className="container mt-4">

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First name"
                                    name="firstName"
                                    autoFocus
                                    onChange={e => (this.firstName = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="familyName"
                                    label="Family Name"
                                    name="familyName"
                                    onChange={e => (this.familyName = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={e => (this.email = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl component="fieldset">
                                   <FormLabel component="legend">Gender</FormLabel>
                                   <RadioGroup value={this.gender} defaultValue="female"  aria-label="gender"
                                   name="customized-radios" onChange={e => this.handleRadioChange(e)} row>
                                     <FormControlLabel value="female" control={<Radio />} label="Female" />
                                     <FormControlLabel value="male" control={<Radio />} label="Male" />
                                     <FormControlLabel value="other" control={<Radio />} label="Other" />
                                   </RadioGroup>
                                 </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <SkillsSelector state={this.state} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={e => this.handleQuerySkill(this)}
                                    fullWidth>
                                    Create Profile
                                </Button>
                            </Grid>
                        </Grid>
                </div>
        );
    }
}



export default CreateProfileGroup;
