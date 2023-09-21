'use client'
import styles from './page.module.css'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
const convert = require("xml-js");
import path from 'path';

const api_url = `/api/auth/yahoo`;
const CORSProxy = "https://pacific-spire-15074-e9be3e6cda01.herokuapp.com/";

export default function Home() {

  const getAccessToken = async () => {
    const res = await fetch('/api/auth/yahoo/useAccessToken')
    const data = await res.json();
    // console.log(data.cookie.value);
    return data.cookie.value;
  }

  const leagueSync = async () => {
    const access_token = await getAccessToken();
    const yahooQuery = "users;use_login=1/games/leagues"
    const mcDaveLeagueID = "427.l.3918"
    const draftedPlayersQuery = `league/${mcDaveLeagueID}/players;status=T;start=0`
    const api_url = `${CORSProxy}https://fantasysports.yahooapis.com/fantasy/v2/${draftedPlayersQuery}?access_token=${access_token}`
    console.log(access_token)
    // Specify the path to the JSON file
    const filePath = path.join(process.cwd(), 'data/draftedPlayers.json');

    axios.get(api_url).then(res => {
      console.log('Received Y! League Data');

      const data = JSON.parse(
          convert.xml2json(res.data, {})
      );

      console.log(data);
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      } catch(err) {
        console.log(err)
      }
      });
  }
  
  const getDraftedPlayers = async () => {
    const path1 = path.join(process.cwd(), '/api/yahoo/saveDraftedPlayers')
    try {
      const res = await fetch(path1);
      const data = await res.json();
      console.log('Drafted Players json:')
      console.log(data)
      return data;  
    } catch(err) {
      console.log(err);
    }
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
        <button onClick={getDraftedPlayers}>Get Drafted Players</button>


      </div>
    </main>
  )

}
