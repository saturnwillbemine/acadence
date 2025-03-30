'use client';
import Class from '@/app/components/ClassCard'
import { SimpleGrid } from '@mantine/core';
import requestProfClasses from '@/scripts/requestClasses';
import { useSession } from '@/scripts/userSessionStore';
import { useEffect, useState } from 'react';

const sampleClassData = [
  {
    className: 'Class 1',
    deptName: 'C1',
    classDesc: 'This is class 1',
    classID: 10
  },
  {
    className: 'Class 2',
    deptName: 'C2',
    classDesc: 'This is class 2',
    classID: 20
  },
  {
    className: 'Class 3',
    deptName: 'C3',
    classDesc: 'This is class 3',
    classID: 30
  },
  {
    className: 'Class 4',
    deptName: 'C4',
    classDesc: 'This is class 4',
    classID: 40
  },
  {
    className: 'Class 5',
    deptName: 'C5',
    classDesc: 'This is class 5',
    classID: 50
  },
]

export default function Dashboard() {

  interface ClassData {
    className: string;
    classDept: string;
    classDesc: string;
    classID: number;
  }
  
  const [classData, setClassData] = useState<ClassData[]>([])
  const professorID = useSession((state) => state.professorID)

  useEffect(() => {
    console.log('Current session state:', useSession.getState()); //debugging session state

    const getClasses = async () => {
      const data = await requestProfClasses(professorID)
      const classArray = Object.values(data) as ClassData[] //convert to array to use .map
      setClassData(classArray)
    }
    getClasses()
  }, [professorID]) // makes it rerender for every new professorID

  const classCardGrid = classData.map((card, index) => (
    <div key={index}>
      <Class
        className={card.className}
        deptName={card.classDept}
        classDesc={card.classDesc}
        classID={card.classID}  
      />
    </div>
    ));

  return (
    <SimpleGrid cols={4} spacing='sm'>
      {classCardGrid}
    </SimpleGrid>
  );
}
