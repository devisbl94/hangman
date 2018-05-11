// Dependencies
import React, { Component } from 'react';
import * as Mousetrap from 'mousetrap';
import { includes, isEqual } from 'lodash';

// Components
import LevelIndicator from './../Components/LevelIndicator/LevelIndicator';
import Points from './../Components/Points/Points';
import WordField from './../Components/WordField/WordField';

// Utilities
import { alphabet, words } from './../assets.js';

import './App.css';

class App extends Component {
	state = {
		lettersUsed: [],
		level: 1,
		unknownWord: '',
		word: '',
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

					let indexOf = this.state.word.indexOf(letter);
					
					if (indexOf === -1) {
						this.setState({ oportunities: this.state.oportunities - 1 });
						if (this.state.oportunities < 0) {
							this.gameOver();
						}
					} else {
						this.getWord(this.state.level, this.state.wordNumber, letter);
						if (isEqual(this.state.word, this.state.unknownWord)) {
							this.goNext();
							this.getWord(this.state.level, this.state.wordNumber);
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
		if (this.state.level === 3 && this.state.wordNumber === 2) {
			this.gameOver();
			return;
		}
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
			level: 1,
			unknownWord: '',
			word: '',
			wordNumber: 0,
			oportunities: 7
		});
		this.getWord(this.state.level, this.state.wordNumber);
	}
	getWord = (level, wordNumber, letter = null) => {
		if (letter === null) {
			let word = [...words[this.state.level][this.state.wordNumber].split("")];
			let unknownWord = word.map( (value, index) => {
				return index === 0 || index === word.length - 1 ? value : '_';
			});
			this.setState({
				word: word,
				unknownWord: unknownWord,
				lettersUsed: []
			});
			return;
		}

		let word = [...this.state.word];
		let unknownWord = [...this.state.unknownWord];
		let indices = [];
		let idx = word.indexOf(letter);

		while (idx !== -1) {
			indices.push(idx);
			idx = word.indexOf(letter, idx + 1);
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
