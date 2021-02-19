import React, { Component } from 'react'

import config from '../../config';
import TokenService from '../../services/token-service';
class LearningRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      nextWord: null,
      totalScore: null,
      wordCorrectCount: null,
      wordIncorrectCount: null
    }
  }

  async componentDidMount(){
    await this.getNextWord();
  }

  async getNextWord(){
    console.log('getNextWord fired')
    let response = await fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    });
    let jsonResponse =  await response.json();
    
    this.setState({
      nextWord: jsonResponse.nextWord,
      totalScore: jsonResponse.totalScore,
      wordCorrectCount: jsonResponse.wordCorrectCount,
      wordIncorrectCount: jsonResponse.wordIncorrectCount
    })
  
  }


  render() {

    let {
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount } = this.state;
    
    

    
    return (
      <section>
        <h2>Translate the word:</h2>
        <span>
          <h3>{nextWord == null ? 'Loading...' : nextWord}</h3>
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
            <p>Your total score is: {totalScore == null ? 'Loading...' : totalScore}</p>
            <p>You have answered this word correctly {wordCorrectCount == null ? 'Loading...' : wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {wordIncorrectCount == null ? 'Loading...' : wordIncorrectCount} times.</p>
            </span>
        </main>
      </section>
    );
  }
}

export default LearningRoute
