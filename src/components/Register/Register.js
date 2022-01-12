import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import * as validate from '../../validate/validate'
import * as api from '../../api/api'

import './register.css'

function Register(props) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [userName, setUserName] = useState('')
    let [users, setUser] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        async function getUsers() {
            const res = await api.getUsers()
            setUser(res)
        }
        getUsers()
    },[])

    let imgDefaults = [
        'https://media.ohay.tv/v1/upload/content/2017-06/19/25444-63359b4f67df72ba53d1ab0a5e92e34e-ohaytv.jpg',
        'https://tindongvat.com/wp-content/uploads/2020/04/cho-alaska-cute.jpg',
        'https://anhdep123.com/wp-content/uploads/2020/05/%E1%BA%A3nh-ch%C3%B3-con.jpg',
        'http://daihocthuyhanoi.edu.vn/assets/uploads/news/images/anh-dom-chan-scaled-e1630913055964-696x446.jpg',
        'https://daohieu.com/wp-content/uploads/2020/05/meo-con.jpg',
        'https://petshopzuzu.com/wp-content/uploads/2021/10/meo-anh-long-ngan.jpg',
        'https://thudaumot.edu.vn/wp-content/uploads/2021/03/cach-cham-soc-meo-con.jpg'
    ]

    async function register() {
        let emailErrEl = document.querySelector('.register-email-err')
        let userNameErrEl = document.querySelector('.register-userName-err')
        let passwordErrEl = document.querySelector('.register-password-err')

        let emailErr = validate.validateEmail(email, users, 'register')
        let userNameErr = validate.validateUserName(userName)
        let passwordErr = validate.validatePassword(password, null, null)

        emailErrEl.innerText = emailErr
        userNameErrEl.innerText = userNameErr
        passwordErrEl.innerText = passwordErr

        if (emailErr !== '' || userNameErr !== '' || passwordErr !== '') return
        setEmail('')
        setUserName('')
        setPassword('')
        let user = {
            userId: Math.random(),
            email: email,
            name: userName,
            password: password,
            img: imgDefaults[Math.round(Math.random(1) * (imgDefaults.length - 1))]
        }
        props.success()
        const res = await api.regester(user)
        navigate('/login')
    }

    return (
        <div className="register">
            <div className="form-register">
                <div className="register-img">
                    <Link to='/'>
                        <img src="https://accounts.fullstack.edu.vn/assets/icon/f8_icon.png" alt="F8" />
                    </Link>
                </div>
                <h2>Đăng ký F8</h2>
                <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input 
                        placeholder="Email..." 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        onKeyUp={e => e.code === 'Enter' && register()} />
                </div>
                <span className="register-email-err"></span>
                <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input 
                        placeholder="UserName..." 
                        value={userName} 
                        onChange={e => setUserName(e.target.value)}
                        onKeyUp={e => e.code === 'Enter' && register()} />
                </div>
                <span className="register-userName-err"></span>
                <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input 
                        type='password' 
                        placeholder="Password..." 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        onKeyUp={e => e.code === 'Enter' && register()} />
                </div>
                <span className="register-password-err"></span>
                <button
                    className="submit"
                    onClick={register} >Đăng ký</button>
                <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </div>
        </div>
    )
}

export default Register