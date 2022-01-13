import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer(props) {

    return (
        <div className='footer flex'>
            <div className='footer-nav flex'>
                <div className='footer-logo'>
                    <Link to='/' >
                        <img src='https://fullstack.edu.vn/assets/icon/f8_icon.png' alt='F8' />
                    </Link>
                </div>
                <p className='footer-nav-item' >Giới thiệu</p>
                <p className='footer-nav-item' >Cơ hội việc làm</p>
                <p className='footer-nav-item' >Đối tác <i className="fas fa-angle-up"></i></p>
            </div>
            <div className='social flex'>
                <a href='https://www.facebook.com/groups/649972919142215'>
                    <i className="fab fa-facebook-square"></i>
                </a>
                <a href='https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw'>
                    <i className="fab fa-youtube-square"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer