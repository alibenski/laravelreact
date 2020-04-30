import React, { Component, PropTypes } from "react";
import axios from "axios";
import CheckboxTree from "react-checkbox-tree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//load fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCheckSquare,
    faSquare,
    faFolder,
    faChevronRight,
    faChevronDown,
    faPlusSquare,
    faMinusSquare,
    faFolderOpen,
    faFile
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faCheckSquare,
    faSquare,
    faFolder,
    faChevronRight,
    faChevronDown,
    faPlusSquare,
    faMinusSquare,
    faFolderOpen,
    faFile
);

class SkillsSelector extends Component {
    state = {
        nodes: [],
        checked: [],
        expanded: []
    };

    constructor(props) {
        super(props);
        this.state = { render: false };
    }
    componentDidMount() {
        const token = localStorage.userToken;
        axios
            .get("api/skill-tree", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
            .then(response => {
                let skillMap = [];
                for (const value of response.data) {
                    skillMap[value["parentskill"]]
                        ? skillMap[value["parentskill"]].push({
                              value: value["id"],
                              label: value["skillname"]
                          })
                        : (skillMap[value["parentskill"]] = [
                              {
                                  value: value["id"],
                                  label: value["skillname"]
                              }
                          ]);
                }
                let skillTree = [];
                Object.keys(skillMap).forEach(function(key) {
                    skillTree.push({
                        value: key,
                        label: key,
                        children: skillMap[key]
                    });
                });
                this.props.state.nodes = skillTree;
                this.setState({ render: true });
            })
            .catch(errors => {
                console.log(errors);
            });
    }

    render() {
        if (this.state.render) {
            return (
                <CheckboxTree
                    nodes={this.props.state.nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={checked => {
                        this.setState({ checked });
                        this.props.state.checked = checked;
                    }}
                    onExpand={expanded => {
                        this.setState({ expanded });
                        this.props.state.expanded = expanded;
                    }}
                    icons={{
                        check: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-check"
                                icon="check-square"
                            />
                        ),
                        uncheck: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-uncheck"
                                icon={["fas", "square"]}
                            />
                        ),
                        halfCheck: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-half-check"
                                icon="minus-square"
                            />
                        ),
                        expandClose: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-expand-close"
                                icon="chevron-right"
                            />
                        ),
                        expandOpen: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-expand-open"
                                icon="chevron-down"
                            />
                        ),
                        expandAll: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-expand-all"
                                icon="plus-square"
                            />
                        ),
                        collapseAll: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-collapse-all"
                                icon="minus-square"
                            />
                        ),
                        parentClose: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-parent-close"
                                icon="folder"
                            />
                        ),
                        parentOpen: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-parent-open"
                                icon="folder-open"
                            />
                        ),
                        leaf: (
                            <FontAwesomeIcon
                                className="rct-icon rct-icon-leaf-close"
                                icon="file"
                            />
                        )
                    }}
                />
            );
        } else {
            return null;
        }
    }
}

export default SkillsSelector;
