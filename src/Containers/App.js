// Dependencies
import React, { Component } from 'react';
import * as Mousetrap from 'mousetrap';
import { includes, isEqual } from 'lodash';

// Components
import Hangman from './../Components/Hangman/Hangman';
import LevelIndicator from './../Components/LevelIndicator/LevelIndicator';
import Points from './../Components/Points/Points';
import WordField from './../Components/WordField/WordField';

// Utilities
import { alphabet, words } from './../assets.js';

import './App.css';

class App extends Component {
	state = {
		lettersUsed: [],
		points: 0,
		level: 1,
		unknownWord: '',
		wordLevel: '',
		wordNumber: 0,
		oportunities: 7
	}
	componentDidMount() {
		this.getWord();
		alphabet.forEach(letter => {
			Mousetrap.bind(letter, () => {
			    let lettersUsed = [...this.state.lettersUsed];
			    if(includes(lettersUsed, letter)) {

					console.log(`But you've pressed letter ${letter} already!`);
					
			    } else {

			    	lettersUsed.push(letter);
			    	this.setState({lettersUsed: lettersUsed});
					console.log(`You've pressed letter ${letter}`);

					let splittedWord = [...this.state.wordLevel];
					let index = splittedWord.indexOf(letter);
					
					if (index === -1) {
						this.setState({ oportunities: this.state.oportunities - 1 });
						if (this.state.oportunities < 0) {
							this.gameOver();
							this.getWord(this.state.levelNumber, this.state.wordNumber);
						}
					} else {
						this.getWord(this.state.levelNumber, this.state.wordNumber, letter);
						if (isEqual(this.state.wordLevel, this.state.unknownWord)) {
							this.goNext();
							this.getWord(this.state.levelNumber, this.state.wordNumber);
						}
					}
			    }
			});
		});
	}
	componentWillUnmount() {
		alphabet.forEach(letter => {
			Mousetrap.unbind(letter);
		})
	}
	goNext = () => {
		this.state.wordNumber === 2 ? this.setState({ 
			wordNumber: 0, 
			level: this.state.level + 1 
		}) : this.setState({ 
			wordNumber: this.state.wordNumber + 1 
		});
	}
	gameOver = () => {
		alert("GAME OVER");
		this.setState({
			lettersUsed: [],
			points: 0,
			level: 1,
			unknownWord: '',
			wordLevel: '',
			wordNumber: 0,
			oportunities: 7
		});
	}
	getWord = (levelNumber, wordNumber, letter = null) => {
		if (letter === null) {
			let wordLevel = [...words[this.state.level][this.state.wordNumber].split("")];
			let unknownWord = wordLevel.map( (value, index) => {
				return index === 0 || index ===wordLevel.length - 1 ? value : '_';
			});
			this.setState({
				wordLevel: wordLevel,
				unknownWord: unknownWord,
				lettersUsed: []
			});
			return;
		}

		let wordLevel = [...this.state.wordLevel];
		let unknownWord = [...this.state.unknownWord];
		let indices = [];
		let idx = wordLevel.indexOf(letter);

		while (idx !== -1) {
			indices.push(idx);
			idx = wordLevel.indexOf(letter, idx + 1);
		}

		indices.forEach((value) => {
			unknownWord[value] = letter;
		});

		this.setState({unknownWord: unknownWord});
		return;
	}

	render() {
		return (
		  <div className="App">
			<p>Level: {this.state.level}</p>
			<p>Oportunities: {this.state.oportunities}</p>
		  	<p>Letters used: {this.state.lettersUsed}</p>
			<WordField
				word={this.state.unknownWord} />
		  </div>
		);
	}
}

export default App;
