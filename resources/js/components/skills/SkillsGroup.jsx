import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SkillsList from "./SkillsList";
import SkillsSearch from "./SkillsSearch";
import SkillsResult from "./SkillsResult";
import SkillsSearchUser from "./SkillsSearchUser";
import { Card, CardMedia } from "@material-ui/core";
import logoVector from "../images/logoVector.png";
import { Fragment } from "react";

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
            searchFieldIsShown: true,
            filters: [],
            skill: "",
        };

        this.handleQuerySkill = this.handleQuerySkill.bind(this);
        this.handleQueryUser = this.handleQueryUser.bind(this);
        this.triggerDisplayState = this.triggerDisplayState.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.getFilters = this.getFilters.bind(this);
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
                console.log(response.data);
                this.setState({
                    users: response.data,
                    isLoading: false
                });
                this.getFilters(response.data, skillName);
            })
            .catch(errors => {
                console.log(errors);
            });
    }

    getFilters(data, skillName) {
        let arrayFilter = [];
        data.forEach(element => {
            if (element["stations"]) {
                arrayFilter.push(element["stations"]["name"]);
            }
        });
        let uniqueFilter = [...new Set(arrayFilter)];
        this.setState({
            filters: uniqueFilter,
            skill: skillName,
        });
    };

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
        let skill = this.state.skill;
        let filters = this.state.filters;

        const handleResetFilter = e => {
            this.handleQueryUser(e.currentTarget.dataset.skill);
        };

        const filterResults = e => {
            const token = localStorage.userToken;
            let $request = {
                skillName: e.currentTarget.dataset.skill,
                location: e.currentTarget.value,
            };
            axios
                .post("/api/filter-user-skill", $request, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        users: response.data,
                    });
                })
                .catch(errors => {
                    console.log(errors);
                });
        };

        return (
            <div className="container mt-4" style={{ marginLeft: "13rem" }}>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        {this.state.searchFieldIsShown && (
                            <div className="row">
                                <div className="col-md-10">
                                    <SkillsSearchUser
                                        handleQueryUser={this.handleQueryUser}
                                        triggerDisplayState={this.triggerDisplayState}
                                        keyPress={this.keyPress}
                                    />
                                </div>
                            </div>
                        )}
                        {this.state.searchResultIsShown && (
                            <SkillsResult
                                handleResetFilter={handleResetFilter}
                                skill={skill}
                                filters={filters}
                                filterResults={e => filterResults(e)}
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
