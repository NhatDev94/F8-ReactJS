import React from 'react'
import './footer.css'

function Footer(props) {

    return (
        <div className='footer flex'>
            <div className='footer-nav flex'>
                <div className='footer-logo'>
                    <img src='https://fullstack.edu.vn/assets/icon/f8_icon.png' />
                </div>
                <p className='footer-nav-item' >Giới thiệu</p>
                <p className='footer-nav-item' >Cơ hội việc làm</p>
                <p className='footer-nav-item' >Đối tác <i className="fas fa-angle-up"></i></p>
            </div>
            <div className='social flex'>
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-youtube-square"></i>
            </div>
        </div>
    )
}

export default Footer