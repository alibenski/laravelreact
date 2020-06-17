import React from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import CreateIcon from '@material-ui/icons/Create';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1
    },
    link: {
        color: 'black'
    },
    nested: {
        paddingLeft: theme.spacing(2),
    },
    icon: {
        minWidth: '40px'
    }
}));

export default function ClippedDrawer({ handleLogout }) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

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
                        {icon ? <ListItemIcon className={classes.icon}>{icon}</ListItemIcon> : null}
                        <ListItemText primary={primary} />
                    </ListItem>
                </li>
            );
        }
        return (
            <li>
                <ListItem button component={renderLink}>
                    {icon ? <ListItemIcon className={classes.icon}>{icon}</ListItemIcon> : null}
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

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                <li>
                    <a href="https://conecta.ungeneva.org" style={{ textDecoration: 'none' }} className={classes.link}>
                        <ListItem button >
                            <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>

                    </a>
                </li>
                <ListItemLink
                    to="/profile"
                    primary="My Profile"
                    icon={<AccountBoxIcon />}
                />
                <ListItemLink
                    to="/skill-index"
                    primary="Search"
                    icon={<SearchIcon />}
                />
                <ListItem button onClick={handleClick}>
                    <ListItemIcon className={classes.icon}>
                        <AccountTreeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <div className={classes.nested}>
                            <ListItemLink
                                to="/create-project"
                                primary="Create"
                                icon={<CreateIcon />}
                            />
                            <ListItemLink
                                to="/search-projects"
                                primary="Search Projects"
                                icon={<SearchIcon />}
                            />
                            <ListItemLink
                                to="/view-projects"
                                primary="View My Projects"
                                icon={<GroupWorkIcon />}
                            />
                        </div>
                    </List>
                </Collapse>
                <ListItemLink
                    to="/"
                    primary="How-to"
                    icon={<HelpOutlineIcon />}
                />
            </List>
            <Divider />
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography
                        component="div"
                        variant="h6"
                        className={classes.title}
                    >
                        <Box fontWeight="fontWeightBold" textAlign="center">
                            Conecta
                        </Box>
                    </Typography>
                    <Button onClick={handleLogout} edge="end">
                        <PowerSettingsNewIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    {sideList()}
                </div>
            </Drawer>
        </div>
    );
}