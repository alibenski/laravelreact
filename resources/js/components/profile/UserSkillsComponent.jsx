import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
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

const UserSkillsComponent = () => {
    const classes = useStyles();
    const token = localStorage.userToken;
    const [userSkills, setUserSkills] = useState([]);
    useEffect(() => {
        loadUserSkills();
    }, []);

    const loadUserSkills = () => {
        axios
            .get("api/show-user-skills", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setUserSkills(...userSkills, response.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    };
    return (
        <Typography>
            {userSkills.map(skill => (
                <li key={skill.id} className={skill.skillname}>
                    {skill.skillname}
                </li>
            ))}
        </Typography>
    );
};

export default UserSkillsComponent;
