'use client';
import { HiOutlineCheck, HiOutlineXMark, HiClock  } from 'react-icons/hi2';
import { ActionIcon, Avatar, Badge, Group, Table, Text, Tooltip } from '@mantine/core';
import { useState, useEffect } from 'react';
import requestRoster from '@/scripts/requestRoster';


const statusColors: Record<string, string> = {
  present: 'myColor',
  excused: 'orange',
  unexcused: 'red',
  late: 'yellow',
};

interface StudentAttendanceData {
  studentID: number;
  studentName: string;
  status: string;
}


export default function StudentAttendance({ classID }: { classID: number }) {
  const [attendanceData, setAttendanceData] = useState<StudentAttendanceData[]>([]);

  useEffect(() => {
    const fetchRoster = async () => {
      const data = await requestRoster(classID);
      setAttendanceData(data);
    }
    fetchRoster();
  }, [classID])

  const rows = attendanceData.map((item) => (
    <Table.Tr key={item.studentID}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src="https://cdn-icons-png.flaticon.com/256/4122/4122823.png" radius={30} />
          <Text fz="sm" fw={500}>
            {item.studentName}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={statusColors[item.status.toLowerCase()]} variant="light">
          {item.status}
        </Badge>
        
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Tooltip label='Mark Excused Absence'>
            <ActionIcon variant="subtle" color="myColor">
                <HiOutlineCheck size={16}/>
            </ActionIcon>
          </Tooltip>
          <Tooltip label='Mark Unexcused Absence'>
            <ActionIcon variant="subtle" color="red">
                <HiOutlineXMark size={16}/>
            </ActionIcon>
          </Tooltip>
          <Tooltip label='Mark Late'>
            <ActionIcon variant="subtle" color="yellow">
                <HiClock size={16}/>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Student</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}