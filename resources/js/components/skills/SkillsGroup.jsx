import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SkillsList from "./SkillsList";
import SkillsSearch from "./SkillsSearch";

class SkillsGroup extends Component {
    // static propTypes = {
    //     skillname: PropTypes.string.isRequired,
    // };

    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };

        this.handleQuerySkill = this.handleQuerySkill.bind(this);
    }

    componentDidMount() {
        axios
            .get("api/skill-index")
            .then(response => {
                this.setState({
                    skills: response.data
                });
                // console.log(response.data);
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

    render() {
        let filteredSkills = this.state.skills;

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
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

if (document.getElementById("skills-wrapper")) {
    ReactDOM.render(<SkillsGroup />, document.getElementById("skills-wrapper"));
}
