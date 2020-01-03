import React from 'react';
import ReactDOM from 'react-dom';

function Index() {
    return (
		<main className="page bg-white" id="home">
	        <div className="container">
	            <div className="row justify-content-center">
	              <div className="col-md-12 bg-white">
	                	<h2 className="text-center">This is the Conecta Home Page</h2>
	              </div>
	            </div>
	        </div>
        </main>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
