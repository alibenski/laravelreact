import React from 'react';
import ReactDOM from 'react-dom';

import Skill from './Skill';

function Index() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                This is the index page!!!
                <Skill />
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
