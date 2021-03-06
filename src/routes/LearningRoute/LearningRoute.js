import React, { Component } from 'react'
import AnswerView from '../../components/AnswerView/AnswerView';
import QuestionView from '../../components/QuestionView/QuestionView';
import UserContext from '../../contexts/UserContext';
import languageApiService from '../../services/language-api-service';
class LearningRoute extends Component {
  static contextType = UserContext;

  constructor(props){
    super(props);
    this.state = {
      questionView: true,
    }
  }

  async componentDidMount() {
    let head = await languageApiService.getNextWord();
    this.context.setHead(head)
  }

  toggleQuestionView = () => {
    this.setState({
      questionView: !this.state.questionView
    })
  }
  
  render() {

   let view = (this.state.questionView)
    ? <QuestionView toggleView={this.toggleQuestionView}/> 
    : <AnswerView toggleView={this.toggleQuestionView} />;
    
    return (
      <section id='learningView'>
        {view}
      </section>
      
    );
  }
}

export default LearningRoute;
