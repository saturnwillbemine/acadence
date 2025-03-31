'use client';

import { Tooltip, ActionIcon } from "@mantine/core";
import { HiPlus, HiArrowSmallRight } from "react-icons/hi2";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import requestStudentCreation from "@/scripts/requestStudentCreation";
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useForm } from "@mantine/form";
import { TextInput,  Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function AddStudentButton({classID} : { classID: number }) {

  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

    const submitStudentForm = async (values: any) => {
      const success = await requestStudentCreation(classID, values.studentName);
      if (success) {
        console.log('Form values:', values);
        close();
        window.location.reload(); // reload on success to see new students
      }
    };
  
    // for the clientside validation of the form before sending a request
    const studentSchema = z.object({
      studentName: z.string({
        required_error: "Student Name must not be empty"
      }).includes(" ", { message: "Must include First and Last Name"}),
    });
  
    // useForm to get the data from the mantine ui forms
    const studentForm = useForm({
      mode: 'uncontrolled',
      initialValues: {
        studentName: '',
         },
      validate: zodResolver(studentSchema),
    });

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Add a Student" centered>
        <form onSubmit={studentForm.onSubmit((values) => submitStudentForm(values))}>
                  <TextInput label="Student Name" 
                  placeholder="Jane Doe" 
                  size="md"
                  required
                  key={studentForm.key('studentName')}
                  {...studentForm.getInputProps('studentName')} />
        
                  <Button fullWidth mt="xl" 
                          size="md"
                          color="myColor" 
                          variant="filled"
                          rightSection={<HiArrowSmallRight size={20} />}
                          justify='space-between'
                          type='submit'
                          > 
                    Create Student
                  </Button>
                </form>
      </Modal>

    
    <Tooltip label='Add Student'>
      <ActionIcon onClick={open} color="myColor">
        <HiPlus size={16}/>
      </ActionIcon>
    </Tooltip>
    </div>
  );
} 
