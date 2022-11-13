import React, { useContext} from 'react';
import { useForm } from 'react-hook-form';
import { JwtContext} from '../../shared/contexts/JwTContext';
import { API } from '../../shared/services/api';
import './HomePage.scss';

function HomePage() {

  const { register, handleSubmit } = useForm();
  const { setJwt } = useContext(JwtContext);

    const onSubmit = formData => {
        API.post('/user/login', formData).then(res => {
          localStorage.setItem('token', res.data.token);
          setJwt(localStorage.getItem('token'));
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('inbox', JSON.stringify(res.data.user.inbox));
          localStorage.setItem('outbox', JSON.stringify(res.data.user.outbox));
        });
    }

  return (
        <div className='c-login'>
          <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='email'>Email</label>
          <input id='email' placeholder='Introduce tu email' type='email' {...register('email')} />
          <label htmlFor='password'>Password</label>
          <input id='password' placeholder='Introduce tu password' type='password' {...register('password')} />
          <button type='submit'>Login</button>
        </form>        
      </div> 
  )
}

export default HomePage