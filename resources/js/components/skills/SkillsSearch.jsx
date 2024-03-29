import React from "react";

const SkillsSearch = ({ handleQuerySkill }) => {
    let skillName = "";
    return (
        <div className="card d-none">
            <div className="card-header">Search Skill</div>
            <div className="card-body">
                <input
                    className="col-md-12"
                    onChange={e => (skillName = e.target.value)}
                ></input>
            </div>
            <div className="card-footer">
                <button onClick={e => handleQuerySkill(skillName)}>
                    Search
                </button>
            </div>
        </div>
    );
};

export default SkillsSearch;
