import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1)
        },
        minWidth: 275
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}));

function AvatarComponent() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <Avatar src="/broken-image.jpg" className={classes.large} />
                    <Typography>User detail component here </Typography>
                    <Typography>User-Skill component here </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default AvatarComponent;
