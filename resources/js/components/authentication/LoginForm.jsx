import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logoConecta from "../images/logoConecta.png";
import { useAppContext } from "../libs/contextLib";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://conecta.ungeneva.org/">
                Conecta
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    logo: {
        width: "100%"
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
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();

    // const [state, setState] = useState({
    //     email: "",
    //     password: "",
    //     error: {}
    // });

    // const handleChange = input => e => {
    //     setState({
    //         [input]: e.target.value
    //     });
    // };

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);

        let $request = {
            username: email.value,
            password: password.value
        };

        axios
            .post("api/login", $request)
            .then(response => {
                console.log(response);

                userHasAuthenticated(true);
                if (response) {
                    localStorage.setItem(
                        "userToken",
                        response.data.access_token
                    );

                    history.push("/skill-index"); // redirect if successful
                }
            })
            .catch(errors => {
                console.log(errors);
                onError(errors);
                setIsLoading(false);
            });
    };

    // function validateForm() {
    //     return state.email.length > 0 && state.password.length > 0;
    // }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <img
                    src={logoConecta}
                    alt="conecta logo"
                    className={classes.logo}
                />

                <Typography
                    variant="h5"
                    align="center"
                    className={classes.submit}
                ></Typography>
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
                                    onChange={handleFieldChange}
                                    defaultValue={fields.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="pword"
                                    onChange={handleFieldChange}
                                    defaultValue={fields.password}
                                />
                            </Grid>
                        </Grid>
                        <LoaderButton
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            fullWidth
                            // disabled={!validateForm()}
                            isLoading={isLoading}
                            onClick={handleSubmit}
                        >
                            Login
                        </LoaderButton>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
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
