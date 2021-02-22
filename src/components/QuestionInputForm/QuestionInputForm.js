import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';
import languageApiService from '../../services/language-api-service';

export default class QuestionInputForm extends Component {
    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
          guess: '',
        }
    }

    handleSubmitGuess = async(e) => {
        // prevent reload
        e.preventDefault();

        // switch to answer view
        this.props.toggleView();

        // grab guess and clear input field
        let { guess } = this.state;
        this.guessChanged('');

        // http POST request to API && store the response as 'answer' in state
        let guessResponse = await languageApiService.postGuess(guess);
        this.context.setAnswer(guessResponse)

        // get head && set state with setHead
        let headResponse = await languageApiService.getNextWord();
        this.context.setHead(headResponse);
    }
    
    
    guessChanged = (guess) => {
        this.setState({ guess })
    }

    render() {
        return (
            <form>
                <label htmlFor='learn-guess-input'>
                  What's the translation for this word?
                </label>

                <br />

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
        )
    }
}
