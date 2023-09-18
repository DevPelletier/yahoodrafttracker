'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
const qs = require('qs');

const CONSUMER_KEY = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj";
const CONSUMER_SECRET = "edd7a1fc57aa1fbeb1d290bad943a2ee48dae573";
const AUTH_HEADER = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`, `binary`).toString(`base64`);

const hosturl = "remarkably-still-doberman.ngrok-free.app"
const redirect_uri = `${hosturl}/test`;


export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const saveYahooAuthCode = async () => {
        const auth_code = searchParams.get('code')
        localStorage.setItem("yAuthCode", auth_code);
        return auth_code;
    }

    const getYahooAccessToken = async (auth_code) => {
        const response = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
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
    
                router.push('/')
            }
        });
    }




    saveYahooAuthCode()
        .then(auth_code => {
            // getYahooAccessToken(auth_code);
            router.push('/')
        });


    return (
    <main>
        <div>
            <h1>Hello, Test1 Page!</h1>
        </div>
    </main>
    )
}