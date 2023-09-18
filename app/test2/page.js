'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';

const CONSUMER_KEY = "dj0yJmk9V0hLeGZhdHUzdXVBJmQ9WVdrOVRsVm9aSEYzY3pRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFj";
const CONSUMER_SECRET = "edd7a1fc57aa1fbeb1d290bad943a2ee48dae573";
const AUTH_HEADER = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`, `binary`).toString(`base64`);

const hosturl = "https://yahoodrafttracker.vercel.app"
const redirect_uri = `${hosturl}/test2`;


export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams()



    return (
    <main>
        <div>
            <h1>Hello, Page Test 2</h1>
        </div>
    </main>
    )
}