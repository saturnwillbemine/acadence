'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { HiMiniTruck } from 'react-icons/hi2';
import { colorsTuple, Group, Paper, Text, UnstyledButton } from '@mantine/core';
import classes from './module-css/AttendanceStats.module.css';

const data = [
  { icon: HiMiniTruck, label: 'Absences This Week' },
  { icon: HiMiniTruck, label: 'Absences This Month' },
];

export default function AttendanceStats() {
  const [date, setDate] = useState(new Date(2025, 3, ));

  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label} color='myColor'>
      <stat.icon size={32} className={classes.icon} />
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>#</span> of absences
        </Text>
      </div>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'month').toDate())}
        >
          <HiMiniTruck size={16} className={classes.controlIcon} />
        </UnstyledButton>

        <div className={classes.date}>
          <Text className={classes.day}>{dayjs(date).format('DD')}</Text>
          <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
        </div>

        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'month').toDate())}
        >
          <HiMiniTruck size={16} className={classes.controlIcon} />
        </UnstyledButton>
      </div>
      <Group style={{ flex: 1}}>{stats}</Group>
    </div>
  );
}