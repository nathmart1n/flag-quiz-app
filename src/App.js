import React, { useState } from 'react';

export default function App() {
	//Country codes and names object
	var countries = JSON.parse(process.env.PUBLIC_URL + 'alpha2.json');
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
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	//Handle reaching end and display score screen
	const [showScore, setShowScore] = useState(false);
	//Questions we use
	const questions = [
		{
			questionImagePath: process.env.PUBLIC_URL + 'images/1.png',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Andorra', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		
	];

	return (
		<div className='app'>
			{/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
			{showScore ? (
				<div className='score-section'>You scored {score} out of {questions.length}</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<img src={questions[currentQuestion].questionImagePath} alt='Country'/>
					</div>
					<div className='answer-section'>
					{questions[currentQuestion].answerOptions.map((answerOption, index) => (
						<button onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
					))}
					</div>
				</>
			)}
		</div>
	);
}
