import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SkillsList from "./SkillsList";
import SkillsSearch from "./SkillsSearch";
import SkillsResult from "./SkillsResult";
import SkillsSearchUser from "./SkillsSearchUser";

class SkillsGroup extends Component {
    // static propTypes = {
    //     skillname: PropTypes.string.isRequired,
    // };

    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            users: [],
            isLoading: true,
            searchFieldIsShown: true
        };

        this.handleQuerySkill = this.handleQuerySkill.bind(this);
        this.handleQueryUser = this.handleQueryUser.bind(this);
        this.triggerDisplayState = this.triggerDisplayState.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    componentDidMount() {
        const token = localStorage.userToken;
        console.log(token);
        axios
            .get("api/skill-index")
            .then(response => {
                this.setState({
                    skills: response.data
                });
                console.log(response.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    }

    handleQuerySkill(skillName) {
        axios
            .get("api/show-all-related-skills/" + skillName)
            .then(response => {
                this.setState({
                    skills: response.data
                });
                console.log(response.data);
            })
            .catch(errors => {
                console.log(errors);
            });
    }

    handleQueryUser(skillName) {
        const token = localStorage.userToken;

        axios
            .get("api/skill/" + skillName, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                this.setState({
                    users: response.data,
                    isLoading: false
                });
            })
            .catch(errors => {
                console.log(errors);
            });
    }

    triggerDisplayState() {
        this.setState({
            ...this.state,
            searchFieldIsShown: false,
            searchResultIsShown: true
        });
    }

    refreshPage() {
        // window.location.reload();
        this.setState({
            ...this.state,
            isLoading: true,
            searchFieldIsShown: true,
            searchResultIsShown: false
        });
    }

    keyPress(e) {
        const skillName = e.target.value;
        if (skillName.length > 2) {
            if (e.keyCode === 13) {
                this.handleQueryUser(skillName);
                this.triggerDisplayState();
            }
        }
        return;
    }

    render() {
        let filteredSkills = this.state.skills;
        let filteredUsers = this.state.users;

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {this.state.searchFieldIsShown && (
                            <SkillsSearchUser
                                handleQueryUser={this.handleQueryUser}
                                triggerDisplayState={this.triggerDisplayState}
                                keyPress={this.keyPress}
                            />
                        )}
                        {this.state.searchResultIsShown && (
                            <SkillsResult
                                skillUserRecords={filteredUsers}
                                refreshPage={this.refreshPage}
                                isLoading={this.state.isLoading}
                            />
                        )}

                        <SkillsSearch
                            handleQuerySkill={this.handleQuerySkill}
                        />

                        {/* <SkillsList skillRecords={this.state.skills} /> */}
                        <SkillsList skillRecords={filteredSkills} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SkillsGroup;
