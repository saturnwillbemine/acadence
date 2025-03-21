'use client';
import { TextInput, Button, Container, Title, Paper, Stack, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';

// this would normally come from API
const exampleClassList = {
  classes: [
    {
      className: 'Class 1',
      deptName: 'C1',
      classDesc: 'This is class 1',
      classID: 10
    }
  ],
  nextId: 51
};

export default function CreateClass() {
  const router = useRouter();
  
  const form = useForm({
    initialValues: {
      className: '',
      deptName: '',
      classDesc: '',
    },
    validate: {
      className: (value) => (value.length < 2 ? 'Class name must be at least 2 characters' : null),
      deptName: (value) => (value.length === 0 ? 'Department name is required' : null),
      classDesc: (value) => (value.length < 10 ? 'Description must be at least 10 characters' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {

    // this is where i would normally make an API request
    console.log('Form submitted with values:', values);
    console.log('This would create a new class with ID:', exampleClassList.nextId);
    
    router.push('/dashboard');
  };

  return (
    <Container size="sm">
      <Title order={1} mb="lg" ta="center">Create New Class</Title>
      
      <Paper shadow="sm" p="xl" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Class Name"
              placeholder="Introduction to Computer Science"
              required
              {...form.getInputProps('className')}
            />

            <TextInput
              label="Department Name"
              placeholder="CS"
              required
              {...form.getInputProps('deptName')}
            />

            <Textarea
              label="Class Description"
              placeholder="Enter a detailed description of the class"
              required
              minRows={3}
              {...form.getInputProps('classDesc')}
            />

            <Button type="submit" color="myColor" fullWidth mt="md">
              Create Class
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
