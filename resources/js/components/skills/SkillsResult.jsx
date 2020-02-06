import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
                    {/* <h3 className="text-center mt-4">Result</h3>
                    <div className="row justify-content-center">
                        <ul>
                            {skillUserRecords.map(user => (
                                <li key={user.id} className={user.id}>
                                    {user.lastname}, {user.firstname}
                                    <ul>
                                        {user.childskills.map(childskill => (
                                            <li key={childskill.id}>
                                                {childskill.skillname}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/* <ul> */}
                                {skillUserRecords.map(user => (
                                    <Paper
                                        className={classes.paper}
                                        key={user.id}
                                    >
                                        <li key={user.id} className={user.id}>
                                            <span>
                                                <strong>
                                                    {user.lastname},{" "}
                                                    {user.firstname}
                                                </strong>
                                            </span>
                                            <ul>
                                                {user.childskills.map(
                                                    childskill => (
                                                        <li key={childskill.id}>
                                                            {
                                                                childskill.skillname
                                                            }
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </li>
                                    </Paper>
                                ))}
                                {/* </ul> */}
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
