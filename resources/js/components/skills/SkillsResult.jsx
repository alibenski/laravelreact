import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));

const SkillsResult = ({ skillUserRecords, refreshPage, isLoading }) => {
    const classes = useStyles();
    let userResult = true;
    if (skillUserRecords.length == 0) {
        userResult = false;
    }

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
                            Reset
                        </Button>
                    </div>
                    {!userResult && "No result..."}
                    {userResult && (
                        <div className={classes.root}>
                            <Typography variant="h6" className={classes.paper}>Well, hello world! <br />Conecta found the following staff members you might want to contact:</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {skillUserRecords.map(user => (
                                        <Paper
                                            className={classes.paper}
                                            key={user.id}
                                        >
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
                                                    <p>Organization: {user.organizations ? user.organizations.name : "n/a"}</p>
                                                    <p>Duty Station: {user.stations ? user.stations.name : "n/a"}</p>
                                                </Typography>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Typography variant="h6">Acquired:</Typography>
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

                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Typography variant="h6">Desired:</Typography>
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

                                                    </Grid>

                                                </Grid>

                                            </Typography>
                                        </Paper>
                                    ))}
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </React.Fragment>
            ) : (
                    "Loading..."
                )}
        </div>
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
