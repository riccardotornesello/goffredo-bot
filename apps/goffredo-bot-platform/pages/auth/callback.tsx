import Cookies from 'cookies';
import { exchangeDiscordCode } from '../../utils/oauth2';

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);

  const discordToken = await exchangeDiscordCode(query.code);

  if (discordToken) {
    cookies.set('auth', discordToken.access_token, {
      maxAge: discordToken.expires_in * 1000 - 1000,
      httpOnly: true,
    });

    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } else {
    return {};
  }
}

export default function OauthCallbackPage() {
  return <div>Something went wrong</div>;
}
