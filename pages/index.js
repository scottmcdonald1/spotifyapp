import Head from 'next/head'
import cookie from 'cookie'
import Iron from '@hapi/iron'
import SearchForm from '../src/search/SearchForm'

export default function Home({user}) {

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title>Spotify App</title>
      </Head>
      
      <div className='flex flex-col py-10 justify-center items-center border border-ombreNaturelle31/60 shadow-sharp rounded'>
        
        <div className="flex flex-col bg-white justify-center items-center my-4 px-5 py-3 border-l border-b border-orangeVif shadow-spread rounded">
          <h1 className="font-bowlbyOneSC text-4xl">Spotify API Assistant</h1>
          <h2 className="font-monda text-xl">A Spotify Data Assistant</h2>
        </div>

        <div className="bg-white w-1/2 justify-center items-center my-4 px-5 py-3 border-l border-b border-orangeVif shadow-spread rounded">
          <p className='font-monda text-l'>
            This app was made to help users navigate the Spotify API with a simple search UI in order to find important meta data for songs, albums, and artists. It is a very helpful tool for any working professional in the music industry today.
          </p>
        </div>

        <div className="bg-white w-1/2 justify-center items-center my-4 px-5 py-3 border-l border-b border-orangeVif shadow-spread rounded">

          {user ? (
            <div>
              <h2 className='font-monda text-xl'>Search form to go here</h2>
              {/* <SearchForm /> */}
            </div>
          ) : (
            <h2 className="font-monda text-xl">Login to start searching!</h2>
          )}

        </div>

      </div>

    </div>
  )
}

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
