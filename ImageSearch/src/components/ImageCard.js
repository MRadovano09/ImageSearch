import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0 };

    this.imageRef = React.createRef();  //This line says that whenever the ImageCard gets rendered, React creates a separate reference for each and calls it imageRef. Then, down below in the code, when this reference gets LOADED ('event listener'), the callback function called setSpans will be called which will readjust the pic size.
  }

  componentDidMount() {
    // 1) Let the ImageCard render itself and its image ---> 2) Reach into the DOM and figure out the height of the image
    // console.log(this.imageRef); // we get a console log for each of the received 10 imgs, can see their height
    // console.log(this.imageRef.current.clientHeight) // WILL GIVE US ZERO PIXs - bcs we console log the height BEFORE the pics have had the chance to download
    // componentDidMount is too early a lifecycle stage for us to get clientHeight from it. We have to access the height somehow only after it's become available.
    //we do it with this:

    this.imageRef.current.addEventListener("load", this.setSpans); //we're gonna hafta write this callback function as an arrow function because of the ES5's tendency to confuse the 'this' context
    //this action tells to apply the function of setSpans() after the element loads
  }

  setSpans = () => {
    //console.log(this.imageRef.current.clientHeight); 

    const height = this.imageRef.current.clientHeight;

    const spans = Math.ceil(height / 10) // 150 nam je assigned grid row width u CSS-u

    this.setState({ spans: spans}) //this causes the app to rerender with new image heights. Crucial, and why we use state here
  }

  render() {
    const { description, urls } = this.props.image; //destructuring, prije smo dolje morali napisati tipa src={this.props.image.urls.regular}

    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img alt={description} ref={this.imageRef} src={urls.regular} />
      </div>
    );
  }
} //'ref' here is a JSX tag, not a DOM element, and that's the best way to tag these JSX elements that are gonna be produced in HTML

//this app expects to be passed a prop of our image object or the thing that we got back UnsplashAPI as a prop called image.

export default ImageCard;

/* THE PURPOSE OF THE IMAGECARD.js COMPONENT


1) Let the ImageCard render itself and its image ---> 2) Reach into the DOM and figure out the height of the image ---> 3) Set the image height on state to get the component to rerender  ---> 4) When rerendering, assign a 'grid-row-end' to make sure the image takes up the appropriate space



Selecting imgs in Vanilla JS
------------------------------

i.e. typing into the console: 

document.querySelector('img').clientHeight   
- gives you the info how much pixels the image needs to render in its height


Selecting imgs in React 
-----------------------

We use a React system called 'ref', short for reference, ofc


//////////////////////
//  REACT RFS
//////////////////////

- Gives access to a single DOM element that is rendered by a component

- We create refs in the constructor, assign them to instance variables, then pass to a particular JSX element as props





*/
