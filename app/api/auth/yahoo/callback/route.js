import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers'
import axios from 'axios';
import { access } from 'fs';

const AUTH_HEADER = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, `binary`).toString(`base64`);

export async function GET(request) {
  const code = request.nextUrl.searchParams.get('code')
  console.log('code is ' + code)

  if (!code) {
    console.log('nocode?')
    return new NextResponse(400).text('Code not provided');
  }

  try {
    console.log(process.env.CLIENT_ID);
    console.log(process.env.CLIENT_SECRET);
    console.log(process.env.REDIRECT_URI);
    const tokenResponse = await axios.post(`https://api.login.yahoo.com/oauth2/get_token`, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code,
      grant_type: 'authorization_code',
    }, {
      headers:{
        'Authorization': `Basic ${AUTH_HEADER}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    });

    const { access_token } = tokenResponse.data;
    console.log(access_token)
    cookies().set('yAccessToken', access_token)
    const cookieCheck = cookies().get('yAccessToken')
    console.log('cookieCheck = ' + cookieCheck)

    // This example sends the token as a JSON response (not recommended for production).
    console.log('success?')
    console.log(process.env.HOST_NAME)
    return NextResponse.redirect(process.env.HOST_NAME)

  } catch (error) {
    console.log('500 error')
    console.log(error)

    return new NextResponse(500).text('Error fetching access token');
  }
}





// const AUTH_HEADER = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, `binary`).toString(`base64`);

// export async function GET(request) {
//   const code = request.nextUrl.searchParams.get('code')
//   console.log('code is ' + code)

//   let response = NextResponse.next();


//   if (code == null) {
//     console.log('no code')
//     return response.status(400).json({message: 'no code'})
//   }

//   return response.status(200).json({ message: 'hooray' })

// //   try {
// //     const tokenResponse = await axios.post('https://api.login.yahoo.com/oauth2/get_token', {
// //       client_id: process.env.CLIENT_ID,
// //       client_secret: process.env.CLIENT_SECRET,
// //       redirect_uri: process.env.REDIRECT_URI,
// //       code: code,
// //       grant_type: 'authorization_code',
// //     });

// //     // Save the access_token in a session/cookie or use it directly.
// //     // This example just sends it as a response (not recommended for production).
// //     const { access_token } = tokenResponse.data;

// //     console.log({ access_token, refresh_token, token_type, expires_in })
// //     return NextResponse.status(200).json({ access_token: access_token })

// //   } catch (error) {
// //     return NextResponse.status(500).json({message: 'fuckyou'});
// //   }
// }

// Handles POST requests to /api
export async function POST(request) {
    return NextResponse.json({ message: "Hello POST" });
}
