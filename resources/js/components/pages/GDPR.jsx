import React, { Fragment } from "react";
import { Container, Typography, Card, CardContent } from "@material-ui/core";
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
            <Container component="main" maxWidth="md">
                <img
                    src={logoConecta}
                    alt="conecta logo"
                    className={classes.logo}
                />
                <Card className="mb-4">
                    <CardContent>
                        <div align="justify">
                            <Typography paragraph={true}>
                                <i>conecta</i> has been developed by a volunteer task force initiated by <a href="https://learning.unog.ch/">CLM</a> and <a href="http://www.young-un.org">Young UN</a> members with the aim to foster greater and easier collaboration with UN staff. The <i>conecta</i> platform does so by providing a space for inter-agency contribution and collaboration. The <i>conecta</i> is hosted by a UN server and as such complies with the latest ISO standard.
                        </Typography>
                            <Typography paragraph={true}>
                                While the submitted project and contact information will only be available to logged-in users, it is recommended that only a basic description of any project is provided through the conecta platform. All private, sensitive or confidential information should be omitted at this point and only shared with volunteers directly and outside of this platform, in accordance with <a href="https://undocs.org/ST/SGB/2007/6">ST/SGB/2007/6</a> – Information sensitivity, classification and handling.
                        </Typography>
                            <Typography paragraph={true}>
                                This platform is intended to serve purely to identify the match between the project/need and volunteers available to help.
                        </Typography>
                            <Typography paragraph={true}>
                                Volunteering is strictly voluntary in nature and doesn’t lead or give rise to an entitlement or expectation of any contractual benefit or remuneration for the help provided. Equally, the help received shall not substitute legitimate staffing needs and shall not be misused or used for other purposes than set out by the virtue of the interaction and its modality.
                        </Typography>
                            <Typography paragraph={true}>
                                All information provided is confidential and should not be shared without written permission of the individual who submitted the need/project or application to volunteer. All information submitted through the platform shall be exercised in good faith, upholding the utmost principles of professionalism, integrity, respect and confidentiality.
                        </Typography>
                            <Typography paragraph={true}>
                                Visitors may post content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any other way to third parties. We reserve all rights to remove such content.
                        </Typography>
                            <Typography paragraph={true}>
                                If you are an owner of an account on this platform, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.
                        </Typography>
                            <Typography paragraph={true}>
                                By using this platform, you agree to this disclaimer and confirm that you shall uphold the above mentioned principles at all times.
                        </Typography>
                            <Typography paragraph={true}>
                                If you want to get involved or have any further questions, please reach out to <a href="mailto:conecta@un.org">conecta@un.org</a>.
                        </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </Fragment>
    );
}
