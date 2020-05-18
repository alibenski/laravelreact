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
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

class CreateProjectGroup extends Component {
    advancementValue = "1";
    projectOwner = "";
    projectDescription = "";
    currentTeam = "";
    tasksNeeded = "";
    peopleNeeded = 0;
    contact = "";
    isOnPremiseValue = false;
    isOnPremise = false;
    location = false;
    state = {
        nodes: [],
        checked: [],
        expanded: [],
        disabled: true,
    };

    constructor(props){
        super(props);
        this.handleQuerySkill = this.handleQuerySkill.bind(this);
    }

    handleQuerySkill(properties) {

        let $request = {state:this.state,
                           projectOwner:this.projectOwner,
                           projectDescription:this.projectDescription,
                           currentTeam:this.currentTeam,
                           tasksNeeded:this.tasksNeeded,
                           peopleNeeded:this.peopleNeeded,
                           contact:this.contact,
                           isOnPremiseValue:this.isOnPremiseValue,
                           location:this.location,
                           stage:this.advancementValue}

        console.log($request);

        axios
            .post("api/project", $request)
            .then(response => {})
            .catch(errors => {
                console.log(errors);
            });
    }

    handleRadioChange(e) {

        this.advancement = e.target.value;
        this.advancementValue = e.target.value;
    }

    handleSwitchChange(e) {

        this.isOnPremise = e.target.checked;
        this.isOnPremiseValue = e.target.checked;
         this.setState({ disabled: !e.target.checked });
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
                                    id="projectOwner"
                                    label="Project owner"
                                    name="projectOwner"
                                    autoFocus
                                    onChange={e => (this.projectOwner = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="projectDescription"
                                    label="Project description"
                                    name="projectDescription"
                                    onChange={e => (this.projectDescription = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="currentTeam"
                                    label="Current team"
                                    name="currentTeam"
                                    onChange={e => (this.currentTeam = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="tasksNeeded"
                                    label="Remaining tasks to completion"
                                    name="tasksNeeded"
                                    onChange={e => (this.tasksNeeded = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl component="fieldset">
                                   <FormLabel component="legend">Current stage of the project</FormLabel>
                                   <RadioGroup value={this.advancement} defaultValue="1"  aria-label="advancement"
                                   name="customized-radios" onChange={e => this.handleRadioChange(e)} row>
                                     <FormControlLabel value="1" control={<Radio />} label="Not started yet" />
                                     <FormControlLabel value="2" control={<Radio />} label="Early phase" />
                                     <FormControlLabel value="3" control={<Radio />} label="50% through" />
                                     <FormControlLabel value="4" control={<Radio />} label="Finalisation phase" />
                                     <FormControlLabel value="5" control={<Radio />} label="Done" />
                                   </RadioGroup>
                                 </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <SkillsSelector state={this.state} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="number"
                                    id="peopleNeeded"
                                    label="People needed for this project"
                                    name="peopleNeeded"
                                    onChange={e => (this.peopleNeeded = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                  <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                      <Grid item>Location: Remote</Grid>
                                      <Grid item>
                                        <Switch checked={this.isOnPremise} onChange={e =>
                                        this.handleSwitchChange(e)}
                                        name="isOnPremise" />
                                      </Grid>
                                      <Grid item>On premises</Grid>
                                    </Grid>
                                  </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    name="location"
                                    disabled={this.state.disabled}
                                    onChange={e => (this.location = e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    id="contact"
                                    label="Contact"
                                    name="contact"
                                    onChange={e => (this.contact = e.target.value)}
                                />
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



export default CreateProjectGroup;
