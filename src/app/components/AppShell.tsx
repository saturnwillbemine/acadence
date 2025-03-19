'use client';

import { Burger, AppShell, Group, Skeleton, NavLink } from "@mantine/core";
import NextImage from "next/image";
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../../public/images/learningFull.png';
import { HiAcademicCap, HiHome, HiMiniArrowRight, HiCog, HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { useNavStore } from './NavlinkStore'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This is the data for the navbar items
const navbarData = [
  {
    icon: HiHome,
    label: 'Dashboard',
    rightSection: <HiMiniArrowRight size={16}/>,
    href: '/dashboard'
  },
  { icon: HiAcademicCap, 
    label: 'Classes',
    rightSection: <HiMiniArrowRight size={16}/>,
    href: '/classes'
  },
  {
    icon: HiCog,
    label: 'Settings',
    rightSection: <HiMiniArrowRight size={16}/>,
    href: '/settings'
  },
]

// This is a client component, it is used to create the layout of the application for the navbar and header
export default function Shell({ main }: { main : React.ReactNode }) {

    const router = useRouter();

    // This makes it so the navbar is collapsed on mobile and on desktop
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();


    // maps the navbar data to create the navlinks for the navbar
    const setActiveIndex = useNavStore((state:any ) => state.setActiveIndex);
    const activeIndex = useNavStore((state: any) => state.activeIndex);
    const pathname = usePathname();

    // gets the pathname and sets the active index to the current index of the pathname
    useEffect(() => {
      if (!pathname) return;

      const currentIndex = navbarData.findIndex((item) => item.href === pathname);
      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    }, [pathname, setActiveIndex]);

    // These are for the navlinks in the navbar to format them and allow me to click through them and keep an active tab 
    const navItems = navbarData.map((item, index) => (
      <NavLink
        href={item.href}
        key={item.label}
        active={index === activeIndex}
        label={item.label}
        rightSection={item.rightSection}
        leftSection={<item.icon size={16}/>}
        onClick= {() => setActiveIndex(index)}
        color="myColor"
        variant={index === activeIndex ? 'filled' : 'light'}
      />
    ));

    return (
      <AppShell
        header={{ height: 80 }} 
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md">
          
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <NextImage
              src={Logo}
              alt="Acadence"
              height={80}
              width={160}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md" style={{ display: 'flex', flexDirection: 'column' }}>  
          <div style={{marginBottom: '15px'}}>
            Navigation
            </div>
            <div>
            {navItems}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <NavLink
              href='/'
              key='Logout'
              active={false}
              label='Logout'
              leftSection={<HiArrowRightEndOnRectangle size={16}/>}
              onClick= {() => router.push('/')} //this is where i actually log out and end session
              color="myColor"
            />
          </div>
        </AppShell.Navbar>

        <AppShell.Main>
          {main}
        </AppShell.Main>

      </AppShell>
    );
  }
