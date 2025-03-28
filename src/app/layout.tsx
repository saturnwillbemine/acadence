// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme, MantineColorsTuple } from '@mantine/core';

import CheckAuth from './components/CheckAuth';

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

export default function RootLayout({ children, } : { children : React.ReactNode;}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <CheckAuth>  {/* i cant believe this is what was broken the entire time */}
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>
        </CheckAuth>
      </body>
    </html>
  );
}