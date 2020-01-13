import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Conecta
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    appbar: {
        alignItems: "center"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    continue: {
        margin: theme.spacing(3, 0, 2)
    },
    back: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const FormPersonalDetails = ({ nextStep, handleChange, values, prevStep }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar
                title="Enter User Details"
                position="static"
                color="primary"
                className={classes.appbar}
            >
                <Toolbar>
                    <Typography variant="h5">Enter Personal Details</Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"></Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="organization"
                                    label="Organization"
                                    name="organization"
                                    autoComplete="organization"
                                    autoFocus
                                    onChange={handleChange("organization")}
                                    defaultValue={values.organization}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="city"
                                    onChange={handleChange("city")}
                                    defaultValue={values.city}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="bio"
                                    label="Bio"
                                    name="bio"
                                    autoComplete="bio"
                                    onChange={handleChange("bio")}
                                    defaultValue={values.bio}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={prevStep}
                                    className={classes.back}
                                    fullWidth
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={nextStep}
                                    className={classes.continue}
                                    fullWidth
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default FormPersonalDetails;
