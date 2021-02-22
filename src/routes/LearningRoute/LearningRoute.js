import React, { Component } from 'react'
import QuestionView from '../../components/QuestionView/QuestionView';

import config from '../../config';
import AppContext from '../../contexts/AppContext';
import TokenService from '../../services/token-service';

class LearningRoute extends Component {
  static contextType = AppContext;

  constructor(props){
    super(props);
    this.state = {
      questionView: true,
    }
  }

  toggleQuestionView = () => {
    this.setState({
      questionView: !this.state.questionView
    })
  }
  
  

  


  render() {



   let view = this.state.questionView ? <QuestionView toggleQuestionView={this.toggleQuestionView}/> : 'Answer View';
    
    return (
      <>
        {view}
      </>
    );
  }
}

export default LearningRoute;
