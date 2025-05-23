'use client';

import { Burger, AppShell, Group, NavLink, Button } from "@mantine/core";
import NextImage from "next/image";
import { useDisclosure } from '@mantine/hooks';
import Logo from '../../../public/images/learningFull.png';
import { HiAcademicCap,
         HiHome,
        HiMiniArrowRight, 
        HiCog, 
        HiArrowRightEndOnRectangle, 
        HiMiniUsers, 
        } from "react-icons/hi2";
import { useNavStore } from './NavlinkStore'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from "@/scripts/userSessionStore";

// this is the data for the navbar items
const navbarData = [
  {
    icon: HiHome,
    label: 'Dashboard',
    rightSection: <HiMiniArrowRight size={16}/>,
    href: '/dashboard'
  },
  { icon: HiAcademicCap, 
    label: 'Create Class',
    rightSection: <HiMiniArrowRight size={16}/>,
    href: '/createclass'
  },
  {
    icon: HiMiniUsers,
    label: 'Students',
    rightSection: <HiMiniArrowRight size={16}/>,
    href: '/students'
  },
]

//  this is used to create the layout of the application for the navbar and header
export default function Shell({ main }: { main : React.ReactNode }) {

    const router = useRouter();
    const pathname = usePathname();


    const logoutSubmit = () => {
      useSession.getState().clearSession();
      console.log(useSession.getState()); //show state on logout
      router.push('/');
    }

    // this makes it so the navbar is collapsed on mobile and on desktop
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();


    // maps the navbar data to create the navlinks for the navbar
    const setActiveIndex = useNavStore((state:any ) => state.setActiveIndex);
    const activeIndex = useNavStore((state: any) => state.activeIndex);

    // gets the pathname and sets the active index to the current index of the pathname idk how this works but it finally does
    useEffect(() => {
      if (!pathname) return;

      const currentIndex = navbarData.findIndex((item) => item.href === pathname);
      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    }, [pathname, setActiveIndex]);

    // these are for the navlinks in the navbar to format them and allow me to click through them and keep an active tab 
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

    const professorName = useSession((state) => state.professorName)

    return (
      <AppShell
        header={{ height: 80 }} 
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md">

        <AppShell.Header style={{ display: 'flex', flexDirection: 'row'}}>
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

          <div style={{marginLeft: 'auto', marginTop: '50px', marginRight: '15px'}}>
            Welcome, Professor {professorName}!
          </div>
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
              onClick= {logoutSubmit} //this is where i actually log out and end session
              color="myColor"
            />
            <Button onClick={() => console.log(useSession.getState())}>
              Log current state
            </Button>
          </div>
        </AppShell.Navbar>

        <AppShell.Main>
          {main}
        </AppShell.Main>

      </AppShell>
    );
  }
