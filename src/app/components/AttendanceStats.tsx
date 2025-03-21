'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { HiCalendarDateRange, HiChevronUp, HiChevronDown } from 'react-icons/hi2';
import { Group, Paper, Text, UnstyledButton, Tooltip } from '@mantine/core';
import classes from './module-css/AttendanceStats.module.css';

const data = [
  { icon: HiCalendarDateRange, label: 'Absences This Week' },
  { icon: HiCalendarDateRange, label: 'Absences This Month' },
];

export default function AttendanceStats() {
  const [date, setDate] = useState(new Date(2025, 3, ));

  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label} color='myColor'>
      <stat.icon size={32} className={classes.icon} />
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>#</span> absences
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