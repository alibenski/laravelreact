import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
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

const ViewProjectGroup = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState(null);
    const history = useHistory();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => {
        const token = localStorage.userToken;
        axios
            .get("api/view-projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response.data["projects"]);
                setProjects(response.data["projects"]);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const handleRedirect = x => {
        history.push(`edit-project/${x}`);
    };
    return (
        <div className="container" style={{ marginLeft: "13rem" }}>
            <div className="col-md-10">
                <Typography variant="h4" align="center" color="primary" fontWeight="fontWeightBold">View My Projects</Typography>
            </div>
            <div className={classes.sudo}>
                <Grid container spacing={3}>
                    {projects === null ? "" : projects.map(
                        project => (
                            <Grid item xs={4} key={project.id}>
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
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={x => handleRedirect(project.id)}>See More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    )}
                </Grid>
            </div>
        </div >
    );
};

export default ViewProjectGroup;
