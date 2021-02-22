import config from '../config';
import TokenService from './token-service';

const languageApiService = {
    async getWords() {
        let response = await fetch(`${config.API_ENDPOINT}/language`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
          });
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        } else {
            let allWordData =  await response.json();
            return allWordData;
        }
    },

    async getNextWord() {
        console.log('getNextWord fired!')
        let response = await fetch(`${config.API_ENDPOINT}/language/head`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
          });
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        } else {
            let nextWordData =  await response.json();
            return nextWordData;
        }
    },
    async postGuess(guess){
        // validate 
        if (!typeof guess === 'string'){
            return Promise.reject(new Error('guess is not a string'))
        }

        // remove whitespace
        guess.trim();

        // fetch
        let response = await fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ guess })
        })
        .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });

        // validate && return
        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        } else {
            let guessResponse =  await response.json();
            return guessResponse;
        }
    }
}

export default languageApiService;