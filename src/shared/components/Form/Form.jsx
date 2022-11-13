import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { ProfileContext } from '../../../App';
import { API } from '../../services/api'
import './Form.scss';

function Form() {

  const {user} = useContext(ProfileContext);

  const [mail, setMail] = useState();

  const [userList, setUserList] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    API.get('/user').then(res => {
      const users = res.data;
      setUserList(users);
  });
  }, [])

  const handleChange = (event) => {
    setMail(event.email);
  }

  const mailSubmit = (formData) => {
    if(mail){
      const body = {
        send: user._id,
        receive: mail,
        title: formData.title,
        text: formData.text
      }
      setMail();
      API.put('/mail', JSON.stringify(body)).then(res => {
        console.log(res.status);
      });
      API.post('user/getUser', user).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('inbox', JSON.stringify(res.data.inbox));
        localStorage.setItem('outbox', JSON.stringify(res.data.outbox));
      });
      reset();
    }
    else console.log('Select a mail!');
  };

  return (
    <>
      <h2>Send new mail</h2>
      <form onSubmit={handleSubmit(mailSubmit)}>
        {userList.length > 0 && <Select className='c-select' placeholder={'Select a mail...'}
          options={userList} getOptionLabel={(option) => `${option.name} (${option.email})`}
          getOptionValue={(option) => option.email} onChange={handleChange}/>}
        <input type='text' {...register('title', {required: true})} defaultValue='' placeholder='Title'></input>
        <textarea rows="20" cols="20" {...register('text', {required: true})} defaultValue='' placeholder='Message'></textarea>
        <button type='submit'>Envia correo</button>
      </form>
    </>
  )
}

export default Form