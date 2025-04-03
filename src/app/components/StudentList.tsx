'use client';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
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
  Radio,
} from '@mantine/core';
import classes from './module-css/StudentList.module.css'
import requestAllStudents from '@/scripts/requestAllStudents';

// interface describing the structure of each student row
interface RowData {
  studentName: string;
  className: string;
}

// interface for the table header props
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

// component for rendering re-sortable table headers with icons
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
    Object.values(item).some((value) => 
      String(value).toLowerCase().includes(query)
    )
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


export default function StudentListSort({ professorID, setSelection, selection } : 

  {professorID : number, 
  setSelection: Dispatch<SetStateAction<string>>, 
  selection: string }) {

   const [rowData, setRowData] = useState<RowData[]>([]);
  
     const fetchAllStudents = async () => {
        const data = await requestAllStudents(professorID);
        setRowData(data);
      }

    useEffect(() => {
      fetchAllStudents();
    }, [professorID])

  // state for managing search input
  const [search, setSearch] = useState('');

  // state for storing the sorted/filtered data
  const [sortedData, setSortedData] = useState<RowData[]>([]);

  // state for tracking which column is being sorted
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);

  // state for tracking sort direction
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(sortData(rowData, { sortBy, reversed: reverseSortDirection, search }));
  }, [rowData, sortBy, reverseSortDirection, search]);

  // toggles selection of a single row by student name
  const toggleRow = (name: string) =>
    setSelection((current) => current === name ? '' : name);

  // handles column sorting when clicking table header icons
  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(rowData, { sortBy: field, reversed, search }));
  };

  // handles search input changes and updates filtered data
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(rowData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.studentName} className={selection === row.studentName ? classes.rowSelected : ''}>
      <Table.Td>
        <Radio
          checked={selection === row.studentName}
          onChange={() => toggleRow(row.studentName)}
        />
      </Table.Td>
      <Table.Td>{row.studentName}</Table.Td>
      <Table.Td>{row.className}</Table.Td>
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
              sorted={sortBy === 'studentName'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('studentName')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'className'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('className')}
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
              <Table.Td colSpan={2}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}