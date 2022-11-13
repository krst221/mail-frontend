import React, { useContext, useEffect} from 'react'
import { ProfileContext } from '../../contexts/ProfileContext';
import { InboxContext } from '../../contexts/InboxContext';
import { OutboxContext } from '../../contexts/OutboxContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import Loading from '../Loading/Loading';
import Mail from '../Mail/Mail';
import { API } from '../../services/api';
import Form from '../Form/Form';
import './List.scss'

function List() {

  const {user} = useContext(ProfileContext);

  const {inbox} = useContext(InboxContext);

  const {outbox} = useContext(OutboxContext);

  const {toggle, setToggle} = useContext(ToggleContext);

  useEffect(() => {

    API.post('user/getUser', user).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
    });

    localStorage.setItem('inbox', JSON.stringify(user.inbox));
    localStorage.setItem('outbox', JSON.stringify(user.outbox));

  }, [user.inbox, user.outbox, user]);


  return (
    <>
       {user ? 
        <div data-testid='lista' className='c-inbox'>
        <button onClick={() => setToggle(0)}>Inbox</button><button onClick={() => setToggle(1)}>Outbox</button><button onClick={() => setToggle(2)}>New mail</button>
          {toggle === 0 && <> 
          <h2>Inbox</h2>
          {inbox.length < 1 ? <Loading /> : <div className='c-mails'>{[...inbox].reverse().map((inb) => <Mail key={new Date().getTime()*Math.random()} mail={inb} /> )}</div>}
          </>}
          {toggle === 1 && <> 
          <h2>Outbox</h2>
          {outbox.length < 1 ? <Loading /> : <div className='c-mails'>{[...outbox].reverse().map((outb) => <Mail key={new Date().getTime()*Math.random()} mail={outb} /> )}</div>}
          </>}
          {toggle === 2 && <Form></Form>}
        </div> 
        : '' } 
    </> 
  )
}

export default List