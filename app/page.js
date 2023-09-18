'use client'

import styles from './page.module.css'
import Link from "next/link";


import { useSearchParams } from 'next/navigation'


export default function Home() {
  
  const searchParams = useSearchParams()
  const accessCode = searchParams.get('code')
  console.log(accessCode)

  const hostname = "https://yahoodrafttracker.vercel.app"
  
  const client_id = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj";
  const redirect_uri = `${hostname}/test`;
  // const redirect_uri = "localhost:3000"; // as a backup if ngrok stops working for whatever dumb reason lol
  const api_url = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&language=en-us`;
  const accessTokenURL = "https://api.login.yahoo.com/oauth2/get_token"

  
  const getYahooAccessToken = async () => {
    const auth_code = localStorage.getItem("yAuthCode");

    const response = await fetch(accessTokenURL, {
        method: 'post',
        headers: {
            'Authorization': `Basic ${AUTH_HEADER}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        body: qs.stringify({
            grant_type: 'authorization_code',
            client_id: CONSUMER_KEY,
            client_secret: CONSUMER_SECRET,
            redirect_uri: redirect_uri,
            code: auth_code
        }),
        timeout: 1000,
    }).catch((err) => {
        console.error(`Error in getInitialAuthorization(): ${err}`);
        // router.push('/login-error');
    });

    const data = await response.json().then(data => {
        console.log(data);

        // if Auth fails
        if (data.error || data === null) {
            console.error(`Error in getInitialAuthorization(): ${err}`);
            // router.push('/login_error');
        } else {
            // Auth Succeeded!
            localStorage.setItem("yAccessToken", data.access_token);
            localStorage.setItem("yRefreshToken", data.refresh_token);
            localStorage.setItem("yTokenType", data.token_type);
            localStorage.setItem("yTokenExpiry", data.expires_in);

            console.log('Auth success!')

            // router.push('/')
        }
    });
  }

return (
    <main className={styles.main}>
      <div>
        <h1>Hello!</h1>
        <Link
            href={api_url}
            title="Authenticate with Yahoo!"
            rel="noopener noreferrer"
            passHref
            className=""
        >
            {/* <Trophy /> */}
            <button>Auth w/ Yahoo!</button>
        </Link>

        <button onClick={getYahooAccessToken}>Get that accesstoken</button>

      </div>
    </main>
  )
}
