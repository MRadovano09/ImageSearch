import "./ImageList.css";
import ImageCard from "./ImageCard";
import React from "react";

const ImageList = props => {
  //console.log(props.images);

  const images = props.images.map(image => {
    //we console logged the image results and then figured the property path that would allow the rendering of the regular versions of image URLS contained as props within the received objs.
  return <ImageCard key={image.id} image={image} />;
  });

  return <div className="image-list"> {images} </div>;
};

// when you have LISTS (like the imageList) it's important to assign KEYS to each of the element so that the whole rendering of those lists performs better and is less prone to error. And since our image response already features its own ID gotten from unsplash, we just basically equate this ID to the key of the image. We could have also attached the key to a new div around the img and not to the img itself

export default ImageList;

/*    MAPS   REVISION 

// let's try making a new array with modified elements of the first array:

const numbers = [0, 1, 2, 3, 4];

1) 
let newNumbers = [];

for (let i = 0; i < numbers.length; 1++) {
    newNumbers.push(numbers[i] * 10);
}

This is what a MAP statement does essentially. It returns a brand new array.

2) Map array
numbers.map( (num) => {
    return num * 10;
})


3) Or, shortened:

numbers.map( (num) => num * 10)

console.log(numbers, num);



-------------------------------------------

AND NOW SMTH MORE REACTY!

const numbers = [0, 1, 2, 3, 4];

numbers.map(num => <div> {num} </div>)




VERSION BEFORE IMAGELIST

const ImageList = props => {
  //console.log(props.images);

  const images = props.images.map(image => {
    //we console logged the image results and then figured the property path that would allow the rendering of the regular versions of image URLS contained as props within the received objs.
    return <img key={image.id} alt={image.description} src={image.urls.regular} />;
  });

  return <div className="image-list"> {images} </div>;
};





*/
