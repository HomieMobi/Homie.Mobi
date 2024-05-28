import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/authContext'
import { doSignOut } from './Auth'

const Header = () => {
  const navigate = useNavigate()
  const { userLoggedIn } = useAuth()
  return (
    <nav className=' pr-2  h-full items-end flex flex-row gap-2 '>
      {
        userLoggedIn
          ?
          <>
            <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-md text-black underline'>Logout</button>
          </>
          :
          <>

            <div className='text-xs'>[testing]</div>
            <Link className='text-md text-black underline' to={'/login'}>Login</Link>
            <Link className='text-md text-black underline' to={'/register'}>Register</Link>
          </>
      }

    </nav>
  )
}

export default Header