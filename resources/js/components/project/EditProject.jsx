import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import SkillMultiSelectNoCreate from "../skills/SkillMultiSelectNoCreate";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import { Paper } from "@material-ui/core";
import UserSkillsComponent from "../profile/UserSkillsComponent";

function EditProject() {
    const token = localStorage.userToken;
    let { id } = useParams();
    const [projectDetails, setProjectDetails] = useState([]);
    const [fields, handleFieldChange] = useFormFields("");
    const [stage, setStage] = useState("");
    const [pplNeeded, setPplNeeded] = useState("");
    const [selected, setSelected] = useState([]);
    const [isOnPremise, setIsOnPremise] = useState(false);
    const [locationPremise, setlocationPremise] = useState("");

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = () => {
        axios
            .get(`/api/edit-project/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response.data);
                setProjectDetails(response.data);
                setStage(String(response.data.stage));
                setPplNeeded(response.data.people_needed);
                setlocationPremise(response.data.location);
                if (response.data.is_on_premise === 1) {
                    setIsOnPremise(true);
                } else {
                    setIsOnPremise(false);
                }
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const handleSelected = x => {
        setSelected(x);
    };

    const handleSwitchChange = () => {
        setIsOnPremise(!isOnPremise);
        if (!isOnPremise === false) {
            setlocationPremise("");
        }
    };

    const handleTextLocation = e => {
        setlocationPremise(e.target.value);
    };

    const handleRadioChange = e => {
        console.log(e.target.value);
        setStage(e.target.value);
    };

    const handlePplChange = e => {
        setPplNeeded(e.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {
        setIsLoading(true);

        let $request = {
            id: id,
            title: projectTitle.value,
            project_owner: projectOwner.value,
            project_description: projectDescription.value,
            current_team: currentTeam.value,
            remaining_tasks: tasksNeeded.value,
            tasks_done: tasksDone.value,
            stage: stage,
            people_needed: peopleNeeded.value,
            is_on_premise: isOnPremise,
            location: locationPremise,
            contact: contact.value,
            selected: selected,

        };
        console.log($request);

        axios
            .post("/api/update-project", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response);
                setIsLoading(false);
                alert('Project Updated!');
                setProjectDetails(response.data);
                setStage(String(response.data.stage));
                setPplNeeded(response.data.people_needed);
                setlocationPremise(response.data.location);
                if (response.data.is_on_premise === 1) {
                    setIsOnPremise(true);
                } else {
                    setIsOnPremise(false);
                }

            })
            .catch(errors => {
                alert(errors.response.data.message);
                setIsLoading(false);
            });
    };

    const handleDeleteSkill = x => {
        let $request = {
            id: id,
            skillId: x['0'],
            skillType: x['1']
        };
        axios
            .post("/api/delete-project-skill", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setProjectDetails(response.data);
            })
            .catch(errors => {
                console.log(errors.response);
            });
    };
    return (
        <div className="container" style={{ marginLeft: "13rem" }}>
            <div className="col-md-10 m-4">
                <Typography variant="h4" align="center" color="primary" fontWeight="fontWeightBold">View/Edit Project</Typography>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        multiline
                        id="projectTitle"
                        label="Project Title"
                        name="projectTitle"
                        autoFocus
                        onChange={handleFieldChange}
                        placeholder={projectDetails.title}
                        defaultValue={projectDetails.title}
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
                        id="projectOwner"
                        label="Project owner"
                        name="projectOwner"
                        onChange={handleFieldChange}
                        placeholder={projectDetails.project_owner}
                        defaultValue={projectDetails.project_owner}
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
                        id="projectDescription"
                        label="Project description"
                        name="projectDescription"
                        onChange={handleFieldChange}
                        placeholder={projectDetails.project_description}
                        defaultValue={projectDetails.project_description}
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
                        id="currentTeam"
                        label="Who is already working on this?"
                        name="currentTeam"
                        onChange={handleFieldChange}
                        placeholder={projectDetails.current_team}
                        defaultValue={projectDetails.current_team}
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
                        name="tasksDone"
                        onChange={handleFieldChange}
                        placeholder={projectDetails.tasks_done}
                        defaultValue={projectDetails.tasks_done}
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
                        name="tasksNeeded"
                        onChange={handleFieldChange}
                        placeholder={projectDetails.remaining_tasks}
                        defaultValue={projectDetails.remaining_tasks}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Current stage of the project</FormLabel>
                        <RadioGroup
                            value={stage}
                            aria-label="advancement"
                            name="customized-radios"
                            onChange={e => handleRadioChange(e)}
                            row>
                            <FormControlLabel value="1" control={<Radio />} label="Not started yet" />
                            <FormControlLabel value="2" control={<Radio />} label="Early phase" />
                            <FormControlLabel value="3" control={<Radio />} label="50% through" />
                            <FormControlLabel value="4" control={<Radio />} label="Finalisation phase" />
                            <FormControlLabel value="5" control={<Radio />} label="Done" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <FormLabel component="legend">Add skills needed for this project</FormLabel>
                    <SkillMultiSelectNoCreate handleSelected={handleSelected} />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Paper >
                        <Typography variant="h6" align="center" color="secondary" fontWeight="fontWeightBold">Existing Associated Skills</Typography>
                        {projectDetails.childskills ? <UserSkillsComponent handleDeleteSkill={handleDeleteSkill} details={projectDetails} /> : ""
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Number of people needed for this project</FormLabel>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        type="number"
                        id="peopleNeeded"
                        name="peopleNeeded"
                        onChange={e => handlePplChange(e)}
                        value={pplNeeded}
                        placeholder={String(projectDetails.people_needed)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Location: Remote</Grid>
                            <Grid item>
                                <Switch checked={isOnPremise} onChange={handleSwitchChange}
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
                        id="locationPremise"
                        name="locationPremise"
                        disabled={!isOnPremise}
                        onChange={e => handleTextLocation(e)}
                        placeholder={locationPremise}
                        value={locationPremise}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        multiline
                        id="contact"
                        label="Contact Email"
                        name="contact"
                        onChange={handleFieldChange}
                        placeholder={projectDetails.contact}
                        defaultValue={projectDetails.contact}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LoaderButton
                        variant="contained"
                        color="default"
                        // className={classes.submit}
                        fullWidth
                        // disabled={!validateForm()}
                        isLoading={isLoading}
                        onClick={handleSubmit}>
                        Update Project
                    </LoaderButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default EditProject;