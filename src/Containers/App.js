import React, { Component } from 'react';
import * as Mousetrap from 'mousetrap';
import { includes } from 'lodash';

import { alphabet } from './../Utilities/alphabetAsset.js';
import { words } from './../Utilities/words.js';

import './App.css';

class App extends Component {
	state = {
		lettersUsed: [],
		points: 0,
		level: 1,
		oportunities: 7
	}
	componentDidMount() {
		alphabet.forEach(letter => {
			Mousetrap.bind(letter, () => {
			    const lettersUsed = [...this.state.lettersUsed];
			    if(includes(lettersUsed, letter)) {
			    	console.log(`But you've pressed letter ${letter} already!`);
			    } else {
			    	lettersUsed.push(letter);
			    	this.setState({lettersUsed: lettersUsed});
			    	console.log(`You've pressed letter ${letter}`);
			    	// left from here
			    	let indices = [];

			    }
			});
		})
	}
	componentWillUnmount() {
		alphabet.forEach(letter => {
			Mousetrap.unbind(letter);
		})
	}
	render() {
		return (
		  <div className="App">
		  	<p>{this.state.lettersUsed}</p>
		  	<p>You word is: </p>
		  </div>
		);
	}
}

export default App;
