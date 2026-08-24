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

  const payload = data.access_token
    ? {
        status: 'success',
        message: `authorization:github:success:${JSON.stringify({
          token: data.access_token,
          provider: 'github',
        })}`,
      }
    : {
        status: 'error',
        message: `authorization:github:error:${JSON.stringify({
          error: data.error ?? 'unknown_error',
          error_description: data.error_description ?? '',
        })}`,
      };

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).end(`<!DOCTYPE html>
<html>
<body>
<script>
  (function(){
    var msg = ${JSON.stringify(payload.message)};
    function send(){
      if (window.opener) {
        window.opener.postMessage(msg, "*");
      }
    }
    // Decap listens for the second message after handshake
    window.addEventListener("message", function(e){
      if (e.data === "authorizing:github") send();
    }, false);
    send();
    setTimeout(function(){ window.close(); }, 1000);
  })();
</script>
</body>
</html>`);
}
