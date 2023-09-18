'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
const qs = require('qs');

const CONSUMER_KEY = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj";
const CONSUMER_SECRET = "edd7a1fc57aa1fbeb1d290bad943a2ee48dae573";
const AUTH_HEADER = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`, `binary`).toString(`base64`);
const api_url = "https://api.login.yahoo.com/oauth2/get_token"
const hosturl = "https://yahoodrafttracker.vercel.app"
const redirect_uri = `${hosturl}/test`;


export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const saveYahooAuthCode = async () => {
        const auth_code = searchParams.get('code')
        localStorage.setItem("yAuthCode", auth_code);
        return auth_code;
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