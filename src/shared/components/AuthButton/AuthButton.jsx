import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../../App';
import { JwtContext } from '../../contexts/JwTContext'
import './AuthButton.scss'

function AuthButton() {
  
  const {setJwt} = useContext(JwtContext);
  let navigate = useNavigate();
  const {user} = useContext(ProfileContext);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setJwt(null);
    navigate('/');
  }

  return (
    <p>
        Bienvenido {user.name} <button onClick={signOut}>Sign Out</button>
    </p>
  )
}

export default AuthButton