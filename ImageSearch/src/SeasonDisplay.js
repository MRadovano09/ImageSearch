import './SeasonDisplay.css'
import React from 'react';




const getSeason = (lat, month) => {
    if (month > 2 && month < 9 ) { //after March and before October
        return lat > 0 ? 'summer' : 'winter'; //if lat is less than zero, we're in the souther hemisphere and it will return 'winter'
    } else {
        return lat > 0 ? 'winter' : 'summer';
    }
}


const seasonConfig = {
    summer: {
        text: "Let's hit the beach!",
        iconName: "sun"
    },
    winter: {
        text: "Burr it is cold",
        iconName: "snowflake"
    }
}

const SeasonDisplay = (props) => {
    console.log(props.lat);
    const season = getSeason(props.lat, new Date().getMonth());
    const { text, iconName } = seasonConfig[season]; // {text, iconName} - we're destructuring here

    /*const text = season === 'winter' ? "Burr, it is chilly" : "Let's hit the beach"
    const icon = season === 'winter' ? 'snowflake' : 'sun'; */ //the icon is from Semantic UI -> icons, "snowflake" and "sun" are code for it

    return (
        <div className={`season-display ${season}`}>
            <i className={`icon-left massive ${iconName} icon`} />
        <h1>{text}</h1>
            <i className={`icon-right massive ${iconName} icon`} />
        </div>
    );
}


export default SeasonDisplay;


// new Date().getMonth()  -> how to get the month. It's a zero index date so add +1

// basically it gives us <i className="sun icon">