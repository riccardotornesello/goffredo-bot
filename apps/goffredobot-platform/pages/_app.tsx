import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to goffredobot-platform!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Inter, sans-serif',
          headings: {
            sizes: {
              h1: {
                fontSize: '60px',
                fontWeight: 400,
              },
              h2: {
                fontSize: '30px',
                fontWeight: 400,
              },
              h3: {
                fontSize: '30px',
                fontWeight: 400,
              },
            },
          },
          colors: {
            dark: [
              '#FFF',
              '#A6A7AB',
              '#909296',
              '#5C5F66',
              '#373A40',
              '#2C2E33',
              '#25262B',
              '#0d1321',
              '#141517',
              '#101113',
            ],
          },
          primaryColor: 'violet',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default CustomApp;
