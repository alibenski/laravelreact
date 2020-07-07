import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import logoConecta from "../images/logoConecta.png";
import logoVector from "../images/logoVector.png";
import SkillsSearchUser from "../skills/SkillsSearchUser";

const useStyles = makeStyles(theme => ({
    sudo: {
        flexGrow: 1,
    },
    root: {
        maxWidth: 345,
        margin: 20
    },
    media: {
        height: 210,
    },
    paper: {
        height: 140,
        width: 100,
    },
    button: {
        margin: theme.spacing(1)
    },
    margin: {
        margin: theme.spacing(0)
    },
    rootSearch: {
        minWidth: 275
    },
    link: {
        color: '#FFF'
    },
    buttonFilter: {
        margin: theme.spacing(2),
        "&:focus": {
            background: theme.palette.secondary.main,
            color: '#FFF',
        }
    }
}));

const SearchProjectGroup = () => {
    const classes = useStyles();
    const token = localStorage.userToken;
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

    const [searchFieldIsShown, setSearchFieldIsShown] = useState(true);
    const handleQueryUser = skillName => {

        let $request = {
            skillName: skillName,
        };
        axios
            .post("/api/search-project-skill", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                console.log(response.data);
                setSearchFieldIsShown(false);
                setProjects(response.data);
                getFilters(response.data, skillName);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const [searchResultIsShown, setSearchResultIsShown] = useState(false);
    const triggerDisplayState = () => {
        setSearchResultIsShown(true);
    };

    const keyPress = (e) => {
        const skillName = e.target.value;
        if (skillName.length > 2) {
            if (e.keyCode === 13) {
                handleQueryUser(skillName);
                triggerDisplayState();
            }
        }
        return;
    };

    const refreshPage = () => {
        setSearchFieldIsShown(true);
        setSearchResultIsShown(false);
        loadProjects();
    };

    const [hover, setHover] = useState(false);
    const hoverOn = () => {
        setHover(true);
    };
    const linkStyle = hover ? { textDecoration: 'none', color: "#fff" } : {};

    const [filters, setFilters] = useState([]);
    const [skill, setSkill] = useState();
    const getFilters = (data, skillName) => {
        let arrayFilter = [];
        data.forEach(element => {
            arrayFilter.push(element["location"]);
        });
        let uniqueFilter = [...new Set(arrayFilter)];
        setFilters(uniqueFilter);
        setSkill(skillName);
    };

    const filterResults = e => {
        let $request = {
            skillName: e.currentTarget.dataset.skill,
            location: e.currentTarget.value,
        };
        axios
            .post("/api/filter-project-skill", $request, {
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
    const handleResetFilter = e => {
        handleQueryUser(e.currentTarget.dataset.skill);
    };
    const history = useHistory();
    const handleRedirect = x => {
        history.push(`show-project/${x}`);
    };

    return (
        <div className="container" style={{ marginLeft: "13rem" }}>
            {searchFieldIsShown &&
                <div className="col-md-12 mb-4">
                    <SkillsSearchUser
                        handleQueryUser={handleQueryUser}
                        triggerDisplayState={triggerDisplayState}
                        keyPress={keyPress}
                    />
                </div>
            }
            {searchResultIsShown &&
                <div className="col-md-12 mb-4">
                    <div className="row justify-content-center">
                        <Typography variant="h6">Conecta recommends the following project(s):</Typography>
                        {projects.length > 0 ? "" : <Typography variant="h6">Sorry No Results</Typography>}
                    </div>

                    <div className="row justify-content-center m-2">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={refreshPage}
                        >
                            Reset Results
                        </Button>
                    </div>

                    <div className="row justify-content-center m-4">
                        <Button className={classes.buttonFilter} color="secondary" variant="outlined" onClick={handleResetFilter} data-skill={skill}>Reset Filter</Button>
                        {filters ? filters.map((filter, index) => (
                            <Button
                                key={index}
                                variant="outlined"
                                color="primary"
                                className={classes.buttonFilter}
                                data-skill={skill}
                                onClick={e => filterResults(e)}
                                value={filter}
                            >
                                {filter === '0' ? "Remote" : filter}
                            </Button>)) : ""}
                    </div>
                </div>
            }
            <div className={classes.sudo}>
                <Grid container spacing={3}>
                    {projects ? projects.map(project => (<Grid item xs={4} key={project.id}>
                        <Card className={classes.root} raised>
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
                                        {project.project_description.slice(0, 256)}...
                                    </Typography>
                                    <br />
                                    <Typography>Location: {project.is_on_premise === 1 ? project.location : "Remote"}</Typography>
                                    <Typography>Stage of Completion: {stageName[project.stage] || stageName["6"]}</Typography>
                                    <Typography>People needed: {project.people_needed}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="contained"
                                    color="primary"
                                    className="m-2"
                                >
                                    <a href={"mailto:" + project.contact} style={linkStyle} className={classes.link} onMouseEnter={hoverOn} >
                                        Connect
                                                        </a>
                                </Button>
                                <Button size="small" color="primary" onClick={x => handleRedirect(project.id)}>
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
