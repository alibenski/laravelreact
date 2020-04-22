import React, { useState } from "react";
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
import { Redirect } from "react-router";

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
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const LoginForm = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        email: "",
        password: "",
        error: {}
    });

    const handleChange = input => e => {
        setState({
            [input]: e.target.value
        });
    };

    const handleSubmit = properties => {
        let $request = {
            email: email.value,
            password: password.value
        };

        axios
            .post("api/login", $request)
            .then(response => {
                console.log(response);
                if (response) {
                    localStorage.setItem(
                        "userToken",
                        response.data.success.token
                    );
                    console.log(localStorage);
                    return <Redirect to="/skill-index" />;
                }
            })
            .catch(errors => {
                console.log(errors);
                alert("Invalid Credentials");
            });
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography
                    variant="h5"
                    align="center"
                    className={classes.submit}
                >
                    Conecta Login Page
                </Typography>
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
                                    id="email"
                                    label="User Name"
                                    name="email"
                                    autoComplete="uname"
                                    autoFocus
                                    onChange={handleChange("email")}
                                    defaultValue={state.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    label="password"
                                    name="password"
                                    autoComplete="pword"
                                    onChange={handleChange("password")}
                                    defaultValue={state.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={handleSubmit}
                            className={classes.submit}
                            fullWidth
                        >
                            Submit
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    No account yet? Register now
                                </Link>
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

export default LoginForm;
