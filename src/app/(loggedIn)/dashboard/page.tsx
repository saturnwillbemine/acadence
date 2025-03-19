import Class from '@/app/components/ClassCard'
import { SimpleGrid } from '@mantine/core';


export default function Dashboard() {
  return (
    <>
    <SimpleGrid cols={4} spacing='sm'>
      <div><Class/></div>
      <div><Class/></div>
      <div><Class/></div>
      <div><Class/></div>
      <div><Class/></div>
      <div><Class/></div>
      <div><Class/></div>
    </SimpleGrid>
    </>
  );
}
