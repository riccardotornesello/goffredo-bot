import { NextApiRequest } from 'next';

export function extractBaseUrl(req: NextApiRequest): string {
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];

  return `${proto}://${host}`;
}
