import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import { FormGroup, FormControlLabel } from '@material-ui/core';

const SelectOrganization = ({ handleSelectedOrg, details }) => {
    const token = localStorage.userToken;
    const [options, setOptions] = useState("");
    const [selected, setSelected] = useState("")

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        axios
            .get("api/get-all-organizations", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setOptions(response.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const handleChange = x => {
        setSelected(x)
    }

    handleSelectedOrg(selected)

    return (
        <Fragment>
            <FormGroup className="mt-2">
                <FormControlLabel
                    control={
                        <div className="container">
                            <Select isSearchable
                                placeholder={details.organizations ? details.organizations["name"] : "Select Organization"}
                                onChange={handleChange}
                                options={options}
                            />
                        </div>
                    }
                />
            </FormGroup>
        </Fragment>
    );
}

export default SelectOrganization;