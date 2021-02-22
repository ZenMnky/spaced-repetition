// import React, { Component } from 'react';
// import config from '../config'
// import TokenService from '../services/token-service';
// import languageApiService from '../services/language-api-service';

// const AppContext = React.createContext({    
//     nextWord: null,
//     totalScore: null,
//     wordCorrectCount: null,
//     wordIncorrectCount: null,
//     guess: '',
//     postGuess: () => {},
// })

// export default AppContext;

// export class AppProvider extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           nextWord: null,
//           totalScore: null,
//           wordCorrectCount: null,
//           wordIncorrectCount: null,
//           guess: '',
//         }
//     }

//     async componentDidMount(){
//         if (TokenService.hasAuthToken()){
//             await this.getNextWord();
//         }
//     }
    
//     async getNextWord(){
//         console.log('AppContext Mounted && getNextWord() fired.')

//         let jsonResponse =  await languageApiService.getNextWord();
        
//         this.setState({
//             nextWord: jsonResponse.nextWord,
//             totalScore: jsonResponse.totalScore,
//             wordCorrectCount: jsonResponse.wordCorrectCount,
//             wordIncorrectCount: jsonResponse.wordIncorrectCount
//         })
//     }

//     async postGuess(guess) {
//         let postGuessResponse = await languageApiService.postGuess(guess);

//         console.log('postGuessResponse: ', postGuessResponse)
//     }

//       render() {
//           const value = {
//             ...this.state,
//             postGuess: this.postGuess,
//           }
      
//         return (
//             <AppContext.Provider value={value} >
//                 {this.props.children}
//             </AppContext.Provider>


//         )
//       }
// }