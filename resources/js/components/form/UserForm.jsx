import React, { Component } from "react";
import ReactDOM from "react-dom";
import FormUserDetails from "./FormUserDetails";

export class UserForm extends Component {
    state = {
        step: 1,
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        city: "",
        bio: ""
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    continue = e => {
        e.preventDefault();
        this.nextStep();
    };

    render() {
        const { step } = this.state;
        const {
            firstName,
            lastName,
            email,
            organization,
            city,
            bio
        } = this.state;
        const values = {
            firstName,
            lastName,
            email,
            organization,
            city,
            bio
        };
        switch (step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        continueNext={this.continue}
                        values={values}
                    />
                );
            case 2:
                return <h1>case 2</h1>;
            case 3:
                return <h1>case 3</h1>;
            case 4:
                return <h1>case 4</h1>;
        }
    }
}

export default UserForm;

if (document.getElementById("user-form-wrapper")) {
    ReactDOM.render(<UserForm />, document.getElementById("user-form-wrapper"));
}
