'use client';
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Group,
} from '@mantine/core';
import classes from './page.module.css';
import NextImage from 'next/image';
import Logo from '../../public/images/acadence.png';
import { HiArrowSmallRight } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import requestLogin from '@/scripts/requestLogin';


export default function Home() {

  const router = useRouter() // used for routing

  //handles submit and routing on successful login request
  const loginSubmit = async (values: any) => {
    const success = await requestLogin(values.username, values.pass, values.keepLogin);
    if (success) {
      router.push('/dashboard');
      console.log('Form values:', values); // for debugging keepLogin
    }
  };

  // for the clientside validation of the form before sending a request
  const loginSchema = z.object({
    username: z.string({
      required_error: "Username is required"
    }),
    pass: z.string({
      required_error: "Password must not be empty"
    }).min(5, {message: "Minimum of 5 characters required"}),
    keepLogin: z.boolean().default(false)
  });

  // useForm to get the data from the mantine ui forms
  const loginForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      pass: '',
      keepLogin: false
    },
    validate: zodResolver(loginSchema),
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Group h='100%' px='md' mb={50} mt={200}>
        <NextImage
              src={Logo}
              alt="Acadence"
              height={60}
              width={60}
              style={{ objectFit: 'contain' }}
              priority
            />
        <Title order={2} className={classes.title} ta="right" mt="md" mb={15}>
          Welcome to Acadence!
        </Title>
        </Group>
        
        <form onSubmit={loginForm.onSubmit((values) => loginSubmit(values))}>
          <TextInput label="Username" 
          placeholder="username" 
          size="md"
          required
          key={loginForm.key('username')}
          {...loginForm.getInputProps('username')} />

          <PasswordInput label="Password" 
          placeholder="password" 
          mt="md" 
          size="md" 
          key={loginForm.key('pass')}
          required
          {...loginForm.getInputProps('pass')}/>

          <Checkbox label="Keep me logged in" 
          mt="xl" 
          size="md" 
          key={loginForm.key('keepLogin')}
          {...loginForm.getInputProps('keepLogin', { type: 'checkbox' })} />

          <Button fullWidth mt="xl" 
                  size="md"
                  color="myColor" 
                  variant="filled"
                  rightSection={<HiArrowSmallRight size={20} />}
                  justify='space-between'
                  type='submit'
                  //onClick={() => router.push('/dashboard')}
                  //this is where I actually login with the session
                  > 
            Login
          </Button>
        </form>
        <Text ta="center" mt="md">
          Forgot your password?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()} c="myColor">
            Reset here
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
