import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import { CardHeader } from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';

const SkillMultiSelectSearch = ({ handleSelected }) => {
    const token = localStorage.userToken;
    const [options, setOptions] = useState("");
    const [selected, setSelected] = useState("")

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
        setSelected(x)
    }

    handleSelected(selected)

    return (
        <Fragment>
            <CardHeader
                title="Add Acquired Skills"
                subheader=""
            >
            </CardHeader>
            <div className="m-2">
                <CreatableSelect
                    isSearchable
                    isMulti
                    onChange={handleChange}
                    options={options}
                />

            </div>
        </Fragment>
    );
}

export default SkillMultiSelectSearch;