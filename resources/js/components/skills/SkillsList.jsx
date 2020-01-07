import React from "react";
import PropTypes from "prop-types";

const SkillsList = ({ skillRecords }) => {
    return (
        <div className="container mt-4 d-none">
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

SkillsList.displayName = "SkillsList";

SkillsList.propTypes = {
    skillRecords: PropTypes.array.isRequired,
    skillRecords: PropTypes.arrayOf(PropTypes.object),
    skillRecords: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            skillname: PropTypes.string
        })
    )
};

export default SkillsList;
