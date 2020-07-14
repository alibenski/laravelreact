import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, FormGroup, FormControl, FormLabel, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3)
    }
}));

function LanguageSelectComponent({ handleSelectedLanguage, details }) {
    const classes = useStyles();
    const lang = {};
    details.languages.forEach(element => {
        lang[element.name] = true;
    });

    const [checkbox, setCheckBox] = useState(lang);

    const handleSelectedCheckBox = e => {
        setCheckBox({ ...checkbox, [event.target.name]: event.target.checked });
    };
    const { Arabic, Chinese, English, French, Russian, Spanish } = checkbox;
    handleSelectedLanguage(checkbox);
    return (
        <FormGroup>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Working Language(s):</FormLabel>
                <Grid container className={classes.root}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Arabic ? Arabic : false}
                                onChange={handleSelectedCheckBox}
                                name="Arabic"
                            />
                        }
                        label="Arabic"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Chinese ? Chinese : false}
                                onChange={handleSelectedCheckBox}
                                name="Chinese"
                            />
                        }
                        label="Chinese"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={English ? English : false}
                                onChange={handleSelectedCheckBox}
                                name="English"
                            />
                        }
                        label="English"
                    />
                </Grid>
                <Grid container className={classes.root}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={French ? French : false}
                                onChange={handleSelectedCheckBox}
                                name="French"
                            />
                        }
                        label="French"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Russian ? Russian : false}
                                onChange={handleSelectedCheckBox}
                                name="Russian"
                            />
                        }
                        label="Russian"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Spanish ? Spanish : false}
                                onChange={handleSelectedCheckBox}
                                name="Spanish"
                            />
                        }
                        label="Spanish"
                    />
                </Grid>
            </FormControl>
        </FormGroup>
    );
}

export default LanguageSelectComponent;