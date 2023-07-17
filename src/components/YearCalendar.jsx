import React from 'react';
import Calendar from './Calendar';

const YearCalendar = ({ contributionData }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="grid grid-cols-3 gap-8 ">
      {/* {months.map((month, index) => (
        <Calendar
          key={index}
          contributionData={contributionData}
          month={index}
          year={2023} // Specify the desired year here
        />
      ))} */}
      <div className='w-[80%] h-[80vh]'>
        <h1 className='text-8xl leading-tight'>Coming Soon 🚀</h1>
      </div>
    </div>
  );
};

export default YearCalendar;
