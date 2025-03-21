'use client';
import { HiOutlineCheck, HiOutlineXMark, HiClock  } from 'react-icons/hi2';
import { ActionIcon, Avatar, Badge, Group, Table, Text, Tooltip } from '@mantine/core';

const data = [
  {
    name: 'Robert Wolfkisser',
    status: 'Present',
  },
  {
    name: 'Jill Jailbreaker',
    status: 'Present',
  },
  {
    name: 'Henry Silkeater',
    status: 'Present',
  },
  {
    name: 'Bill Horsefighter',
    status: 'Absent',
  },
  {
    name: 'Jeremy Footviewer',
    status: 'Late',
  },
];

const statusColors: Record<string, string> = {
  present: 'myColor',
  absent: 'red',
  late: 'yellow',
};

export default function StudentTable() {
  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src="https://cdn-icons-png.flaticon.com/256/4122/4122823.png" radius={30} />
          <Text fz="sm" fw={500}>
            {item.name}
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
          <Tooltip label='Mark Present'>
            <ActionIcon variant="subtle" color="myColor">
                <HiOutlineCheck size={16}/>
            </ActionIcon>
          </Tooltip>
          <Tooltip label='Mark Absent'>
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