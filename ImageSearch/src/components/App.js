import React from "react";
// import axios from "axios";     //nepotrebno jer smo outsourceali axios u unsplash.js
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App extends React.Component {
  state = { images: [] }; //initializing state here that will take the response from Unsplash as an array. We have to anticipate what kind of data we'll get, so when we expect arrays or objs, we initialize an empty arr or obj here instead of null for numbers and '' for strings

  onSearchSubmit = async term => {
    //we put ASYNC keyword here so we can use asynchronous keywords like 'await' (asynchronous JS)
    // console.log(`SEARCH SUBMITTED: ${term}`) // Now we're gonna make an API request to unsplash w/ axios to console log our search results
    // We're making a GET request with axios
    // 1st arg - the address we're making the request to. 2nd - an object that'll have a bunch of options that will customize the request. The root address can be found on Unsplash under Schema -> Location. Then we look into Authorization -> public Actions so we actually get authorized in making requests
    const response = await unsplash.get("/search/photos", {
      params: { query: term } // Unsplash.com -> Documentation -> Search Photos -> Parameters
    });
    //console.log(response.data.results); //So after we get the async response with results, we wanna set it in our component state which will cause the comp to rerender and then we can print out the response.

    this.setState({ images: response.data.results }); // updating this state prop with response image array will cause our App to rerender :D BUT, if onSearchSubmit ISN'T an arrow function (async onSearchSubmit (terms) {...}) it will throw out a massive error because the 'this' will refer to the props obj 'onSubmit' we passed into the SearchBar instead of this function right here. So the 'this' will be the onFormSubmit f() in SearchBar.js. Fucking crazy.
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images}/>
      </div>
    );
  }
}

export default App;

/*
//////////////////////////////
COMMUNICATING CHILD TO PARENT:
//////////////////////////////

So, when we enter our info and submit it into our search bar, the point of that component is basically to receive that info, NOT to process it (modularity). It's logical that the actual API request and processing of the submittal should be handled by the app itself. We'll basically code a way for the SearchBar to pass the search info back to this component

WE'RE NOT GONNA USE PROPS FOR THAT:

Props system only allows us to pass information from the parent component down to a child:

                          ImageList
              APP ------>
                          SearchBar

SOLUTION:   this.onSearchSubmit

Turn the App component into a class based component and then in it we're gonna define a callback method called onSearchSubmit. Then, whenever the app component decides to show our search bar it's gonna pass that callback as a callback method or as a prop down to the search bar and the search bar is going to hold onto that method. Then, any time that the user submits the form, it's going to take that callback it was given and it's going to call it with whatever the search term was.

The 'onSubmit' prop in the <SearchBar /> -> Irrelevant if that's what it's called in these html react elements, but in VANILLA html elements, it has to be called OnSubmit or onChange...

<SearchBar onSubmittingInfo = {this.onSearchSubmit}  />     FINE
<form onSubmitttingInfo = {this.onSearchSubmit} />  NO!!! - must be called onSubmit




//////////////
FETCHING DATA
//////////////


                             -----> 'send me data about pics for cars' --->  
OUR APP --->  AJAX CLIENT-->                                                UNSPLASH API
                             <----------'here you go!' <-------------------

We're basically making an AJAX request to the Unsplash API. The API will send us a big list of
JSON records, which are gonna contain information about a bunch of different pictures matching our search request. We then take that JSON and use it to render a big list of images on the screen.

unsplash.com/developers

When you create the app there, you will get the API access key

Go to Documentation -> Search Photos for more info.


//////////////////
AXIOS VS. FETCH
//////////////////

React only renders and handles our components, but it's the job of a separate piece of code to make requests to API's (Ajax Client)

Components usually used in React applications:

axios - 3rd party package (installed via npm - we will use it)
fetch - function built into modern browsers - slimmer but far more basic component for using data. Requires writing a lot more code.

INSTALLING AXIOS:

Terminate project (CTRL + C)

Run 'npm install --save axios'

Restart server w/ 'npm start'

import axios from 'axios';



///////////////////////////////////
HANDLING REQUESTS WITH ASYNC AWAIT
//////////////////////////////////

THE PROCESS OF GETTING THE IMAGE

Component renders itself once with no list of images -> onSearchSubmit method called -> Request made to unsplash.com -> waaaait...  -> Request complete -> set image data on state of App component -> App component rerenders and shows images


HOW TO SEE THE RESULTS - two ways - below is the more complicated way with the 'then' method, which returns a PROMISE. The other in the actual code is called ASYNC

1) Promise
----------------------
onSearchSubmit(term) {
    // console.log(`SEARCH SUBMITTED: ${term}`) // Now we're gonna make an API request to unsplash w/ axios to console log our search results
    // We're making a GET request with axios
    // 1st arg - the address we're making the request to. 2nd - an object that'll have a bunch of options that will customize the request. The root address can be found on Unsplash under Schema -> Location. Then we look into Authorization -> public Actions so we actually get authorized in making requests
    axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term }, // Unsplash.com -> Documentation -> Search Photos -> Parameters
      headers: {
        Authorization:
          'Client-ID 37a87c8572e6eeb375d2200077832b7d75ef2efaffc6e81842287fff9e8007ce'
      } 
    }).then( (response) => { //this arrow f() is a callback that will be invoked w/ whatever data that we get from the Unsplash API.
      console.log(response.data.results); //we get basically an object called response and we take a look at it in the console and then just decide to log some of its properties (namely, the actual results of the search, not other params)
    });
  } //To check if GET works, open console, go to Network, make a request and check if you got photos?query=cars. Go to preview and see how much data was fetched 
  // To get a notification when the request is completed we have two different options //each time we make a request with Axios we get returned an object called promise that taps us on the shoulder and tells us the request is completed.
-------------------------



//////////////////////////////////////
// SETTING STATE AFTER ASYNC REQUESTS
//////////////////////////////////////

So after we get the async response with results, we wanna set it in our component state which will cause the comp to rerender and then we can print out the response.







*/
