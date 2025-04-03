'use client';
import { HiOutlineCheck, HiOutlineXMark, HiClock  } from 'react-icons/hi2';
import { ActionIcon, Avatar, Badge, Group, Table, Text, Tooltip, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import requestRoster from '@/scripts/requestRoster';
import { useSession } from '@/scripts/userSessionStore';
import requestSubmitAttendance from '@/scripts/requestSubmitAttendance';
import { notifications } from '@mantine/notifications';


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
  const [attendanceLists, setAttendanceLists] = useState({
    excused: [] as number[],
    unexcused: [] as number[],
    late: [] as number[]
  });
  const professorID = useSession((state) => state.professorID);


   const fetchRoster = async () => {
      const data = await requestRoster(classID);
      setAttendanceData(data);
    }

  useEffect(() => {
    fetchRoster();
  }, [classID])

  const handleAttendanceClick = (studentID: number, status: 'excused' | 'unexcused' | 'late') => {
    setAttendanceLists(prev => {
      // remove from all lists first
      const newLists = {
        excused: prev.excused.filter(id => id !== studentID),
        unexcused: prev.unexcused.filter(id => id !== studentID),
        late: prev.late.filter(id => id !== studentID)
      };
      
      // add to selected list if not already there
      if (!prev[status].includes(studentID)) {
        newLists[status].push(studentID);
      }
      
      return newLists;
    });
  };

  const handleSubmit = async () => {
    const success = await requestSubmitAttendance(attendanceLists, classID, professorID);
    if (success) {
      setAttendanceLists({
        excused: [],
        unexcused: [],
        late: []
      });
      fetchRoster(); // refresh the roster
    }
  };

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
            <ActionIcon variant="subtle" 
            color={attendanceLists.excused.includes(item.studentID) ? 'orange' : 'gray'}
            onClick={() =>  { handleAttendanceClick(item.studentID, 'excused');
                              notifications.show({title: 'Attendance Update',
                              message: `${item.studentName} ${attendanceLists.excused.includes(item.studentID) ? 'removed from' : 'added to'} excused list`,
                              color: 'orange'}) }}>
                <HiOutlineCheck size={16}/>
            </ActionIcon>
          </Tooltip>
          <Tooltip label='Mark Unexcused Absence'>
            <ActionIcon variant="subtle" 
            color={attendanceLists.unexcused.includes(item.studentID) ? 'red' : 'gray'}
            onClick={() => { handleAttendanceClick(item.studentID, 'unexcused');
              notifications.show({title: 'Attendance Update', 
              message: `${item.studentName} ${attendanceLists.unexcused.includes(item.studentID) ? 'removed from' : 'added to'} unexcused list`,
              color: 'red'}) }}>
                <HiOutlineXMark size={16}/>
            </ActionIcon>
          </Tooltip>
          <Tooltip label='Mark Late'>
            <ActionIcon variant="subtle" 
            color={attendanceLists.late.includes(item.studentID) ? 'yellow' : 'gray'}
            onClick={() => { handleAttendanceClick(item.studentID, 'late');
              notifications.show({title: 'Attendance Update', 
              message: `${item.studentName} ${attendanceLists.late.includes(item.studentID) ? 'removed from' : 'added to'} late list`,
              color: 'yellow'}) }}>
                <HiClock size={16}/>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
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
    <Group justify="flex-end" mt="md">
      <Button color='myColor' onClick={() => console.log('These are the lists: ', attendanceLists)}> 
        Check Attendance Lists</Button>
        <Button
          onClick={handleSubmit}
          color='myColor'
          disabled={!Object.values(attendanceLists).some(list => list.length > 0)}>
          Submit Attendance
        </Button>
      </Group>
    </>
  );
}