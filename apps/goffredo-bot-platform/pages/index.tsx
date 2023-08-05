import { generateDiscordOauthUrl } from '../utils/oauth2';
import { Anchor } from '@mantine/core';

export function Index() {
  return (
    <div>
      <Anchor href={generateDiscordOauthUrl()}>Log in</Anchor>
    </div>
  );
}

export default Index;
