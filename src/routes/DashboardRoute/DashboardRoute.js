import config from '../../config';
import TokenService from '../../services/token-service';

import React, { Component } from 'react';

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

  render() {
    return (
      <section>
        api request
        Subtitle with language name
        button for 'start practicing'
        Words to Practice: 
         - list
         - list
         - list
      </section>
    );
  }
}

export default DashboardRoute
