import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { API } from '../../shared/services/api'
import './RegisterPage.scss'

function RegisterPage() {

  let navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (formData) => {
    API.post('/user/register', formData).then(() => {
      reset();
      navigate('/');
    }
    );
  }

  return (
    <div className='c-register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Nombre</label>
        <input type='text' placeholder='Introduce tu nombre' {...register('name', {required: true})} />
        <label htmlFor='email'>Email</label>
        <input type='email' placeholder='Introduce tu email' {...register('email', {required: true})} />
        <label htmlFor='password'>Password</label>
        <input placeholder='Introduce tu password' type='password' {...register('password', {required: true})} />
        <button type='submit'>Registrar</button>
    </form>
    </div>
  )
}

export default RegisterPage