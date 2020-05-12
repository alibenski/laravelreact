import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import { CardHeader } from '@material-ui/core';

const SkillMultiSelectSearch = () => {
    const token = localStorage.userToken;
    const [options, setOptions] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        axios
            .get("api/get-all-child-skills", {
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
        console.log(x)
    }
    return (
        <Fragment>
            <CardHeader title="Add Acquired Skills">
            </CardHeader>
            <div className="m-2">
                <Select isSearchable isMulti
                    onChange={handleChange}
                    options={options}
                />

            </div>
        </Fragment>
    );
}

export default SkillMultiSelectSearch;