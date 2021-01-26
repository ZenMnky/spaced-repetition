import config from '../../config';
import TokenService from '../../services/token-service';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class DashboardRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      language: '',
      words: [],
    }
  }


  componentDidMount(){
    this.getLangAndWords();
  }

  getLangAndWords(){
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(response => response.json())
    .then( result => {
      this.setState({
        language: result.language,
        words: result.words
      })
    })  
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('submit button fired');
  }

  render() {
    let language = this.state.language.name;
    let totalCorrectAnswers = this.state.language.total_score;
    let practiceWords = this.state.words.map( (word,index) => {
      return (
        <li key={`${word.original}`+index}>
          <h4>{word.original}</h4>
          <p>Correct answer count: {word.correct_count}</p>
          <p>Incorrect answer count: {word.incorrect_count}</p>
        </li>
      )
    })
    return (
      <section>
        <h2>{language}</h2>
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
