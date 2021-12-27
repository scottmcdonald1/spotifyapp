import Head from 'next/head'
import cookie from 'cookie'
import Iron from '@hapi/iron'

import App from '../src/App'
import SearchForm from '../src/SearchForm'

export const getSessionCookie = async (cookies) => {
  const cookie = cookies['auth.session'];

  if (!cookie) {
    throw new Error('Auth session not found')
  }

  const decoded = await Iron.unseal(cookie, process.env.SESSION_SECRET, Iron.defaults)

  return decoded;
}

export const getServerSideProps = async ({req}) => {
  // console.log('req: ',req)

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
    <div className="grid  md:grid-cols-6 w-full min-h-screen">
      <Head>
        <title>Spotify App</title>
      </Head>

      <div className='grid sm:row-span-2 md:col-span-2'>
        <div className='bg-white m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded'>
          <App user={props.user} />
        </div>
        <SearchForm />
      </div>
      
      <div className='grid sm:row-span-3 sm:grid-rows-2 md:col-span-4 md:grid-rows-2 h-screen'>
        <div className="grid sm:row-span-1 bg-white justify-center items-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
          <h1 className="font-bowlbyOneSC text-4xl">Spotify App</h1>
          <h2 className="font-monda text-xl">A Spotify Data Assistant</h2>
        </div>

        <div className="grid sm:row-span-1 bg-white justify-center items-center m-4 px-5 py-3 border border-ombreNaturelle31/60 shadow-sharp rounded">
          <p className='font-monda text-l'>This app was to help users navigate the Spotify API with a simple search UI</p>
        </div>
      </div>

    </div>
  )
}


