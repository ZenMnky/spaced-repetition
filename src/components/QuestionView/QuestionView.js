import React, {Component} from 'react'
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';



export default class QuestionView extends Component{
    static contextType = UserContext;
    
    async componentDidMount() {
      try {
        let words = await LanguageApiService.getWords();
        this.context.setWords(words)
      } catch(err) {
        this.context.setError(err)
      }
    }

    // handleSubmitGuess = (e) => {
    //     // prevent reload
    //     e.preventDefault();
        
    //     // switch to answer view
    //     // this.props.toggleQuestionView();

    //     // grab guess and clear input field
    //     let { guess } = this.state;
    //     this.guessChanged('');
    
    //     // http POST request to API
    //     this.props.value.postGuess(guess)
    //     //
    
    // }
    
    // guessChanged = (guess) => {
    // this.setState({ guess })
    // }

    render() {
      let { words, answer, head } = this.context;

      let language = (words.language) 
        ? words.language.name
        : 'Language loading...';
      console.log('language: ', language)

      let score = null;
      if (answer.totalScore) {
        score = answer.totalScore;
      } else if ( head.totalScore ) {
        score = head.totalScore;
      } else {
        score = 0;
      }

      let nextWord = null;
      if (answer.nextWord) {
        nextWord = answer.nextWord;
      } else if (head.nextWord) {
        nextWord = head.nextWord;
      } else {
        nextWord = 'Loading next word...';
      }

      head = (head) ? head : {};

      let wordCorrectCount = (head.wordCorrectCount)
        ? head.wordCorrectCount
        : 'Loading correct count...';

      let wordIncorrectCount = (head.wordIncorrectCount)
      ? head.wordIncorrectCount
      : 'Loading incorrect count...';



      return (
          <section id='questionView'>
            <h1>{language}</h1>
            <h2>Translate the word:</h2>
            <span>
              <h3>{nextWord}</h3>
            </span>
        
            <main>
              <h4>Question Input Form</h4>
              {/* <form>
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
              </form> */}
    
              <span id='question-view_score-display'>
                <p>Your total score is: {score}</p>
                <p>You have answered this word correctly {wordCorrectCount} times.</p>
                <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
                </span>
            </main>
          </section>
      )
    }
    
}
