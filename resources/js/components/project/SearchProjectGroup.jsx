import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logoConecta from "../images/logoConecta.png";
import logoVector from "../images/logoVector.png";

const useStyles = makeStyles({
    sudo: {
        flexGrow: 1,
    },
    root: {
        maxWidth: 345,
        margin: 20
    },
    media: {
        height: 140,
    },
    paper: {
        height: 140,
        width: 100,
    },
});

const SearchProjectGroup = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const stageName = {
        1: "Not started",
        2: "Early phase",
        3: "50%",
        4: "Finalisation phase",
        5: "Done",
        6: "n/a",
    };
    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => {
        const token = localStorage.userToken;
        axios
            .get("/api/view-all-projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response.data);
                setProjects(response.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    };
    return (
        <div className="container" style={{ marginLeft: "13rem" }}>
            <div className="col-md-10">
                <Card>
                    <div className="card-header">Coming Soon... Search for Projects</div>
                    <div className="card-body">
                        <input disabled
                            className="col-md-12"
                        ></input>
                    </div>
                    <div className="card-footer">
                        <button disabled>
                            Search
                        </button>
                    </div>
                </Card>
            </div>
            <div className={classes.sudo}>
                <Grid container spacing={3}>
                    {projects ? projects.map(project => (<Grid item xs={4} key={project.id}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={logoVector}
                                    title={project.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {project.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {project.project_description}
                                    </Typography>
                                    <br />
                                    <Typography>Location: {project.is_on_premise === 1 ? project.location : "Remote"}</Typography>
                                    <Typography>Stage of Completion: {stageName[project.stage] || stageName["6"]}</Typography>
                                    <Typography>People needed: {project.people_needed}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {/* <Button size="small" color="primary">
                                    Share
                                </Button> */}
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>)) : ""}
                </Grid>
            </div>
        </div >
    );
};

export default SearchProjectGroup;
