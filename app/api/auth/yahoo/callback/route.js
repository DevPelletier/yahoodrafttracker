import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;
  console.log('code is ' + code)

  if (!code) {
    return res.status(400).send('Code not provided');
  }

  try {
    const tokenResponse = await axios.post('https://api.login.yahoo.com/oauth2/get_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenResponse.data;
    const { refresh_token } = tokenResponse.data;
    const { token_type } = tokenResponse.data;
    const { expires_in } = tokenResponse.data;

    localStorage.setItem("yAccessToken", access_token);
    // Save the access_token in a session/cookie or use it directly.
    // This example just sends it as a response (not recommended for production).
    console.log({ access_token, refresh_token, token_type, expires_in })
    res.status(200).json({ access_token, refresh_token, token_type, expires_in });

  } catch (error) {
    res.status(500).send('Error fetching access token');
  }
}
