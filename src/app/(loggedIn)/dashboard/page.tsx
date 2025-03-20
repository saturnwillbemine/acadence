import Class from '@/app/components/ClassCard'
import { SimpleGrid } from '@mantine/core';

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

 const classCardGrid = sampleClassData.map((card, index) => (
    <div key={index}>
      <Class
        className={card.className}
        deptName={card.deptName}
        classDesc={card.classDesc}
        classID={card.classID}
      />
    </div>
    ));


export default function Dashboard() {
  return (
    <>
    <SimpleGrid cols={4} spacing='sm'>
      {classCardGrid}
    </SimpleGrid>
    </>
  );
}
