import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                This is the index page!
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
