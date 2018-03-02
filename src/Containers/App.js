import React, { Component } from 'react';
import * as Mousetrap from 'mousetrap';

import './App.css';

class App extends Component {

	componentDidMount() {
		Mousetrap.bind('enter', () => {
		    alert('sup');
		});
	}
	componentWillUnmount() {
		Mousetrap.unbind('enter', () => {
		    alert('sup');
		});
	}
	render() {
		return (
		  <div className="App">
			<p></p>
		  </div>
		);
	}
}

export default App;
