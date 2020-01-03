import React from "react";
import PropTypes from "prop-types";

const SkillsResult = ({ skillRecords }) => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <ul>
                    {skillRecords.map(skill => (
                        <li key={skill.id} className={skill.id}>
                            {skill.skillname}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

SkillsResult.displayName = "SkillsResult";

SkillsResult.propTypes = {
    skillRecords: PropTypes.array.isRequired,
    skillRecords: PropTypes.arrayOf(PropTypes.object),
    skillRecords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            skillname: PropTypes.string
        })
    )
};

export default SkillsResult;
