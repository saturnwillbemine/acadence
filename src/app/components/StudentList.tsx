'use client';
import { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiMagnifyingGlass, HiMiniMinus } from 'react-icons/hi2';
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Indicator,
  Radio,
} from '@mantine/core';
import { Calendar, DatePickerProps } from '@mantine/dates'
import classes from './module-css/StudentList.module.css'

// interface describing the structure of each student row
interface RowData {
  name: string;
  class: string;
}

// interface for the table header props
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

// component for rendering sortable table headers with icons
function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? HiChevronUp : HiChevronDown) : HiMiniMinus;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

// filters the data array based on search input returns rows that match the search query in any field
function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

// sorts the data array based on the selected column and direction and also applies any active search filters
function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
    {
      name: 'Yuan Cheng',
      class: 'Class 1',
    },
    {
      name: 'Caitlin Frazer',
      class: 'Class 1',
    },
    {
      name: 'Ham Burger',
      class: 'Class 1',
    },
    {
      name: 'Noelle Paimboeuf',
      class: 'Class 1',
    },
    {
      name: 'Ophelia Lagacé',
      class: 'Class 1',
    },
    {
        name: 'Yakha Melikov',
        class: 'Class 2',
      },
      {
        name: 'Havin van Koolwijk',
        class: 'Class 2',
      },
      {
        name: 'Tetsu Oyokawa',
        class: 'Class 2',
      },
      {
        name: 'Spartacus Yermakov',
        class: 'Class 2',
      },
      {
        name: 'Martin Anton',
        class: 'Class 2',
      },
  ];

export default function StudentListSort() {

  // state for managing search input
  const [search, setSearch] = useState('');

  // state for storing the sorted/filtered data
  const [sortedData, setSortedData] = useState(data);

  // state for tracking which column is being sorted
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);

  // state for tracking sort direction
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // state for tracking selected row
  const [selection, setSelection] = useState<string>('');

  // toggles selection of a single row by student name
  const toggleRow = (name: string) =>
    setSelection((current) => current === name ? '' : name);

  // handles column sorting when clicking table header icons
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  // handles search input changes and updates filtered data
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name} className={selection === row.name ? classes.rowSelected : ''}>
      <Table.Td>
        <Radio
          checked={selection === row.name}
          onChange={() => toggleRow(row.name)}
        />
      </Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.class}</Table.Td>
    </Table.Tr>
  ));
  
  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<HiMagnifyingGlass size={16} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={40} />
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'class'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('class')}
            >
              Class
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length + 1}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <UnstyledButton onClick={() => console.log(selection)}> 
        Print Selection
      </UnstyledButton>
    </ScrollArea>
  );
}