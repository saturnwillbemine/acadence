'use client';
import { TextInput, Button, Container, Title, Paper, Stack, Textarea, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import requestClassCreation from '@/scripts/requestClassCreation';
import { useSession } from '@/scripts/userSessionStore';

export default function CreateClass() {

  const professorID = useSession((state) => state.professorID)

  const router = useRouter();

  const classSchema = z.object({
    className: z.string({
      required_error: "Class Name must not be empty"
    }).max(50, {message: "Class Name exceeds 50 characters"}),
    deptName: z.enum(['CS', 'MATH', 'HIST', 'KIN', 'POLI', 'BIO', 'ENG'], {message: "Department Name must be selected"}),
    classDesc: z.string().max(90, {message: "Description exceeds 90 characters"})
  });
  
  const classForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      className: '',
      deptName: '',
      classDesc: '',
    },
    validate: zodResolver(classSchema)
  });

   const submitClassForm = async (values: any) => {
      const success = await requestClassCreation(professorID, values.className, values.deptName, values.classDesc);
      if (success) {
        console.log('Form values:', values);
        router.push('/dashboard')
      }
    };

  return (
    <Container size="sm">
      <Title order={1} mb="lg" ta="center">Create New Class</Title>
      
      <Paper shadow="sm" p="xl" withBorder>
        <form onSubmit={classForm.onSubmit(submitClassForm)}>
          <Stack>
            <TextInput
              label="Class Name"
              placeholder="Introduction to Computer Science"
              required
              {...classForm.getInputProps('className')}
            />

            <Select
              label="Department"
              placeholder="Pick Department"
              data={['CS', 'MATH', 'HIST', 'KIN', 'POLI', 'BIO', 'ENG']}
              {...classForm.getInputProps('deptName')}
              required
            />

            <Textarea
              label="Class Description"
              placeholder="Enter a detailed description of the class"
              required
              minRows={3}
              {...classForm.getInputProps('classDesc')}
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
