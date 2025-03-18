'use client';
// This is a client component, as it uses hooks and state management

import { Burger, AppShell, Group, Skeleton } from "@mantine/core";
import NextImage from "next/image";
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../../public/images/learningFull.png';

export default function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>Welcome to the dashboard!</>
  );
}
