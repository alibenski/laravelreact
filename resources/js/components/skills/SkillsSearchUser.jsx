import React from "react";

const SkillsSearchUser = ({
    handleQueryUser,
    triggerDisplayState,
    keyPress
}) => {
    let skillName = "";
    return (
        <div className="card">
            <div className="card-header">Input Skill</div>
            <div className="card-body">
                <input
                    className="col-md-12"
                    onChange={e => (skillName = e.target.value)}
                    onKeyDown={e => keyPress(e)}
                ></input>
            </div>
            <div className="card-footer">
                <button
                    onClick={e => {
                        handleQueryUser(skillName);
                        triggerDisplayState();
                    }}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SkillsSearchUser;
