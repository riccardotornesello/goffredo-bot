import axios from 'axios';
import Cookies from 'cookies';
import { extractBaseUrl } from '../../utils/url';
import { generateDiscordOauthUrl } from '../../utils/oauth2';
import { DISCORD_API_BASE_URL } from '../../data';
import SoundsTable from '../../components/sounds-table';
import { getUserSounds, AppDataSource } from '@goffredobot/database';
import SoundUploadForm from '../../components/sound-upload-form';

export async function getServerSideProps({ req, res }) {
  try {
    await AppDataSource.initialize();
  } catch (e) {}

  const cookies = new Cookies(req, res);
  const authToken = cookies.get('auth');

  if (!authToken) {
    const baseUrl = extractBaseUrl(req);
    return {
      redirect: {
        destination: generateDiscordOauthUrl(baseUrl),
        permanent: false,
      },
    };
  }

  let userRes;
  try {
    userRes = await axios.get(`${DISCORD_API_BASE_URL}/users/@me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    cookies.set('auth');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sounds = await getUserSounds(userRes.data.id);

  return { props: { user: userRes.data, sounds: sounds } };
}

export default function DashboardPage({ user, sounds }) {
  return (
    <div>
      <p>Username: {user.username}</p>
      <p>User id: {user.id}</p>
      <SoundsTable sounds={sounds} />
      <SoundUploadForm />
    </div>
  );
}
