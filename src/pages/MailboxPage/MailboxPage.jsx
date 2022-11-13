/* eslint-disable no-unused-vars */
import { useState } from 'react';
import List from "../../shared/components/List/List";
import './MailboxPage.scss'
import { InboxContext, OutboxContext, ProfileContext } from '../../App'

function MailboxPage() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [inbox, setInbox] = useState(JSON.parse(localStorage.getItem('inbox')));

  const [outbox, setOutbox] = useState(JSON.parse(localStorage.getItem('outbox')));

  return (
    <ProfileContext.Provider value={{user, setUser}}>
      <InboxContext.Provider value={{inbox, setInbox}}>
        <OutboxContext.Provider value={{outbox, setOutbox}}>
          <List></List>
        </OutboxContext.Provider>
      </InboxContext.Provider>
    </ProfileContext.Provider>
  )
}

export default MailboxPage