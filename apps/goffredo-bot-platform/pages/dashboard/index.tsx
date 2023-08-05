import axios from 'axios';
import Cookies from 'cookies';
import { DISCORD_API_BASE_URL } from '../../data/constants';
import { headers } from 'apps/goffredo-bot-platform/next.config';

export async function getServerSideProps({ req, res, query }) {
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

  try {
    const res = await axios.get(`${DISCORD_API_BASE_URL}/users/@me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return { props: { user: res.data } };
  } catch (e) {
    cookies.set('auth');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default function DashboardPage({ user }) {
  return (
    <div>
      <p>Username: {user.username}</p>
    </div>
  );
}
