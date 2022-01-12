import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        'https://thudaumot.edu.vn/wp-content/uploads/2021/03/cach-cham-soc-meo-con.jpg',
        'http://hanoimoi.com.vn/Uploads/images/phananh/2020/06/05/ronaldo.jpg',
        'https://image-us.24h.com.vn/upload/1-2022/images/2022-01-11/beck-3-1641886736-689-width640height480.jpg',
        'https://znews-photo.zadn.vn/w660/Uploaded/neg_yslewlx/2020_09_19/gettyimages_928117626_e1533912275830_1.jpg',
        'https://www.focus2move.com/wp-content/uploads/2020/08/Tesla-Roadster-2020-1024-03.jpg',
        'https://www.motorbiscuit.com/wp-content/uploads/2021/09/Aston-Martin-Valkyrie-1024x681.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Lamborghini/Urus/4418/Lamborghini-Urus-V8/1621927166506/front-left-side-47.jpg',
        'https://znews-photo.zadn.vn/w660/Uploaded/ngogtn/2020_10_05/AnneHathawayHotwallpaperhd.jpg',
        'https://znews-photo.zadn.vn/w660/Uploaded/bzwvopcg/2020_11_24/nangthoo.jpg',
        'https://housedesign.vn/wp-content/uploads/2019/12/phong-cach-kien-truc.jpg',
        'https://danviet.mediacdn.vn/2020/11/4/logo-1-1604488421903112547204.jpg'
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