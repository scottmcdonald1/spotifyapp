import Iron from '@hapi/iron'

export const setAuthCookie = async (res, session, options) => {
  const defaults = {
    maxAge: 3600 * 1000 * 5,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  }
  const opts = { ...defaults, ...options } 

  try {
    const signedSession = await Iron.seal(session, SESSION_SECRET, Iron.defaults)

    const stringValue = typeof signedSession === 'object' ? 'j:' + JSON.stringify(signedSession) : String(signedSession)

    if ('maxAge' in opts) {
      opts.expires = new Date(Date.now() + opts.maxAge);
      opts.maxAge /= 1000;
    }

    res.setHeader('Set-Cookie', serialize('auth.session', stringValue, opts))
  } catch(error) {
    console.error('Failed to seal session object', error);
    return
  }
}