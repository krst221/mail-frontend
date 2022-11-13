/* eslint-disable no-unused-vars */
import { useState } from 'react';
import List from "../../shared/components/List/List";
import './MailboxPage.scss'
import { ProfileContext } from '../../shared/contexts/ProfileContext'
import { InboxContext } from '../../shared/contexts/InboxContext'
import { OutboxContext } from '../../shared/contexts/OutboxContext'
import { ToggleContext } from '../../shared/contexts/ToggleContext'

function MailboxPage() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [inbox, setInbox] = useState(JSON.parse(localStorage.getItem('inbox')));

  const [outbox, setOutbox] = useState(JSON.parse(localStorage.getItem('outbox')));

  const [toggle, setToggle] = useState(0);

  return (
    <ProfileContext.Provider value={{user, setUser}}>
      <InboxContext.Provider value={{inbox, setInbox}}>
        <OutboxContext.Provider value={{outbox, setOutbox}}>
          <ToggleContext.Provider value={{toggle, setToggle}}>
            <List></List>
          </ToggleContext.Provider>
        </OutboxContext.Provider>
      </InboxContext.Provider>
    </ProfileContext.Provider>
  )
}

export default MailboxPage