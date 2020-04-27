import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(1)
    }
}));

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    const classes = useStyles();
    return (
        <Button
            className={`LoaderButton ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <div className={classes.root}>
                    <CircularProgress />
                </div>
            )}
            {props.children}
        </Button>
    );
}
