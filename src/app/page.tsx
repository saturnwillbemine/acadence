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

export default function Home() {

  const router = useRouter();

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

        <TextInput label="Username" placeholder="your-username" size="md" />
        <PasswordInput label="Password" placeholder="your-password" mt="md" size="md" />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" 
                size="md"
                color="myColor" 
                variant="filled"
                rightSection={<HiArrowSmallRight size={20} />}
                justify='space-between'
                onClick={() => router.push('/dashboard')}
                //this is where I actually login with the session
                > 
          Login
        </Button>
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
