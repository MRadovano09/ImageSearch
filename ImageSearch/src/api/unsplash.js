// here we put in all the code related to config of Axios or related to somehow getting data from Unsplash

import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization:
          "Client-ID 37a87c8572e6eeb375d2200077832b7d75ef2efaffc6e81842287fff9e8007ce"
      }
}); //this method is gonna create an instance of the axios' client with a couple of default properties. As the argument it uses an object with parameters;
