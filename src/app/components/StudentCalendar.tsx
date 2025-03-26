'use client';
import { Indicator } from '@mantine/core';
import { Calendar, DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';

export default function StudentCalendar() {

  const dateRenderer: DatePickerProps['renderDay'] = (Date) => {
    const day = Date.getDate();
    return(
        <Indicator size={6} color='red' offset={-5} disabled={ day !== 1 }> 
            <div>{day}</div>
        </Indicator>
    ); // this gives us the indicator over the day of the month for every day not in the disabled prop, if its not in the array we get back we set it to disabled
  };

  return (
    <div>
        <Calendar maxLevel='month' minLevel='month' static renderDay={dateRenderer}/>
    </div>
  );
}