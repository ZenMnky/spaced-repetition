import React, {Component} from 'react'
import AppContext from '../../contexts/AppContext';

export default class QuestionView extends Component{
    static contextType = AppContext;
    
    constructor(props){
        super(props);
        this.state = {
          guess: '',
        }
    }

    handleSubmitGuess = (e) => {
        e.preventDefault();
        this.props.toggleQuestionView();
        // grab and clear
        let { guess } = this.state;
        this.guessChanged('');
    
        // http POST request to API
    
        //
    
    }
    
    guessChanged = (guess) => {
    this.setState({ guess })
    }

    render() {
        let { nextWord, totalScore, wordCorrectCount, wordIncorrectCount } = this.context;

        return (
            <section id='questionView'>
            <h2>Translate the word:</h2>
            <span>
              <h3>{nextWord == null ? 'Loading...' : nextWord}</h3>
            </span>
        
            <main>
              <form>
                <label htmlFor='learn-guess-input'>
                  What's the translation for this word?
                </label>
                <input 
                  id='learn-guess-input' 
                  type='text' 
                  name='learn-guess-input' 
                  value={this.state.guess}
                  onChange={e => this.guessChanged(e.target.value)}
                  required
                />
    
                <button onClick={(e) => this.handleSubmitGuess(e)} type='submit'>
                  Submit your answer
                </button>
              </form>
    
              <span>
                <p>Your total score is: {totalScore == null ? 'Loading...' : totalScore}</p>
                <p>You have answered this word correctly {wordCorrectCount == null ? 'Loading...' : wordCorrectCount} times.</p>
                <p>You have answered this word incorrectly {wordIncorrectCount == null ? 'Loading...' : wordIncorrectCount} times.</p>
                </span>
            </main>
          </section>
        )
    }
    
}
