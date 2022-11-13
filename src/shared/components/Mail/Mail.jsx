/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { API } from '../../services/api';
import './Mail.scss';

function Mail({mail}) {

  const [body, setBody] = useState([]);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
      const mId = [mail];
      API.post('/mail/getMail', mId).then((res) => {
        if(res.status === 200) setBody([...body, res.data]);
      });

  }, [])

  const deleteMail = () => {
    API.put('/mail/delete', body[0]).then((res) => {
      if(res.status === 200) {
        API.post('/user/getUser/id', body[0]).then(res => {
          console.log(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('inbox', JSON.stringify(res.data.inbox));
          localStorage.setItem('outbox', JSON.stringify(res.data.outbox));
        });
      }
    });
  }
  
  return (
    <>
      {body[0] && 
        <div className='c-mail'>
          <div className='c-mail--title' onClick={() =>setToggle(!toggle)}>
            <h3>Título: {body[0].title}</h3>
            <button onClick={() => deleteMail()}>x</button>
          </div>
          {toggle && 
            <>
              <h5>Recibido el: {(new Date(body[0].createdAt).getDay()+6) + '/' + (new Date(body[0].createdAt).getMonth()+1) + '/' + new Date(body[0].createdAt).getUTCFullYear() + ' ' + (new Date(body[0].createdAt).getHours()).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping: false}) + ':' + new Date(body[0].createdAt).getMinutes().toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping: false}) + ':' + new Date(body[0].createdAt).getSeconds().toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping: false})}</h5>
              <div className='c-mail--text'>
                {body[0].text}
              </div>
            </>
          }
        </div>
      }
    </>
  )
}

export default Mail