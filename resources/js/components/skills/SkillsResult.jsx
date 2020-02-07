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

                    <div className={classes.root}>
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

                                            {user.childskills.map(
                                                childskill => (
                                                    <Typography
                                                        key={childskill.id}
                                                        variant="subtitle1"
                                                    >
                                                        {childskill.skillname}
                                                    </Typography>
                                                )
                                            )}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Grid>
                        </Grid>
                    </div>
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
