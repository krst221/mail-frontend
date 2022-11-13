import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext'
import { JwtContext } from '../../contexts/JwTContext'
import { API } from '../../services/api'
import './AuthButton.scss'

function AuthButton() {
  
  const {setJwt} = useContext(JwtContext);
  const {user} = useContext(ProfileContext);
  let navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setJwt(null);
    navigate('/');
  }

  const deleteUser = () => {
    API.put('/user', user).then((res) => {
      if(res.status === 200) signOut();
    })
  }

  return (
    <p>
        Bienvenido <strong>{user.name}</strong> <button onClick={signOut}>Cerrar sesión</button><button onClick={deleteUser}>Eliminar usuario</button>
    </p>
  )
}

export default AuthButton