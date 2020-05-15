import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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

const UserSkillsComponent = ({ details }) => {
    const classes = useStyles();
    const token = localStorage.userToken;
    // const [userSkills, setUserSkills] = useState(details.childskills);
    const userSkills = details.childskills;

    // useEffect(() => {
    //     loadUserSkills();
    // }, []);

    // const loadUserSkills = () => {
    //     axios
    //         .get("api/show-user-skills", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 Accept: "application/json"
    //             }
    //         })
    //         .then(response => {
    //             setUserSkills(...userSkills, response.data);
    //         })
    //         .catch(errors => {
    //             console.log(errors);
    //         });
    // };

    const handleDeleteSkill = () => {
        alert("sorry, delete button is not yet working")
    }
    return (
        <Fragment>
            <List >
                {userSkills.map(skill => (
                    <ListItem key={skill.id}>
                        <ListItemText
                            primary={skill.skillname}
                            secondary=""
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={handleDeleteSkill}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Fragment >
    );
};

export default UserSkillsComponent;
