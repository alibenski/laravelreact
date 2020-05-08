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
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import logoConecta from "../images/logoConecta.png";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: ""
        // confirmationCode: ""
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const [gender, setGender] = useState("");
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

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

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    // function validateConfirmationForm() {
    //     return fields.confirmationCode.length > 0;
    // }

    const handleRadioChange = e => {
        setGender(e.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        let $request = {
            firstname: fields.firstname,
            lastname: fields.lastname,
            email: fields.email,
            gender: gender,
            password: fields.password,
            confirmPassword: fields.confirmPassword
        };

        try {
            await axios
                .post("api/register", $request)
                .then(response => {
                    console.log(response.data);
                    setIsLoading(false);
                    setNewUser(response);
                })
                .catch(errors => {
                    console.log(errors);
                    onError(errors);
                    setIsLoading(false);
                });
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }

        setIsLoading(false);
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
    }

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

    function renderConfirmationForm() {
        const classes = useStyles();
        return (
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
                    <Typography component="h1" variant="h5">
                        Please check your email to verify your registration.
                    </Typography>
                    <br />
                    {/* <form onSubmit={handleConfirmationSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    readOnly
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="confirmationCode"
                                    label="Confirmation Code"
                                    name="confirmationCode"
                                    autoFocus
                                    type="tel"
                                    onChange={handleFieldChange}
                                    defaultValue={fields.confirmationCode}
                                />
                            </Grid>
                        </Grid>
                        <LoaderButton
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            fullWidth
                            type="submit"
                            isLoading={isLoading}
                            disabled={!validateConfirmationForm()}
                        >
                            Verify
                        </LoaderButton>
                    </form> */}
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }

    function renderForm() {
        const classes = useStyles();
        return (
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
                                    type="text"
                                    id="firstname"
                                    label="First Name"
                                    name="firstname"
                                    autoComplete="fname"
                                    autoFocus
                                    onChange={handleFieldChange}
                                    defaultValue={fields.firstname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="pastextsword"
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="lname"
                                    onChange={handleFieldChange}
                                    defaultValue={fields.lastname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Work Email Address"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Work Email Address"
                                    onChange={handleFieldChange}
                                    defaultValue={fields.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        defaultValue=""
                                        aria-label="gender"
                                        onChange={handleRadioChange}
                                        row
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                    </RadioGroup>
                                </FormControl>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="password"
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    autoComplete="cpword"
                                    onChange={handleFieldChange}
                                    defaultValue={fields.confirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <LoaderButton
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            fullWidth
                            disabled={!validateForm()}
                            isLoading={isLoading}
                            onClick={handleSubmit}
                        >
                            Signup
                        </LoaderButton>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already a member? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}
