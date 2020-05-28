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

const drawerWidth = 200;

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
    }
}));

export default function ClippedDrawer({ handleLogout }) {
    const classes = useStyles();
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

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                <li>
                    <a href="https://conecta.ungeneva.org" style={{ textDecoration: 'none' }} className={classes.link}>
                        <ListItem button >
                            <ListItemIcon><HomeIcon /></ListItemIcon>
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
                    primary="Search"
                    icon={<SearchIcon />}
                />
                <ListItemLink
                    to="/"
                    primary="How-to"
                    icon={<AccountBoxIcon />}
                />
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
            <CssBaseline />
            <AppBar position="static" color="primary" className={classes.appBar}>
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