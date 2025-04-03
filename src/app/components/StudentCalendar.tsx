'use client';
import { Indicator } from '@mantine/core';
import { Calendar, DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';

interface AttendanceData {
  studentID: number;
  studentName: string;
  recordDate: string;
  studentStatus: string;
}

interface StudentCalendarProps {
  attendanceData: AttendanceData[];
}

const statusColors: Record<string, string> = {
  excused: 'orange',
  unexcused: 'red',
  late: 'yellow',
};

export default function StudentCalendar({ attendanceData = [] }: StudentCalendarProps) {
  const absenceDates = attendanceData.map(record =>  {
    const date = new Date(record.recordDate);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    

    return {
      date: date.toDateString(),
      status: record.studentStatus.toLowerCase()
    }

  }
  );

  const dateRenderer: DatePickerProps['renderDay'] = (Date) => {
    const day = Date.getDate()
    const attendance = absenceDates.find(abs => abs.date === Date.toDateString()); //looking for absences dates that match the Date
    const isAbsent = !!attendance;

    return(
        <Indicator size={6} 
        color={attendance ? statusColors[attendance.status] : 'gray'} 
        offset={-5} 
        disabled={ !isAbsent } > 
            <div>{day}</div>
        </Indicator>
    ); // this gives us the indicator over the day of the month for every day not in the disabled prop, if its not in the array we get back we set it to disabled
  };

  return (
    <div>
        <Calendar maxLevel='month' minLevel='month' renderDay={dateRenderer}/>
    </div>
  );
}