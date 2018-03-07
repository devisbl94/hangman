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
		wordNumber: 1,
		word: '',
		oportunities: 7
	}
	componentWillUnmount() {
		let splittedWord = [...words[this.state.level][this.state.wordNumber].split("")];
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
			    	// left in here
			    	let indices = [];
					let idx = splittedWord.indexOf(letter);
					while (idx != -1) {
						indices.push(idx);
						idx = splittedWord.indexOf(letter, idx + 1);
					}
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
