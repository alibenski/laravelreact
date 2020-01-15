import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Confirm({ nextStep, values, prevStep }) {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>{values.firstName}</Typography>
                    <div>{values.lastName}</div>
                    <div>{values.email}</div>
                    <div>{values.organization}</div>
                    <div>{values.city}</div>
                    <div>{values.bio}</div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={prevStep}
                        fullWidth
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={nextStep}
                        fullWidth
                    >
                        Confirm and Save
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Confirm;
