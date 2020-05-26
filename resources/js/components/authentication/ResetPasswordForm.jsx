import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logoConecta from "../images/logoConecta.png";
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

const ResetPasswordForm = () => {
    const classes = useStyles();
    const [fields, handleFieldChange] = useFormFields({
        email: ""
    });
    const history = useHistory();
    let qryToken = history.location.search;
    let qryParam = "?token=";
    let token = qryToken.split(qryParam).pop();

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Reset Password");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let $request = {
            token: token,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value
        };

        axios
            .post("api/password/reset",
                $request,
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            )
            .then(response => {
                if (response) {
                    console.log("success: ", response.data)
                    setIsDisabled(true)
                    setIsLoading(false);
                    setButtonText("Redirecting...")
                    alert(response.data["message"] + " You will now be rediredted to the login page.")
                    history.push("/login");
                }
            }
            )
            .catch(errors => {
                console.log(errors.response.data.error);
                if (errors.response.data.errors) {
                    onError(errors.response.data.errors.password);
                }
                if (errors.response.data.error) {
                    onError(errors.response.data.error);
                }
                if (errors.response.data.errors && errors.response.data.error) {
                    onError(errors.response.data.errors.password);
                    onError(errors.response.data.error);
                }
                setIsLoading(false);
            });
    };

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
                    variant="h6"
                    align="center"
                    className={classes.submit}
                >Reset Password</Typography>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5"></Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="uname"
                                    autoFocus
                                    onChange={handleFieldChange}
                                    defaultValue={fields.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
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
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="password"
                                    id="password_confirmation"
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    autoComplete="pwordconfirm"
                                    onChange={handleFieldChange}
                                    defaultValue={fields.password_confirmation}
                                />
                            </Grid>
                        </Grid>
                        <LoaderButton
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            fullWidth
                            disabled={isDisabled}
                            isLoading={isLoading}
                            onClick={handleSubmit}
                        >
                            {buttonText}
                        </LoaderButton>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default ResetPasswordForm
