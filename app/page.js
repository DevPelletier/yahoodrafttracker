'use client'
import styles from './page.module.css'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
const convert = require("xml-js");

const api_url = `/api/auth/yahoo`;
const CORSProxy = "https://pacific-spire-15074-e9be3e6cda01.herokuapp.com/";

export default function Home() {

  const getAccessToken = async () => {
    const res = await fetch('/api/auth/yahoo/useAccessToken')
    const data = await res.json();
    console.log(data.cookie.value);
    return data.cookie.value;
  }

  const leagueSync = async () => {
    const access_token = await getAccessToken();
    const yahooQuery = "users;use_login=1/games/leagues"
    const api_url = `${CORSProxy}https://fantasysports.yahooapis.com/fantasy/v2/${yahooQuery}?access_token=${access_token}`

    axios.get(api_url).then(res => {
      console.log('Received Y! League Data');

      const data = JSON.parse(
          convert.xml2json(res.data, {})
      );

      console.log(data);
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

        <button onClick={getAccessToken}>Check for Cookies</button>
        <button onClick={leagueSync}>Get Yahoo Leagues</button>


      </div>
    </main>
  )

}
