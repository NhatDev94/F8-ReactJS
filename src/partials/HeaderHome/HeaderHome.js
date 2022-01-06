import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './header.css'

function HeaderHome({ isLogin }) {
    let [isShowNotice, setIsShowNotice] = useState(false)
    let [isShowProfile, setIsShowProfile] = useState(false)
    let {pathname} = useLocation()
    

    useEffect(() => {
        window.addEventListener('click', e => {
            if (!e.target.matches('.notice') && !e.target.matches('.notice i')) {
                setIsShowNotice(false)
            }
            if (!e.target.matches('.user .img') && !e.target.matches('.user .img img')) {
                setIsShowProfile(false)
            }
        })
    }, [])


    function showMenu(target) {
        let menu = target.closest('.menu').querySelector('.menu-content')
        let overlay = target.closest('.menu').querySelector('.overlay')
        menu.style.transform = 'translateX(0)'
        overlay.style.display = 'block'
    }

    function hideMenu(target) {
        let menu = target.closest('.menu').querySelector('.menu-content')
        let overlay = target.closest('.menu').querySelector('.overlay')
        menu.style.transform = 'translateX(-100%)'
        overlay.style.display = 'none'
    }

    return (
        <div className='header-home flex'>
            <div className="left flex">
                <Link to="/" className="logo">
                    <img src="https://fullstack.edu.vn/assets/icon/f8_icon.png" alt="F8" />
                </Link>
                <div className="back flex">
                    <p className={pathname === '/' ? "" : "hide"}>Học lập trình để đi làm</p>
                    <Link to="/" className={pathname === '/' ? 'hide' : 'flex'} >
                        <i className="fas fa-angle-left"></i>
                        <p>QUAY LẠI</p>
                    </Link>
                </div>
                <div className="menu">
                    <i className="fas fa-bars" onClick={e => showMenu(e.target)}></i>
                    <div className='overlay' onClick={e => hideMenu(e.target)}></div>
                    <div className='menu-content'>
                        <i className="hide-menu fas fa-arrow-left" onClick={e => hideMenu(e.target)}></i>
                        <div className='img'>
                            <img src='https://cdn.fullstack.edu.vn/f8-production/user_photos/118755/61834b48637a8.jpg' alt='F8' />
                        </div>
                        <div className='menu-search'>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input placeholder="Tìm kiếm khóa học, bài viết, video, ..." />
                            </div>
                        </div>
                        <div className='menu-nav'>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-home"></i>
                                    Trang chủ
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/road">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-home"></i>
                                    Lộ trình
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/courses">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-home"></i>
                                    Khóa học
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/blogs">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-home"></i>
                                    Đọc Blog
                                </div>
                            </Link>
                        </div>
                        <div className='tag'>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='tag-item'>
                                    <i className="fas fa-home"></i>
                                    Bài viết đã lưu
                                </div>
                            </Link>
                        </div>
                        <div className='tag'>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='tag-item'>
                                    <i className="fas fa-home"></i>
                                    Giới thiệu
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='tag-item'>
                                    <i className="fas fa-home"></i>
                                    Cơ hội việc làm
                                </div>
                            </Link>
                        </div>
                        <div className='tag'>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='tag-item'>
                                    <i className="fas fa-home"></i>
                                    Đăng xuất
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="center flex">
                <div className="search">
                    <i className="fas fa-search"></i>
                    <input placeholder="Tìm kiếm khóa học, bài viết, video, ..." />
                </div>
            </div>
            <div className="right flex">
                <div className={isLogin ? "notice" : "hide"}>
                    <i className="fas fa-bell" onClick={() => setIsShowNotice(!isShowNotice)}></i>
                    <div className={isShowNotice ? 'notice-content' : 'hide'}>
                        <h6 className='notice-title'>Thông báo</h6>
                        <span>Chưa có thông báo nào.</span>
                    </div>
                </div>
                <div className={isLogin ? "user" : "hide"}>
                    <div className='img' onClick={() => setIsShowProfile(!isShowProfile)}>
                        <img src="https://cdn.fullstack.edu.vn/f8-production/user_photos/118755/61834b48637a8.jpg" alt="F8" />
                    </div>
                    <div className={isShowProfile ? 'user-profile': 'hide'}>
                        <div className='user-info flex'>
                            <div className='img'>
                                <img src='https://cdn.fullstack.edu.vn/f8-production/user_photos/118755/61834b48637a8.jpg' alt='F8' />
                            </div>
                            <div>
                                <h6>Nhat94</h6>
                                <p className='email'>@nhat94</p>
                            </div>
                        </div>
                        <div className='tag'>
                            <Link to="">Viết blog</Link>
                            <Link to="">Bài viết của tôi</Link>
                        </div>
                        <div className='tag'>
                            <Link to="">Bài viết đã lưu</Link>
                        </div>
                        <div className='tag'>
                            <Link to="">Cài đặt</Link>
                            <Link to="">Đăng xuất</Link>
                        </div>
                    </div>
                </div>
                <Link to="/login" className={isLogin ? "hide" : "login-btn"} >Đăng nhập</Link>
            </div>
        </div>
    )
}

export default HeaderHome