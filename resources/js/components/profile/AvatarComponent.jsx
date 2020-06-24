import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { Fragment } from "react";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1)
        },
        minWidth: 275
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500]
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    input: {
        display: "none"
    },
}));

function AvatarComponent() {
    const classes = useStyles();
    const token = localStorage.userToken;
    const [image, setImage] = useState(null);
    const [avatar, setAvatar] = useState("/broken-image.jpg");
    const [imagePreview, setImagePreview] = useState(null);
    const [display, setDisplay] = useState(classes.input);

    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = () => {
        axios
            .get("api/details", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                setAvatar("/storage/" + response.data.success.photo);
            })
            .catch(errors => {
                console.log(errors);
            });
    };

    const handleUploadClick = e => {
        console.log(e.target.files[0]);
        let files = e.target.files;
        if (!files.length)
            return;
        setImagePreview(URL.createObjectURL(files[0]));
        setDisplay("");
        createImage(files[0]);
    };

    const createImage = file => {
        let reader = new FileReader();
        reader.onload = e => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadFile = () => {
        let $request = { file: image };
        axios
            .post("/api/store-image", $request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },
                onUploadProgress: progressEvent => {
                    console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%");
                }
            })
            .then(response => {
                loadUser();
            })
            .catch(errors => {
                console.log(errors);
            });
        setImage(null);
        setDisplay(classes.input);
    };

    let imgPreview;
    if (image) {
        imgPreview = <Avatar src={imagePreview} className={classes.large} />;
    }
    return (
        <Fragment>
            <div className="form-group preview">
                {imgPreview}
                <Button className={display} onClick={uploadFile} color="primary">Save</Button>
                <Button className={display}>Cancel</Button>
            </div>
            <input
                accept="image/*"
                className={classes.input}
                id="image-files"
                // multiple
                type="file"
                onChange={handleUploadClick}
            />
            <label htmlFor="image-files">
                <Avatar src={avatar} className={classes.large} />
            </label>
        </Fragment>
    );
}

export default AvatarComponent;
