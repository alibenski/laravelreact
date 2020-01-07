import React from "react";
import PropTypes from "prop-types";

const SkillsResult = ({ skillUserRecords }) => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <ul>
                    {skillUserRecords.map(user => (
                        <li key={user.id} className={user.id}>
                            {user.lastname}, {user.firstname}
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
