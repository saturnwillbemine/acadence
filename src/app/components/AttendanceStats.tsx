'use client';

import dayjs from 'dayjs';
import { useState, useEffect} from 'react';
import { HiCalendarDateRange, HiChevronUp, HiChevronDown } from 'react-icons/hi2';
import { Group, Paper, Text, UnstyledButton, Tooltip } from '@mantine/core';
import classes from './module-css/AttendanceStats.module.css';
import requestAttendanceStats from '@/scripts/requestAttendanceStats';

export default function AttendanceStats({classID} : { classID : number}) {
  const [date, setDate] = useState(new Date(2025, 3, ));
  const [weeklyAbsences, setWeeklyAbsences] = useState(0);
  const [monthlyAbsences, setMonthlyAbsences] = useState(0);

  // fetch attendance stats whenever date changes
  useEffect(() => {
    const fetchStats = async () => {
      // for weekly stats
      const weekStart = dayjs(date).startOf('week').format('YYYY-MM-DD');
      const weekEnd = dayjs(date).endOf('week').format('YYYY-MM-DD');
      const weeklyData = await requestAttendanceStats(weekStart, weekEnd, classID);
      setWeeklyAbsences(weeklyData || 0);

      // for monthly stats
      const monthStart = dayjs(date).startOf('month').format('YYYY-MM-DD');
      const monthEnd = dayjs(date).endOf('month').format('YYYY-MM-DD');
      const monthlyData = await requestAttendanceStats(monthStart, monthEnd, classID);
      setMonthlyAbsences(monthlyData || 0);
    };

    fetchStats();
  }, [date]);

  const data = [
    { icon: HiCalendarDateRange, label: 'Absences This Week', value: weeklyAbsences },
    { icon: HiCalendarDateRange, label: 'Absences This Month', value: monthlyAbsences},
  ];


  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label} color='myColor'>
      <stat.icon size={32} className={classes.icon} />
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>{stat.value}</span> absences
        </Text>
      </div>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Tooltip label='Next Week'>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'week').toDate())}
        >
          <HiChevronUp size={16} className={classes.controlIcon} />
        </UnstyledButton>
        </Tooltip>

        <div className={classes.date}>
          <Text className={classes.day}>{dayjs(date).format('DD')}</Text>
          <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
        </div>

        <Tooltip label='Previous Week'>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'week').toDate())}
        >
          <HiChevronDown size={16} className={classes.controlIcon} />
        </UnstyledButton>
        </Tooltip>

      </div>
      <Group style={{ flex: 1}}>{stats}</Group>
    </div>
  );
}