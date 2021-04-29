import axios from 'axios';

const instanceAPI = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Client-ID -5fSvexbpJRiYHEIdw4Cz1N8HlxKmZb6OyBVAAY_ek8',
    },
});

export default instanceAPI;
