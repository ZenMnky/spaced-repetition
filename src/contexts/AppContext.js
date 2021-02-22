import React, { Component } from 'react';
import config from '../config'
import TokenService from '../services/token-service';

const AppContext = React.createContext({    
    nextWord: null,
    totalScore: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
    guess: '',
})

export default AppContext;

export class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
          nextWord: null,
          totalScore: null,
          wordCorrectCount: null,
          wordIncorrectCount: null,
          guess: '',
        }
      }

      async componentDidMount(){
        await this.getNextWord();
      }
    
      async getNextWord(){
        console.log('component mounted. getNextWord() fired.')
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
          const value = {
            ...this.state,
          }
      
        return (
            <AppContext.Provider value={value} >
                {this.props.children}
            </AppContext.Provider>


        )
      }
}