import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    role: {
        alignItems: 'center'
    },
    link: {
        color: '#FFF'
    },
}));

const ConnectNotificationButton = ({ email }) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const hoverOn = () => {
        setHover(true);
    };
    const linkStyle = hover ? { textDecoration: 'none', color: "#fff" } : {};
    const token = localStorage.userToken;
    const [options, setOptions] = useState("");
    const [selected, setSelected] = useState("");
    const sendmail = () => {
        axios
            .get(`/api/send/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(res => {
                console.log(res.data['message']);
                alert(res.data['message']);
            });
    };

    return (
        <Button variant="contained"
            color="secondary"
            className="m-2"
            onClick={sendmail}
        >
            <a style={linkStyle} className={classes.link} onMouseEnter={hoverOn} >
                Connect
            </a>
        </Button>
    );
};

export default ConnectNotificationButton;