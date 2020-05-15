import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import { CardHeader, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const SkillDesiredSearch = ({ handleSelectedDesired, details }) => {
    const token = localStorage.userToken;
    const [options, setOptions] = useState("");
    const [selected, setSelected] = useState("")
    const userSkills = details.desiredskills;

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        axios
            .get("api/get-all-child-skills", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setOptions(response.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const handleChange = x => {
        setSelected(x)
    }

    const handleDeleteSkill = () => {
        alert("sorry, delete button is not yet working")
    }

    handleSelectedDesired(selected)

    return (
        <Fragment>
            <CardHeader
                title="Skills to Develop"
                subheader="Instructions here if needed">
            </CardHeader>
            <div className="m-2">
                <Select isSearchable isMulti
                    onChange={handleChange}
                    options={options}
                />
            </div>
            <CardContent>
                <Typography variant="h6">Skills I hope to develop:</Typography>
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
            </CardContent>
        </Fragment>
    );
}

export default SkillDesiredSearch;