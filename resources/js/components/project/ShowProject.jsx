import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { Paper } from "@material-ui/core";
import UserSkillsComponent from "../profile/UserSkillsComponent";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    link: {
        color: '#FFF'
    },
}));

function ShowProject() {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const hoverOn = () => {
        setHover(true);
    };
    const linkStyle = hover ? { textDecoration: 'none', color: "#fff" } : {};

    const token = localStorage.userToken;
    let { id } = useParams();
    const [projectDetails, setProjectDetails] = useState([]);
    const [stage, setStage] = useState("");
    const [isOnPremise, setIsOnPremise] = useState(false);

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = () => {
        axios
            .get(`/api/show-project/${id}`, {
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

    const handleRadioChange = e => {
        console.log(e.target.value);
        setStage(e.target.value);
    };

    const handleDeleteSkill = x => {
        alert("Unauthorized action.");
    };
    return (
        <div className="container" style={{ marginLeft: "13rem" }}>
            <div className="col-md-10 m-4">
                <Typography variant="h4" align="center" color="primary" fontWeight="fontWeightBold">{projectDetails.title}</Typography>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Project Title</FormLabel>
                    <Typography paragraph={true}>{projectDetails.title}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Project Owner</FormLabel>
                    <Typography paragraph={true}>{projectDetails.project_owner}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormLabel component="legend">Project Description</FormLabel>
                    <Typography paragraph={true}>{projectDetails.project_description}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Who is already working on this?</FormLabel>
                    <Typography paragraph={true}>{projectDetails.current_team}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">How far along are you?</FormLabel>
                    <Typography paragraph={true}>{projectDetails.tasks_done}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormLabel component="legend">What tasks need to be done?</FormLabel>
                    <Typography paragraph={true}>{projectDetails.remaining_tasks}</Typography>
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
                            <FormControlLabel value="1" control={<Radio disabled />} label="Not started yet" />
                            <FormControlLabel value="2" control={<Radio disabled />} label="Early phase" />
                            <FormControlLabel value="3" control={<Radio disabled />} label="50% through" />
                            <FormControlLabel value="4" control={<Radio disabled />} label="Finalisation phase" />
                            <FormControlLabel value="5" control={<Radio disabled />} label="Done" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className="">
                        <Typography variant="h6" align="left" color="secondary" fontWeight="fontWeightBold">This project is looking for people with the following skills:</Typography>
                        {projectDetails.childskills ?
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <UserSkillsComponent handleDeleteSkill={handleDeleteSkill} details={projectDetails} /> </Grid> : ""
                        }
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Number of people needed for this project</FormLabel>
                    <Typography paragraph={true}>{projectDetails.people_needed} people needed</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Location</FormLabel>
                    <Typography paragraph={true}>{isOnPremise === false ? projectDetails.location : "Remote"}</Typography>
                </Grid>
                <Button variant="contained"
                    color="primary"
                    className="m-2"
                >
                    <a href={"mailto:" + projectDetails.contact} style={linkStyle} className={classes.link} onMouseEnter={hoverOn} >
                        Connect
                    </a>
                </Button>
            </Grid>
        </div>
    );
}

export default ShowProject;