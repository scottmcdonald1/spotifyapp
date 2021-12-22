import React from 'react'

const App = ({ user }) => {
  // console.log(user)
  return (
    <div>
      {user ? (
        <div>{user.body.display_name} is currently logged in</div>
      ) : (
        <a href="/api/auth/login">Login with Spotify</a>
      )}
    </div>
  )
}

export default App