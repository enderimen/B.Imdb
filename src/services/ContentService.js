import axios from 'axios';

export default class ContentService {
    constructor() {
        this.apiKey = '6e7431f0';
        this.apiUrl = `http://www.omdbapi.com/?apiKey=${this.apiKey}`;
        this.httpClient = axios.create();
    }

    getContents(page, type = '') {
        return new Promise(resolve => {
            this.httpClient.get(`${this.apiUrl}&s=love&type=${type}&page=${page}`)
                .then(response => {
                    resolve(response.data.Search);
                });
        });
    }

    getContentDetail(imdbId) {
        return new Promise(resolve => {
            this.httpClient.get(`${this.apiUrl}&i=${imdbId}`)
                .then(response => {
                    resolve(response.data);
                });
        });
    }
}