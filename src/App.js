import React, { useState } from 'react';
import countries from './data/alpha2.json';

export default function App() {
	//Initialize our first question number and track question number
	const [currentQuestion, setCurrentQuestion] = useState(0);
	//Initialize score and track
	const [score, setScore] = useState(0);
	//Function to update current question number
	const handleAnswerButtonClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < shuffledSlicedQuestions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	//Array shuffle func
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	//Handle reaching end and display score screen
	const [showScore, setShowScore] = useState(false);
	//Questions we use
	/*
		{
			questionImagePath: 'images/am.png',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},

	*/
	
	const questions = [];
	const countryCodes = Object.keys(countries);

	for (var key in countries) {
		var question = {
				questionImagePath: 'images/' + key.toLowerCase() + '.png',
				answerOptions: [
					{ answerText: countries[countryCodes[Math.floor(Math.random() * countryCodes.length)]], isCorrect: false },
					{ answerText: countries[countryCodes[Math.floor(Math.random() * countryCodes.length)]], isCorrect: false },
					{ answerText: countries[key], isCorrect: true },
					{ answerText: countries[countryCodes[Math.floor(Math.random() * countryCodes.length)]], isCorrect: false },
				],
			}
		shuffleArray(question.answerOptions)
		questions.push(question)
	}

	shuffleArray(questions);

	const shuffledSlicedQuestions = questions.slice(0, 10);

	return (
		<div className='app'>
			{/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
			{showScore ? (
				<div className='score-section'>You scored {score} out of {shuffledSlicedQuestions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{shuffledSlicedQuestions.length}
						</div>
						<img src={shuffledSlicedQuestions[currentQuestion].questionImagePath} alt='Country'/>
					</div>
					<div className='answer-section'>
					{shuffledSlicedQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
						<button onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
					))}
					</div>
				</>
			)}
		</div>
	);
}
