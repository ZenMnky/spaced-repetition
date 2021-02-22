import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';

export default class AnswerView extends Component {
    static contextType = UserContext;

    handleContinue(e) {
        e.preventDefault();
        this.props.toggleView();
    }
    
    render() {

        let { 
            answer,
            isCorrect,
            nextWord,
            totalScore,
            wordCorrectCount, 
            wordIncorrectCount,
        } = (this.context.answer) ? this.context.answer : 'Loading...';

        let answerResponse = '';
        if (isCorrect === true){
            answerResponse = 'Correct!';
        } else if (isCorrect === false) {
            answerResponse = 'Incorrect';
        } else {
            answerResponse = 'Loading...';
        }
    
        console.log('isCorrect: ', isCorrect)

        return (
            <section id='answer-view'>
                <h1>{answerResponse}</h1>
                <ul>
                    <li>Correct Answer: {answer}</li>
                    <li>Next Word: {nextWord}</li>
                    <li>Total Score: {totalScore}</li>
                    <li>You have answered this word correctly {wordCorrectCount} times.</li>
                    <li>You have answered this word incorrectly {wordIncorrectCount} times.</li>
                </ul>
                <button onClick={(e) => this.handleContinue(e)} type='submit'>
                    Continue
                </button>
                

            </section>
        )
    }
}
