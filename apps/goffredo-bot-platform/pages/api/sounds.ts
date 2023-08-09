import formidable from 'formidable';
import axios from 'axios';
import Cookies from 'cookies';
import { DISCORD_API_BASE_URL } from '../../data';
import fs from 'fs';
import { addSound, AppDataSource } from '@goffredo-bot/database';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function post(req, res) {
  await AppDataSource.initialize();

  const form = formidable({ multiples: true });
  const cookies = new Cookies(req, res);

  const formData = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject('error');
      }
      resolve({ fields, files });
    });
  });

  const authToken = cookies.get('auth');
  let userRes;
  try {
    userRes = await axios.get(`${DISCORD_API_BASE_URL}/users/@me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (e) {
    cookies.set('auth');
    return res.status(401).end();
  }

  const { fields, files } = await formData as any;

  const soundId = await addSound({
    userId: userRes.data.id,
    name: fields.name[0],
  });

  if (!fs.existsSync('./data/sounds/')) {
    fs.mkdirSync('./data/sounds/');
  }

  const fileExtension = files.file[0].originalFilename.split('.').pop();
  const newPath = `./data/sounds/${soundId}.${fileExtension}`;
  const oldPath = files.file[0].filepath;
  const rawData = fs.readFileSync(oldPath);

  fs.writeFileSync(newPath, rawData);

  return res.status(200).end();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await post(req, res);
  } else {
    res.status(405).end();
  }
}
