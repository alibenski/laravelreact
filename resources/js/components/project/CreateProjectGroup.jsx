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
import SkillMultiSelectSearch from "../skills/SkillMultiSelectSearch";

class CreateProjectGroup extends Component {
    advancementValue = "1";
    projectTitle = "";
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
    selected = [];

    constructor(props) {
        super(props);
        this.handleQuerySkill = this.handleQuerySkill.bind(this);
    }

    handleSelected = x => {
        this.selected = x;
    };

    handleQuerySkill(properties) {
        const token = localStorage.userToken;

        let $request = {
            state: this.state,
            projectTitle: this.projectTitle,
            projectOwner: this.projectOwner,
            projectDescription: this.projectDescription,
            currentTeam: this.currentTeam,
            tasksNeeded: this.tasksNeeded,
            tasksDone: this.tasksDone,
            peopleNeeded: this.peopleNeeded,
            contact: this.contact,
            isOnPremiseValue: this.isOnPremiseValue,
            location: this.location,
            stage: this.advancementValue,
            selected: this.selected,
        };

        console.log($request);

        axios
            .post("api/project", $request,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                })
            .then(response => {
                console.log(response);
            })
            .catch(errors => {
                console.log(errors.response.data);
                alert(errors.response.data.message);
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
            <div className="container mt-4" style={{ marginLeft: "13rem" }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="projectTitle"
                            label="Project Title"
                            name="projectTitle"
                            autoFocus
                            onChange={e => (this.projectTitle = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="projectOwner"
                            label="Project owner"
                            name="projectOwner"
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
                            label="Who is already working on this?"
                            placeholder="Tell volunteers about you and your teammates"
                            name="currentTeam"
                            onChange={e => (this.currentTeam = e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            multiline
                            id="tasksDone"
                            label="How far along are you?"
                            placeholder="Tell volunteers about the progress you’ve made"
                            name="tasksDone"
                            onChange={e => (this.tasksDone = e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            multiline
                            id="tasksNeeded"
                            label="What tasks need to be done?"
                            placeholder="Tell volunteers how they might help you. Be specific."
                            name="tasksNeeded"
                            onChange={e => (this.tasksNeeded = e.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Current stage of the project</FormLabel>
                            <RadioGroup value={this.advancement} defaultValue="1" aria-label="advancement"
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
                        <FormLabel component="legend">Skills needed for this project</FormLabel>
                        {/* <SkillsSelector state={this.state} /> */}
                        <SkillMultiSelectSearch handleSelected={this.handleSelected} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="number"
                            id="peopleNeeded"
                            label="Number of people needed for this project"
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
                            label="Contact email address"
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
                            Create and post my project
                                </Button>
                    </Grid>
                </Grid>

            </div>
        );
    }
}



export default CreateProjectGroup;
