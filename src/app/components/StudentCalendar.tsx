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
    );
  };

  return (
    <div>
        <Calendar static renderDay={dateRenderer}/>
    </div>
  );
}