import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, blueGrey } from '@material-ui/core/colors';
import { Avatar } from "@material-ui/core";
import FilterButtons from "../components/FilterButtons";
import ConnectNotificationButton from "../components/ConnectNotificationButton";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    role: {
        alignItems: 'center'
    },
    link: {
        color: '#FFF'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 'auto'
    },
}));

const SkillsResult = ({ skillUserRecords, refreshPage, isLoading, handleResetFilter, skill, filters, filterResults }) => {
    const classes = useStyles();
    let userResult = true;
    const [hover, setHover] = useState(false);
    const hoverOn = () => {
        setHover(true);
    };

    if (skillUserRecords.length == 0) {
        userResult = false;
    }
    const linkStyle = hover ? { textDecoration: 'none', color: "#fff" } : {};
    return (
        <div className="container mt-4">
            {!isLoading ? (
                <React.Fragment>
                    <div className="row justify-content-center">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={e => {
                                refreshPage();
                            }}
                        >
                            Reset Search Result
                        </Button>
                    </div>
                    {!userResult && "No result..."}
                    {userResult && (
                        <div className={classes.root}>
                            <FilterButtons handleResetFilter={handleResetFilter} skill={skill} filters={filters} filterResults={e => filterResults(e)} />
                            <Typography variant="h6" className={classes.paper}>Conecta recommends the following profile(s):</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {skillUserRecords.map(user => (
                                        <Paper
                                            className={classes.paper}
                                            key={user.id}
                                        >
                                            <Avatar src={"/storage/" + user.photo} className={classes.large} />
                                            <Typography
                                                key={user.id}
                                                className={classes.paper}
                                                component={"span"}
                                                variant="h5"
                                            >
                                                <span>
                                                    <strong>
                                                        {user.lastname},{" "}
                                                        {user.firstname}
                                                    </strong>
                                                </span>
                                                <Typography variant="h6">
                                                    <p>Email: {user.email} </p>
                                                    {/* <ConnectNotificationButton email={user.email} /> */}
                                                    <Button variant="contained"
                                                        color="primary"
                                                        className="m-2"
                                                    >
                                                        <a href={"mailto:" + user.email} style={linkStyle} className={classes.link} onMouseEnter={hoverOn} >
                                                            Connect
                                                        </a>
                                                    </Button>
                                                    <p>Organization: {user.organizations ? user.organizations.name : "n/a"}</p>
                                                    <p>Duty Station: {user.stations ? user.stations.name : "n/a"}</p>
                                                    <p>Working Language(s):<br />
                                                        {user.languages.length > 0 ? user.languages.map(language => (
                                                            <span key={language.id} className={classes.role}>
                                                                <CheckCircleIcon style={{ color: blueGrey[500] }} /> {language.name}
                                                            </span>
                                                        )) : "none selected"
                                                        }
                                                    </p>
                                                    <p>I want to: {user.shadow ? <span className={classes.role}>
                                                        <CheckCircleIcon style={{ color: green[500] }} /> shadow </span> : ""}
                                                        {user.mentor ? <span className={classes.role}><CheckCircleIcon style={{ color: green[500] }} /> be a mentor </span> : ""}
                                                        {user.mentee ? <span className={classes.role}><CheckCircleIcon style={{ color: green[500] }} /> be a mentee </span> : ""}
                                                        {user.host ? <span className={classes.role}><CheckCircleIcon style={{ color: green[500] }} /> host a shadow </span> : ""}
                                                    </p>
                                                    <hr />
                                                </Typography>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Typography variant="h6">My Strong Skills:</Typography>
                                                        {user.childskills.map(
                                                            childskill => (
                                                                <Typography
                                                                    key={childskill.id}
                                                                    variant="subtitle1"
                                                                >
                                                                    {
                                                                        childskill.skillname
                                                                    }
                                                                </Typography>
                                                            )
                                                        )}
                                                        {user.tagskills.map(
                                                            tagskill => (
                                                                <Typography
                                                                    key={tagskill.id}
                                                                    variant="subtitle1"
                                                                >
                                                                    {
                                                                        tagskill.skillname
                                                                    }
                                                                </Typography>
                                                            )
                                                        )}
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Typography variant="h6">I Want to Develop:</Typography>
                                                        {user.desiredskills.map(
                                                            desiredskill => (
                                                                <Typography
                                                                    key={desiredskill.id}
                                                                    variant="subtitle1"
                                                                >
                                                                    {
                                                                        desiredskill.skillname
                                                                    }
                                                                </Typography>
                                                            )
                                                        )}
                                                        {user.desiredtagskills.map(
                                                            desiredtagskill => (
                                                                <Typography
                                                                    key={desiredtagskill.id}
                                                                    variant="subtitle1"
                                                                >
                                                                    {
                                                                        desiredtagskill.skillname
                                                                    }
                                                                </Typography>
                                                            )
                                                        )}

                                                    </Grid>

                                                </Grid>

                                            </Typography>
                                        </Paper>
                                    ))}
                                </Grid>
                            </Grid>
                        </div>
                    )
                    }
                </React.Fragment >
            ) : (
                "Loading..."
            )}
        </div >
    );
};

SkillsResult.displayName = "SkillsResult";

SkillsResult.propTypes = {
    skillRecords: PropTypes.array.isRequired,
    skillRecords: PropTypes.arrayOf(PropTypes.object),
    skillRecords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            skillname: PropTypes.string
        })
    )
};

export default SkillsResult;
