import React, { useState } from 'react';
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

const ForgotPassword = () => {
    const classes = useStyles();
    const [fields, handleFieldChange] = useFormFields({
        email: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Send Reset Email");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let $request = {
            email: email.value
        };

        axios
            .post("api/password/email",
                $request,
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            )
            .then(response => {
                if (response) {
                    console.log("then", response.data)
                    alert(response.data["message"] + " Please check your email inbox");
                    setIsDisabled(true)
                    setIsLoading(false);
                    setButtonText("Please check your email inbox")
                }
            }
            )
            .catch(errors => {
                console.log(errors.response.data.error);
                onError(errors.response.data.error);
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
                >Forgot your password? <br /> No worries, just type your email below and we will send a reset password email.</Typography>
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

export default ForgotPassword
