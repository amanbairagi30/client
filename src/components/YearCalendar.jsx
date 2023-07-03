import React from 'react'
import Calendar from './Calendar';

const YearCalendar = () => {
    const currYear = new Date().getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    return (
        <div>
            <h1>Year Calendar {currYear}</h1>
            {Array.from({ length: 12 }, (_, index) => (
                <Calendar key={index} year={currYear} month={index} />
            ))}
        </div>
    );
};


export default YearCalendar
