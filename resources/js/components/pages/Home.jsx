import React, { Fragment } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logoConecta from "../images/logoConecta.png";

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

export default function Home() {
    const classes = useStyles();
    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <img
                    src={logoConecta}
                    alt="conecta logo"
                    className={classes.logo}
                />
                <div align="justify">
                    <Typography paragraph={true}>
                        Hello! Welcome to conecta! Here you can also search for skills and projects and start connecting with colleagues!
                    </Typography>
                    <Typography paragraph={true}>
                        Use “My profile” to make any changes to your profile. In the “Search” tab  you will get a list of suggested profiles based on the skills you have searched. In the profiles you can see if colleagues are interested in volunteering for projects, job shawdowing and mentoring and you can contact them by email to start a conversation.
                    </Typography>
                    <Typography paragraph={true}>
                        In the “Projects” tab you can see a list of projects that need help, search for projects based on skills and filter by duty station. You can also create your own project!
                    </Typography>
                    <Typography paragraph={true}>
                        Please <a href="mailto:conecta@un.org">contact us</a> if you have questions or suggestions, We will be happy to hear from you!
                    </Typography>
                </div>
            </Container>
        </Fragment>
    );
}
