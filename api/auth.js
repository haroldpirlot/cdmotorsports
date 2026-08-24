export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('OAUTH_CLIENT_ID missing');
    return;
  }
  const host = req.headers.host;
  const proto = req.headers['x-forwarded-proto'] ?? 'https';
  const redirectUri = `${proto}://${host}/api/callback`;

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'repo,user');

  res.writeHead(302, { Location: url.toString() });
  res.end();
}
