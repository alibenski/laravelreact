import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import AvatarComponent from "./AvatarComponent";
import UserSkillsComponent from "./UserSkillsComponent";

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

const DetailComponent = () => {
    const classes = useStyles();
    const token = localStorage.userToken;
    const [details, setDetails] = useState("");
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        axios
            .get("api/details", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setDetails(response.data.success);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <AvatarComponent />
                    <br />
                    <Typography>
                        ID # {details.id} {details.name}
                    </Typography>
                    <Typography>Email: {details.email}</Typography>
                    <Typography>Gender: {details.gender}</Typography>
                    <br />
                    <UserSkillsComponent />
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default DetailComponent;
