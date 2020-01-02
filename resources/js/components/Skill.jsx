import React, { Component, PropTypes } from 'react';
import axios from 'axios';

class Skill extends Component {
    // static propTypes = {
    //     className: PropTypes.string,
    // };

    constructor(props) {
        super(props);
        this.state = {
			skills: [],
		};
	}

	componentDidMount() {
	    axios.get('api/skill-index').then(response => {
	    	this.setState({
	    		skills: response.data
	    	});
	    }).catch(errors => {
	    	console.log(errors);
	    })
	}

    render() {
    	// const renderSkills = this.state.skills.map(skill => {
    	// 	return (
    			
    	// 	);
    	// })

        return (
            <div className="container">
	            <div className="row justify-content-center">
		            <ul>
		              {this.state.skills.map(skill => (

		              	<li>{skill.skillname}</li>
		              )) 
		          	}
		            </ul>
	            </div>
	        </div>
        );
    }
}

export default Skill;
