import React from 'react'

const date = new Date();
const currMonth = date.getMonth();
const currYear = date.getFullYear();
const currDate = date.getDate();
const currDay = date.getDay();



const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const Calendar = ({ color, dbDate, completedData, contributionData }) => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let LastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
    let LastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()

    const datesOfLastMonth = Array.from(
        { length: firstDayOfMonth },
        (_, index) => LastDateOfLastMonth - firstDayOfMonth + index + 1
    );

    const isCurrentDate = (date) => {
        return date === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear();
    };

    return (
        <>
            <div className='m-2 mt-3 font-semibold shadow-slate-400 rounded-md px-2 py-[0.25rem] bg-white'>
                <h1 className='text-center text-black'>{currDate} {dbDate} {months[currMonth]} - {dayNames[currDay]}  {color}</h1>
            </div>
            <div className='grid grid-rows-7 grid-flow-col my-4 mx-2'>
                {datesOfLastMonth.map((date) => (
                    <div key={date} className={`invisible
                       text-center rounded-md m-1 w-[1.5rem]`}>
                        {date}
                    </div>
                ))}
                {Array(LastDateOfMonth)
                    .fill()
                    .map((_, dayIndex) => {
                        const calendarDate = dayIndex + 1;
                        const matchingContribution = contributionData.find(
                            (contribution) => {
                                const contributionDate = new Date(contribution.date).getDate();
                                return (
                                    contributionDate === calendarDate &&
                                    contribution.completedData >= 80
                                );
                            }
                        );

                        // const color = matchingContribution ? 'green' : 'gray';

                        return (
                            <div
                                key={dayIndex + 1}
                                className={`${matchingContribution ? `bg-green-500` : `bg-[#3e3e3e]`} text-center rounded-md m-1 w-[1.5rem]`}
                            >
                                {dayIndex + 1}
                            </div>
                        );
                    })}


            </div>
        </>
    )
}

export default Calendar
