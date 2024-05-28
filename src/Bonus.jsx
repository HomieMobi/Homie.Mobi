import React from 'react'
import { useAuth } from './contexts/authContext'
import Login from './components2/login'

const Bonus = () => {
  const { userLoggedIn } = useAuth()

  return (
    <div className=''>
      {userLoggedIn ? ( /* Conditional rendering based on userLoggedIn */
        /* Render blue div if user is logged in */
        <div className='w-screen h-screen bg-blue-200'>
          {/* Content for logged-in users */}
        </div>
      ) : (
        /* Render the Login component if user is not logged in */
        <Login />
      )}
    </div>
  )
}

export default Bonus

