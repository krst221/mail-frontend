import React, { useState } from 'react'
import { ProfileContext } from '../../App'
import AuthButton from '../../shared/components/AuthButton/AuthButton'
import Profile from '../../shared/components/Profile/Profile'
import './ProfilePage.scss'

function ProfilePage() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <>
      <ProfileContext.Provider value={{user, setUser}}>
        <Profile></Profile>
        <AuthButton></AuthButton>
      </ProfileContext.Provider>
    </>
  )
}

export default ProfilePage