import React, { Component } from 'react'

import config from '../../config';
import TokenService from '../../services/token-service';
class LearningRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      next_word: null,
      total_score: null,
      word_correct_count: null,
      word_incorrect_count: null
    }
  }

  componentDidMount(){
    this.getNextWord();
  }

  getNextWord(){
    console.log('getNextWord fired')
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(response => response.json())
    .then( result => {
      this.setState({
        next_word: result.next_word,
        total_score: result.total_score,
        word_correct_count: result.word_correct_count,
        word_incorrect_count: result.word_incorrect_count
      })
    })  
  }


  render() {

    let {
      next_word,
      total_score,
      word_correct_count,
      word_incorrect_count } = this.state;

    
    return (
      <section>
        <h2>Translate the word:</h2>
        <span>
          <h3>{next_word}</h3>
        </span>
    
        <main>
          <form>
            <label htmlFor='learn-guess-input'>
              What's the translation for this word?
            </label>
            <input id='learn-guess-input' type='text' name='learn-guess-input' required />

            <button type='submit'>
              Submit your answer
            </button>
          </form>

          <span>
            <p>Your total score is: {total_score}</p>
            <p>You have answered this word correctly {word_correct_count} times.</p>
            <p>You have answered this word incorrectly {word_incorrect_count} times.</p>
            </span>
        </main>
      </section>
    );
  }
}

export default LearningRoute
