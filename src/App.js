import React from 'react';
import { useState } from 'react';
import './App.css';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import Login from './components/Login/Login';
import Learning from './components/Learning/Learning';
import Home from './components/Home/Home';
import Register from './components/Register/Register'
import NotFound from './partials/NotFound/NotFound'
import Road from './components/Road/Road';
import Courses from './components/Courses/Courses';
import Blogs from './components/Blogs/Blogs';


function App() {
  let f8 = JSON.parse(localStorage.getItem('f8-login'))
  let [user, setUser] = useState(f8 ? f8 : null)
  let navigate = useNavigate()

  function login(user) {
    success()
    localStorage.setItem('f8-login', JSON.stringify(user))
    setUser(user)
    navigate('')
  }

  function logOut() {
    localStorage.setItem('f8-login', JSON.stringify(null))
    localStorage.setItem('f8-curr-lesson', JSON.stringify(null))
    setUser(null)
  }

  function success() {
    let success = document.querySelector('.notice-fixed')
    success.classList.add('success')
    setTimeout(() => {
      success.classList.remove('success')
    }, 1500)
  }

  return (
    <div className="app">
      <div className='notice-fixed flex'>
        <div className='left'>
          <i className="fas fa-check-circle"></i>
        </div>
        <p className='notice-text'>Success</p>
      </div>
      <Routes>
        <Route path="/" element={<Home
          user={user}
          logOut={logOut} />} />
        <Route path="/learning/:id" element={user ? <Learning user={user} /> : <Login login={login} />} />
        <Route path="/road" element={<Road user={user} />} />
        <Route path="/courses" element={<Courses user={user} />} />
        <Route path="/blogs" element={<Blogs user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register success={success} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
