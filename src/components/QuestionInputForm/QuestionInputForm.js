import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';

export default class QuestionInputForm extends Component {
    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
          guess: '',
        }
    }

    handleSubmitGuess = (e) => {
        // prevent reload
        e.preventDefault();

        // switch to answer view
        // this.props.toggleView();

        // grab guess and clear input field
        let { guess } = this.state;
        this.guessChanged('');
        console.log('guess: ', guess)

        // http POST request to API
       
        //
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
