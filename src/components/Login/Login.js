import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as validate from '../../validate/validate'
import * as api from '../../api/api'

import './login.css'

function Login(props) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            const res = await api.getUsers()
            setUsers(res)
        }
        getUsers()
    }, [])

    function login() {
        let userLogin = null
        let emailErrEl = document.querySelector('.login-email-err')
        let passErrEl = document.querySelector('.login-password-err')


        let emailErr = validate.validateEmail(email, users, null)
        let passErr = validate.validatePassword(password, email, users)
        emailErrEl.innerText = emailErr
        passErrEl.innerText = passErr

        if (emailErr !== '' || passErr !== '') return

        users.map(user => {
            if (user.email === email) {
                userLogin = user
                return
            }
        })
        props.login(userLogin)
    }


    return (
        <div className="login">
            <div className="form-login">
                <div className="login-img">
                    <Link to='/'>
                    <img src="https://accounts.fullstack.edu.vn/assets/icon/f8_icon.png" alt="F8" />
                    </Link>
                </div>
                <h2>Đăng nhập vào F8</h2>
                <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                        placeholder="Email..."
                        value={email}
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        onKeyUp={e => e.code === 'Enter' && login()} />
                </div>
                <span className="login-email-err"></span>
                <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                        placeholder="Password..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyUp={e => e.code === 'Enter' && login()} />
                </div>
                <span className="login-password-err"></span>
                <button
                    className="submit"
                    onClick={login} >Đăng nhập</button>
                <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            </div>
        </div>
    )
}

export default Login