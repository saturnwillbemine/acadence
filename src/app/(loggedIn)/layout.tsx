// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme, MantineColorsTuple } from '@mantine/core';

import Shell from '../components/AppShell';
import CheckAuth from '../components/checkAuth';


const myColor: MantineColorsTuple = [
  '#f1fbef',
  '#e1f4dd',
  '#bfe9b5',
  '#9ade8b',
  '#7cd567',
  '#69cf51',
  '#5ecc44',
  '#4eb436',
  '#43a02e',
  '#358a23'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});

export const metadata = {
  title: 'Acadence',
  description: 'Attendance Management Application',
};

export default function AppLayout({ children, } : { children : React.ReactNode;}) {

  return (
    <section>
      <CheckAuth>  {/* this is to make sure that the user is logged in*/}
        <MantineProvider theme={theme}>
          <Shell main={children}/>
        </MantineProvider>
      </CheckAuth>
    </section>
  );
}