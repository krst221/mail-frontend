/* eslint-disable no-unused-vars */
import React, { useContext} from 'react'
import { useForm } from 'react-hook-form';
import { ProfileContext } from '../../../App'
import { API } from '../../services/api'
import './Profile.scss';

function Profile() {

  const {user, setUser} = useContext(ProfileContext);

  const { register, handleSubmit, reset } = useForm();

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

  return (
    <div>
      <h2>Name: {user.name}</h2>
      <form onSubmit={handleSubmit(nameSubmit)}>
        <input type='text' {...register('name', {required: true})} defaultValue=''></input>
        <button type='submit'>Cambia nombre</button>
      </form>
    </div>
  )
}

export default Profile