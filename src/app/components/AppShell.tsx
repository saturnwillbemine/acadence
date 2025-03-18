'use client';

import { Burger, AppShell, Group, Skeleton } from "@mantine/core";
import NextImage from "next/image";
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../../public/images/learningFull.png';

// This is a client component, it is used to create the layout of the application for the navbar and header
export default function Shell({ main }: { main : React.ReactNode }) {

    // This makes it so the navbar is collapsed on mobile and expanded on desktop
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
      <AppShell
        header={{ height: 60 }} 
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <NextImage
              src={Logo}
              alt="Acadence"
              height={40}
              width={120}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={true} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>{main}</AppShell.Main>
      </AppShell>
    );
  }
