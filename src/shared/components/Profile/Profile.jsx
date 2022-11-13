/* eslint-disable no-unused-vars */
import React, { useContext} from 'react'
import { useForm } from 'react-hook-form';
import { ProfileContext } from '../../contexts/ProfileContext'
import { API } from '../../services/api'
import './Profile.scss';

function Profile() {

  const {user, setUser} = useContext(ProfileContext);

  const { register, handleSubmit, reset } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, reset: reset2 } = useForm();

  const nameSubmit = (formData) => {
    const newUser = {...user, name: formData.name};
    setUser(newUser);
    API.put('/user/name', newUser).then(res => {
      if(res.status === 200) {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(newUser));
        reset();
      }
    });
  }

  const pictureSubmit = (formData) => {
    const newUser = {...user, picture: formData.picture};
    setUser(newUser);
    API.put('/user/picture', newUser).then(res => {
      if(res.status === 200) {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(newUser));
        reset2();
      }
    });
  }

  return (
    <div className='c-prof'>
      <h2>Nombre: {user.name}</h2>
      <img src={user.picture} alt='' />
      <form onSubmit={handleSubmit(nameSubmit)} className='c-change' key='name'>
        <input type='text' {...register('name', {required: true})} defaultValue='' placeholder='Introduce tu nuevo nombre.'></input>
        <button type='submit'>Cambia nombre</button>
      </form>
      <form onSubmit={handleSubmit2(pictureSubmit)} className='c-change' key='picture'>
        <input type='text' {...register2('picture', {required: true})} defaultValue='' placeholder='Introduce tu nueva imagen.'></input>
        <button type='submit'>Cambia imagen</button>
      </form>
    </div>
  )
}

export default Profile