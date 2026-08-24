export default async function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send('OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET missing');
    return;
  }

  const code = req.query.code;
  if (!code) {
    res.status(400).send('missing code');
    return;
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  const data = await tokenRes.json();

  const provider = 'github';
  const status = data.access_token ? 'success' : 'error';
  const payload = data.access_token
    ? { token: data.access_token, provider }
    : { error: data.error ?? 'unknown_error', error_description: data.error_description ?? '' };

  const authMessage = `authorization:${provider}:${status}:${JSON.stringify(payload)}`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).end(`<!DOCTYPE html>
<html>
<body>
<script>
  (function () {
    var authMessage = ${JSON.stringify(authMessage)};
    var provider = ${JSON.stringify(provider)};

    function receiveMessage(e) {
      // Decap répond "authorizing:github" — on peut envoyer le message d'auth
      window.opener.postMessage(authMessage, e.origin);
      window.removeEventListener("message", receiveMessage, false);
      setTimeout(function () { window.close(); }, 200);
    }

    window.addEventListener("message", receiveMessage, false);
    // Signal à Decap : "je suis prêt"
    window.opener.postMessage("authorizing:" + provider, "*");
  })();
</script>
</body>
</html>`);
}
