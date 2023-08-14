import { generateDiscordOauthUrl } from '../utils/oauth2';
import { extractBaseUrl } from '../utils/url';
import { Anchor, Title } from '@mantine/core';

export async function getServerSideProps({ req }) {
  const baseUrl = extractBaseUrl(req);

  return {
    props: {
      baseUrl,
    },
  };
}

export function Index({ baseUrl }) {
  return (
    <div>
      <Anchor href={generateDiscordOauthUrl(baseUrl)}>Log in</Anchor>
      <Title>A 💩 interface for a work in progress project</Title>
    </div>
  );
}

export default Index;
