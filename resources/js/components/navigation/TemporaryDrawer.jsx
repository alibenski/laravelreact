import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import Box from "@material-ui/core/Box";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    list: {
        width: 250
    }
}));

const TemporaryDrawer = ({ handleLogout, theme }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (side, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };
    const history = useHistory();

    function ListItemLink(props) {
        const { icon, primary, to } = props;

        const renderLink = React.useMemo(
            () =>
                React.forwardRef((itemProps, ref) => (
                    <RouterLink to={to} ref={ref} {...itemProps} />
                )),
            [to]
        );
        if (history.location["pathname"] === to) {
            return (
                <li>
                    <ListItem button>
                        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                        <ListItemText primary={primary} />
                    </ListItem>
                </li>
            );
        }
        return (
            <li>
                <ListItem button component={renderLink}>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={primary} />
                </ListItem>
            </li>
        );
    }

    ListItemLink.propTypes = {
        icon: PropTypes.element,
        primary: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
                <ListItemLink
                    to="/profile"
                    primary="Profile"
                    icon={<AccountBoxIcon />}
                />
                <ListItemLink
                    to="/create-project"
                    primary="Create project"
                    icon={<AccountBoxIcon />}
                />
                {/* <ListItemLink
                    to="/user-form"
                    primary="Form"
                    icon={<AccountBoxIcon />}
                /> */}
                <ListItemLink
                    to="/skill-index"
                    primary="Search Skill"
                    icon={<SearchIcon />}
                />
                {/* <ListItemLink
                    to="/create-profile"
                    primary="Create profile"
                    icon={<AccountBoxIcon />}
                /> */}
            </List>
            <Divider />
            {/* <List>
                {["S1", "S2", "S3"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    return (
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
                        onClick={toggleDrawer("left", true)}
                    >
                        <MenuIcon />
                    </Button>
                    <Typography
                        component="div"
                        variant="h6"
                        className={classes.title}
                    >
                        <Box fontWeight="fontWeightBold" textAlign="center">
                            Conecta
                        </Box>
                    </Typography>
                    <Button onClick={handleLogout}>
                        <PowerSettingsNewIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
        </div>
    );
};

export default TemporaryDrawer;
