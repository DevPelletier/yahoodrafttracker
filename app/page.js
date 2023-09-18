'use client'

import styles from './page.module.css'
import Link from "next/link";


import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
const qs = require('qs');

const CONSUMER_KEY = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj";
const CONSUMER_SECRET = "edd7a1fc57aa1fbeb1d290bad943a2ee48dae573";
const AUTH_HEADER = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`, `binary`).toString(`base64`);

export default function Home() {
  
  const searchParams = useSearchParams()
  const accessCode = searchParams.get('code')
  console.log(accessCode)

  const hostname = "https://yahoodrafttracker.vercel.app"
  
  const client_id = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj";
  const redirect_uri = `${hostname}/test`;
  // const redirect_uri = "localhost:3000"; // as a backup if ngrok stops working for whatever dumb reason lol
  // const api_url = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&language=en-us`;
  const accessTokenURL = "https://api.login.yahoo.com/oauth2/get_token"

  const api_url = "localhost:3000/api/auth/yahoo";

  

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

      </div>
    </main>
  )
}
