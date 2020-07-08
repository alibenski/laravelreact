import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    buttonFilter: {
        margin: theme.spacing(2),
        "&:focus": {
            background: theme.palette.secondary.main,
            color: '#FFF',
        }
    }
}));

function FilterButtons({ handleResetFilter, skill, filters, filterResults }) {
    const classes = useStyles();

    return (

        <div className="row justify-content-center m-4">
            <Button className={classes.buttonFilter} color="secondary" variant="outlined"
                onClick={handleResetFilter}
                data-skill={skill}>Reset Filter</Button>
            {filters ? filters.map((filter, index) => (
                <Button
                    key={index}
                    variant="outlined"
                    color="primary"
                    className={classes.buttonFilter}
                    data-skill={skill}
                    onClick={e => filterResults(e)}
                    value={filter}
                >
                    {filter === '0' ? "Remote" : filter}
                </Button>)) : ""}
        </div>

    );
}

export default FilterButtons;
