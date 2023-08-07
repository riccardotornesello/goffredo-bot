import axios from 'axios';
import Cookies from 'cookies';
import { DISCORD_API_BASE_URL } from '../../data';
import SoundsTable from '../../components/sounds-table';
import { getUserSounds } from 'apps/goffredo-bot-platform/database/sounds';
import SoundUploadForm from '../../components/sound-upload-form';

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const authToken = cookies.get('auth');

  if (!authToken) {
    return {
      redirect: {
        destination: '/',
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
