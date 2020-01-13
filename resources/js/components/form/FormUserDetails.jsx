import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";

const FormUserDetails = ({ nextStep, handleChange, values, continueNext }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    }));

    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar title="Enter User Details" position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Enter User Details
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <TextField
                    helperText="Enter First Name"
                    label="First Name"
                    onChange={handleChange("firstName")}
                    defaultValue={values.firstName}
                />
                <br />
                <Button
                    variant="contained"
                    color="default"
                    onClick={continueNext}
                >
                    Continue
                </Button>
            </Container>
        </React.Fragment>
    );
};

export default FormUserDetails;
