import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import SkillsGroup from "./skills/SkillsGroup";
import UserForm from "./form/UserForm";
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: blueGrey
    }
});

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

function Index() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            // edge="start"
                            className={classes.menuButton}
                            // color="inherit"
                            // aria-label="menu"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Conecta
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Router>
                    <div className="app">
                        <Route
                            exact
                            path="/skill-index"
                            component={SkillsGroup}
                        />
                        <Route exact path="/user-form" component={UserForm} />
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default Index;

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}
