import React from "react";

//This component will be a class because user input that will be input demands that we use states.
class SearchBar extends React.Component {
 /* onInputChange(event) {
    //this argument is a normal JS object that contains information about the event that just occurred and necessary with event handling functions
    //funkcija koja će se brinuti za event handlanje inputa
    console.log(event.target.value); //this property takes whatever is input into it 
  } */

  state = { term: ""}

  onInputClick() {
    console.log("input was clicked");
  }
  // onChange je prop koji radi callback onInputChange funkcije i koji će se updejtat kad god je nešto utipkano. NEĆEMO to napisati kao {onInputChange()} jer bi to prizivalo funkciju nakon svakog rendera

  onFormSubmit = (event) => {
      event.preventDefault(); //this will keep the component from processing the form and refreshing the page automatically. Will be used often in personal projects
      //console.log(this.state.term) // - this will cause an error if not inside an arrow function, the reason why in the comments below!
      this.props.onSubmit(this.state.term); //inside a class-based instead of a function based component, when we use props, we have to reference them with a 'this'. Crucial line - it basically calls the onSearchSubmit() from our App with our search term which is the 'term' in our state.
  
    };


  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}> 
          <div className="field">
            <label>Image Search</label>
            <br />
            <input
              type="text"
              onClick={this.onInputClick}
              onChange={(event) => this.setState( {term: event.target.value} ) }
              value={this.state.term}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;

//Some prop names we use for event handling that signal when it's time for callback:

/* onClick - when user clicks on smth - everything can be clicked so can be 'wired' to anything
onChange - when user changes text in an input - can be attached to html components that ARE suitable for receiving input
onSubmit - when user submits a form
IT MATTERS THEY'RE CALLED THAT WAY


NAMING CONVENTION for callback functions for event handling:

on - standard beginning
input - type of element that's being modified
change - tells us of the action


ALTERNATE SYNTAX:

 onChange={(event) => console.log(event.target.value)}

 // when we have a single thing that we want to occurr, we use this syntax instead of defining a separate method in the class



 CONTROLLED VS UNCONTROLLED ELEMENT

 - we will have to convert our search bar into a controlled element for this lesson 
 - we do it by adding 'value' and equating it to this.state.term and by updating State on onChange. The state gets updated via the callback





 INPUT FLOW:

 a) User types in input
 b) callback gets invoked
 c) We call setState w/ the new value
 d) Component rerenders
 e) Input is told what its value is (coming from state) - whatever is assigned to the value property is what the input will show

We turned the search bar into a controlled environment because then we have the value inside our React component, before we had to do DOM manipulation to extract 'value' from the HTML document
We do not like to store our data within HTML elements. WE wanna centralize all the information within the REact component.
Now, the value is stored within our state object. We override value that was already input with value = this.state.term, but that's how we compartmentalize info here


HANDLING FORM SUBMITTAL:

Generally, by default, when you press enter on a form, the data gets sent back-end to a server, but the thing is that it also refreshes the page. Here, we have to disable that behavior
(we're using onSubmit={this.onFormSubmit} here)


///////////////////
THE 'THIS' KEYWORD
///////////////////
console.log(this.state.term) inside onFormSubmit gives us a NASTY ERROR (cannot read property 'state' of undefined). This will be the most common error in React projects.


Instance of SearchBar
-----------------------

state
render
onFormSubmit


this -> this means give me a piece of code inside SearchBar. It's a reference back to the class itself that you're writing code in.

-------------------------------------------------
How is the value of 'this' determined in a function? Let's have an example:

1) 

class Car {
    setDriveSound(sound) {
        this.sound = sound
    }

    drive() {
        return this.sound
    }
}

const car = new Car()
car.setDriveSound('vroom');
car.drive(); -> Basically this.sound will be equal to car.sound here! not to Car.sound

To determine 'this' in JS, you don't look AT the function, you look at where it's CALLED.


2)
const truck = {
    sound: 'putputput',
    driveMyTruck: car.drive
}

truck.driveMyTruck()   -> the this.sound will be truck.sound -> so you'll get 'putputput'


3)
const drive = car.drive; -> This would be undefined!

drive() -> 'cannot read property of undefined' -> there is no context for this.sound, so the app doesn't know which sound to fetch



SOLUTIONS

1)


class Car {
  constructor() {     //no need for super() bcs class isn't extending anything
  this.drive = this.drive.bind(this); -
  }
}





-------------------------------------------------------------------
ONE MORE FUCKING TIME.


class Car {
  setDriveSound(sound) {
    this.sound = sound
  }

  drive() {
    return this.sound

  }
}


const car = new Car();
car.setDriveSound('vroom');
car.drive();  // vroom


const drive = car.drive;
drive() // UNDEFINED =>   when you console log this.state.term  in onFormSubmit(), you get the same error




SOLUTIONS
///////////


1) THE BIND THIS - now a bit more legacy
----------------

class Car {

  constructor() {
    this.drive = this.drive.bind(this)
  }


  setDriveSound(sound) {
    this.sound = sound
  }

  drive() {
    return this.sound

  }
}


const car = new Car();
car.setDriveSound('vroom');
car.drive();  // vroom


const drive = car.drive;
drive()


2) ARROW FUNCTIONS
--------------------

 TURNING THE onFormSubmit into an ARROW FUNCTION, this is how it looked like before:

 onFormSubmit(event) {
      event.preventDefault(); 
      console.log(this.state.term) 
  
    }

    Basically, shorthand syntax for 
    
    onFormSubmit: function(event) {

    } 

    The problem is the old ES5 syntax has a problem with this.binding in function keywords, so the way to avoid that is to use ARROW FUNCTIONS as their special feature is that they automatically bind the value of this for all the code inside the function. So it essentially becomes

    onFormSubmit = (event) => {
      event.preventDefault(); //this will keep the component from processing the form and refreshing the page automatically. Will be used often in personal projects
      console.log(this.state.term) // - this will cause an error if not inside an arrow function, the reason why in the comments below!
     
  
    }



3) CREATING AN ANONYMOUS FUNCTION THAT INVOKES A FUNCTION:
-----------------------------------------------------------

<form className="ui form" onSubmit={this.onFormSubmit}>

Becomes:
<form className="ui form" onSubmit={ (event) => this.onFormSubmit(event) }>


can be shortened as <form className="ui form" onSubmit={ e => this.onFormSubmit(e) }>   // e -> event, and you need a parenthesis with 1 arg only


Why does 'this' work inside render() but not onFormSubmit():
The important thing to understand here is that how the underlying value of 'this' changes when invoked from different execution contexts in a core JavaScript runtime environment. In case of render method, 'this' keyword is called out inside the execution context of the component itself. Hence, the 'this' keyword points to the component class itself. However, since "onFormSubmit" happens to be a callback event which is slated to be invoked sometime in the future upon form submittal, it is invoked in some different execution context where the 'this' keyword points to 'undefined'.





*/
