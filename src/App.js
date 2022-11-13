/* eslint-disable no-unused-vars */
import './App.scss';
import { Link, Route, Routes, BrowserRouter as Router, NavLink } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import MailboxPage from './pages/MailboxPage/MailboxPage';
import React, { useState } from 'react';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { JwtContext } from './shared/contexts/JwTContext';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RequireAuth from './shared/components/RequireAuth/RequireAuth';

export const ProfileContext = React.createContext();
export const InboxContext = React.createContext();
export const OutboxContext = React.createContext();

function App() {

  const [jwt, setJwt] = useState(localStorage.getItem('token') || null);

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      <Router>
        <div className="App">
          <header className='c-header'>
            <nav>
              <Link to='/'>Home</Link>
              {jwt && <NavLink to='/mailbox'>Mailbox</NavLink>}
              {!jwt && <NavLink  to='/register'>Register</NavLink>}
            </nav>
          </header>
          <main>
            <Routes>
              <Route path='/' element={jwt ? <ProfilePage /> : <HomePage/>} />
              <Route path='/mailbox' element={<RequireAuth><MailboxPage /></RequireAuth>} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </main> 
        </div>
      </Router>
    </JwtContext.Provider>
  );
}

export default App;
