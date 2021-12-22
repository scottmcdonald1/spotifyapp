import Head from 'next/head'
import cookie from 'cookie'
import { GetServerSideProps } from 'next'

import App from '../src/App'

export const getSessionCookie = async (cookies) => {
  const cookie = cookies['auth.session'];

  if (!cookie) {
    throw new Error('Auth session not found')
  }

  const decoded = await Iron.unseal(cookie, process.env.SESSION_SECRET, Iron.defaults)

  return decoded;
}

export const getServerSideProps = async ({req}) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    return {
      props: {
        user: session.user,
      },
    }
  } catch {
    return {
      props: {},
    }
  }
}

export default function Home(props) {

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Head>
        <title>Spotify App</title>
      </Head>
      
      <div className="flex flex-col justify-center items-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
        <h1 className="font-bowlbyOneSC text-4xl">Spotify App</h1>
        <h2 className="font-monda text-xl">A Spotify Data Assistant</h2>
      </div>

      <div className="flex flex-col justify-center items-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
        <App user={props.user} />
      </div>

    </div>
  )
}


