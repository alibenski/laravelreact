import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider
} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
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

function TopBar() {
    const LinkBehavior = React.forwardRef((props, ref) => (
        <RouterLink ref={ref} to="/skill-index" {...props} />
    ));
    const [anchorEl, setAnchorEl] = useState(null);

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
                        <Button
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Router>
                                <MenuItem
                                    component={RouterLink}
                                    to="/"
                                    onClick={handleClose}
                                >
                                    Home
                                </MenuItem>
                                <MenuItem
                                    component={LinkBehavior}
                                    onClick={handleClose}
                                >
                                    Skill Search
                                </MenuItem>
                            </Router>
                        </Menu>
                        <Typography variant="h6" className={classes.title}>
                            Conecta
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}

export default TopBar;
