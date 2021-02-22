import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import languageApiService from '../../services/language-api-service';
import TokenService from '../../services/token-service';

class DashboardRoute extends Component {
  static contextType = UserContext;


  async componentDidMount(){
    console.log(TokenService.getAuthToken())
    if(TokenService.hasAuthToken()){
      await this.getAndSetWords();
    }
  }

  async getAndSetWords(){
    let words = await languageApiService.getWords();
    this.context.setWords(words);
  }

  render() {

    let { words } = this.context;
    let { language } = words;



    let languageName = (language) ? language.name : 'Loading...';
    let totalCorrectAnswers = (language) ? language.total_score : 'Loading...';
    let practiceWords = '';
    if(words && words.words !== undefined){
      practiceWords = words.words.map( (word, index) => {
        return (
          <li key={`${word.original}`+index}>
            <h4>{word.original}</h4>
            <p>Correct answer count: {word.correct_count}</p>
            <p>Incorrect answer count: {word.incorrect_count}</p>
          </li>
          )}
      )
    } else {
      practiceWords = <li>Loading...</li>;
    }

    
    return (
        <section>
          <h2>{languageName}</h2>
          <p>Total correct answers: {totalCorrectAnswers}</p>
        
          <h3>Words to practice</h3>
            <ul>
              {practiceWords}
            </ul>
          
          <Link to='/learn'>
            <button>
              Start practicing
            </button>
          </Link>
        </section>
     
    );
  }
}

export default DashboardRoute
