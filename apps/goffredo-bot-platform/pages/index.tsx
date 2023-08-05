import { generateDiscordOauthUrl } from '../utils/oauth2';
import { Anchor, Title } from '@mantine/core';

export function Index() {
  return (
    <div>
      <Anchor href={generateDiscordOauthUrl()}>Log in</Anchor>
      <Title>A 💩 interface for a work in progress project</Title>
    </div>
  );
}

export default Index;
