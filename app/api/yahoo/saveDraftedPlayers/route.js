import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import axios from 'axios';
const convert = require("xml-js");

const AUTH_HEADER = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, `binary`).toString(`base64`);
const CORSProxy = "https://pacific-spire-15074-e9be3e6cda01.herokuapp.com/";

// const getAccessToken = async () => {
//     let baseUrl = process.env.HOST_NAME;
//     let accessTokenUrl = `${baseUrl}/api/auth/yahoo/useAccessToken`;
//     console.log(accessTokenUrl)
//     const res = await fetch(accessTokenUrl)
//     const data = await res.json();
//     console.log(data.cookie.value);
//     return data.cookie.value;
// }

const getDraftedPlayers = async (access_token) => {
    // const access_token = await getAccessToken();
    const mcDaveLeagueID = "427.l.3918"
    const draftedPlayersQuery = `league/${mcDaveLeagueID}/players;status=T;start=0`
    const api_url = `${CORSProxy}https://fantasysports.yahooapis.com/fantasy/v2/${draftedPlayersQuery}?access_token=${access_token}`

    console.log('api_url:', api_url)

    const requestConfig = {
        headers:{
            'Authorization': `Basic ${AUTH_HEADER}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            "X-Requested-With": "XMLHttpRequest"
        }
    }

    try {
        axios.get(api_url, requestConfig).then(res => {
            console.log('Received Y! League Data');
      
            const data = JSON.parse(
                convert.xml2json(res.data, {})
            );
            return data;
        });
    } catch(err) {
        console.log(err)
    }
}

// const saveDraftedPlayers = async () => {
//     const draftedPlayers = await getDraftedPlayers();
//     console.log(draftedPlayers)
//     console.log('saved drafted players!')
// }


export async function GET(request) {
    // ==========> Get Saved AcessToken in Cookies
    const tokenCookie = request.cookies.get('yAccessToken')
    const access_token = tokenCookie.value
    console.log('Y!AccessToken', access_token)

    // ==========> Call Yahoo API for Drafted Players
    const draftedPlayers = await getDraftedPlayers(access_token);
    console.log('Drafted Players jsons:')
    console.log(draftedPlayers)
    return NextResponse.json({message:'hello'});
}

export async function POST(request) {
    return NextResponse.json({ message: "Hello POST" });
}  


// export default async function handler(req, res) {
//   // Let's say this is your API call
//   const apiResponse = await fetch("https://api.example.com/data");
//   const data = await apiResponse.json();

//   // Specify the path to the JSON file
//   const filePath = path.join(process.cwd(), 'data.json');

//   // Write the data to the JSON file
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//   res.status(200).json({ message: "Data stored successfully!" });
// }
