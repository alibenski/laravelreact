import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    button: {
        margin: theme.spacing(1)
    },
    margin: {
        margin: theme.spacing(0)
    },
    pos: {
        marginBottom: 12
    }
}));

const SkillsSearchUser = ({
    handleQueryUser,
    triggerDisplayState,
    keyPress
}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        skillName: "",
        isDisabled: true
    });
    const handleTextChange = e => {
        if (e.target.value.length > 2) {
            setState({
                skillname: e.target.value,
                isDisabled: false
            });
        } else {
            setState({ skillName: "", isDisabled: true });
        }
    };
    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Search Skill
                    </Typography>
                    <br />
                    <FormControl
                        fullWidth
                        className={classes.margin}
                        variant="outlined"
                    >
                        <TextField
                            id="outlined-basic"
                            label="Enter Skill"
                            variant="outlined"
                            onChange={e => handleTextChange(e)}
                            onKeyDown={e => keyPress(e)}
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button
                        disabled={state.isDisabled}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SearchIcon />}
                        onClick={e => {
                            handleQueryUser(state.skillName);
                            triggerDisplayState();
                        }}
                    >
                        Search
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default SkillsSearchUser;
