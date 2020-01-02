import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Index() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                This is the index page!!!
                <SearchSkill />
                
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
