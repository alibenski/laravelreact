import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <Button
            className={`LoaderButton ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <CircularProgress />}
            {props.children}
        </Button>
    );
}
