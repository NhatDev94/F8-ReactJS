import { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import SearchResult from '../../shared/SearchResult/SearchResult'
import * as api from '../../api/api'

import './header.css'

function HeaderHome(props) {
    let [isShowNotice, setIsShowNotice] = useState(false)
    let [isShowProfile, setIsShowProfile] = useState(false)
    let [search, setSearch] = useState('')
    let [coursesResult, setCoursesResult] = useState([])
    let [blogsResult, setBlogsResult] = useState([])
    let [showResult, setShowResult] = useState(false)

    let {pathname} = useLocation()

    let i = props.user && props.user.email.indexOf('@')
    let emailLeft = props.user && props.user.email.substring(0, i)
    
    useEffect(() => {
        window.addEventListener('click', clickHandle)
        return () => window.removeEventListener('click', clickHandle)
    }, [])

    function logOut() {
        props.logOut()
    }

    function clickHandle(e) {
        if (!e.target.matches('.notice') && !e.target.matches('.notice i')) {
            setIsShowNotice(false)
        }
        if (!e.target.matches('.user .img') && !e.target.matches('.user .img img')) {
            setIsShowProfile(false)
        }
        if (!e.target.matches('.search') 
            && !e.target.matches('.search input')
            && !e.target.matches('.search i')
            && !e.target.matches('.search .search-result')) {
            setShowResult(false)
        }
    }

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

    function onChangeHandle(target) {
        setSearch(target.value)
        setShowResult(false)
    }

    async function searchHandle(target) {
        console.log(target);
        if (search.trim() === '') return
        let courses = await api.getCourses()
        let blogs = await api.getBlogsAndVideos()
        let coursesResult = []
        let blogsResult = []
        courses.forEach(course => {
            if (course.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) {
                coursesResult = [...coursesResult, course]
            }
        })
        blogs.forEach(blog => {
            if (blog.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) {
                blogsResult = [...blogsResult, blog]
            }
        })
        setCoursesResult(coursesResult)
        setBlogsResult(blogsResult)
        setShowResult(true)
    }

    return (
        <div className='header-home flex'>
            <div className="left flex">
                <Link to="/" className="logo">
                    <img src="https://fullstack.edu.vn/assets/icon/f8_icon.png" alt="F8" />
                </Link>
                <div className="back flex">
                    <p className={pathname === '/' ? "" : "hide"}>H???c l???p tr??nh ????? ??i l??m</p>
                    <Link to="/" className={pathname === '/' ? 'hide' : 'flex'} >
                        <i className="fas fa-angle-left"></i>
                        <p>QUAY L???I</p>
                    </Link>
                </div>
                <div className="menu">
                    <i className="fas fa-bars" onClick={e => showMenu(e.target)}></i>
                    <div className='overlay' onClick={e => hideMenu(e.target)}></div>
                    <div className='menu-content'>
                        <i className="hide-menu fas fa-arrow-left" onClick={e => hideMenu(e.target)}></i>
                        {
                            props.user && <div className='img'>
                                                <img src={props.user && props.user.img} alt='F8' />
                                            </div>
                        }
                        <div className='menu-search'>
                            <div className="search">
                                <i 
                                    className="menu-search-icon fas fa-search"
                                    onClick={e => searchHandle(e.target)}
                                ></i>
                                <input 
                                    placeholder="T??m ki???m kh??a h???c, b??i vi???t, video, ..." 
                                    value={search}
                                    onChange={e => onChangeHandle(e.target)}
                                    onKeyUp={e => e.code === 'Enter' && searchHandle()}
                                />
                                <div className={showResult ? 'result' : 'hide'}>
                                    <SearchResult courses={coursesResult} blogs={blogsResult} search={search} />
                                </div>
                            </div>
                        </div>
                        {
                            !props.user && <div className='tag tag-login'>
                                                <Link to="/login">
                                                    <div className='tag-item'>
                                                        <i className="fas fa-sign-in-alt"></i>
                                                        ????ng nh???p
                                                    </div>
                                                </Link>
                                            </div>
                        }
                        <div className='menu-nav'>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-home"></i>
                                    Trang ch???
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/road">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-hiking"></i>
                                    L??? tr??nh
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/courses">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-lightbulb"></i>
                                    Kh??a h???c
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/blogs">
                                <div className='menu-nav-item'>
                                    <i className="fas fa-newspaper"></i>
                                    ?????c Blog
                                </div>
                            </Link>
                        </div>
                        {
                            props.user && <div className='tag'>
                                                <Link onClick={e => hideMenu(e.target)} to="/">
                                                    <div className='tag-item'>
                                                        <i className="fas fa-flag"></i>
                                                        B??i vi???t ???? l??u
                                                    </div>
                                                </Link>
                                            </div>
                        }
                        <div className='tag'>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='tag-item'>
                                    <i className="fas fa-info-circle"></i>
                                    Gi???i thi???u
                                </div>
                            </Link>
                            <Link onClick={e => hideMenu(e.target)} to="/">
                                <div className='tag-item'>
                                    <i className="fas fa-users"></i>
                                    C?? h???i vi???c l??m
                                </div>
                            </Link>
                        </div>
                        {
                            props.user && <div className='tag'>
                                                <Link to="/login" onClick={e => hideMenu(e.target)}>
                                                    <div className='tag-item' onClick={logOut}>
                                                        <i className="fas fa-sign-out-alt"></i>
                                                        ????ng xu???t
                                                    </div>
                                                </Link>
                                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="center flex">
                <div className="search">
                    <i 
                        className="search-icon fas fa-search"
                        onClick={e => searchHandle(e.target)}
                    ></i>
                    <input 
                        placeholder="T??m ki???m kh??a h???c, b??i vi???t, video, ..." 
                        value={search}
                        onChange={e => onChangeHandle(e.target)}
                        onKeyUp={e => e.code === 'Enter' && searchHandle(e.target)}
                    />
                    <div className={showResult ? 'result' : 'hide'}>
                        <SearchResult courses={coursesResult} blogs={blogsResult} search={search} />
                    </div>
                </div>
            </div>
            <div className="right flex">
                <div className={props.user ? "notice" : "hide"}>
                    <i className="fas fa-bell" onClick={() => setIsShowNotice(!isShowNotice)}></i>
                    <div className={isShowNotice ? 'notice-content' : 'hide'}>
                        <h6 className='notice-title'>Th??ng b??o</h6>
                        <span>Ch??a c?? th??ng b??o n??o.</span>
                    </div>
                </div>
                <div className={props.user ? "user" : "hide"}>
                    <div className='img' onClick={() => setIsShowProfile(!isShowProfile)}>
                        <img src={props.user && props.user.img} alt="F8" />
                    </div>
                    <div className={isShowProfile ? 'user-profile': 'hide'}>
                        <div className='user-info flex'>
                            <div className='img'>
                                <img src={props.user && props.user.img} alt='F8' />
                            </div>
                            <div>
                                <h6>{props.user && props.user.name}</h6>
                                <p className='email'>@{emailLeft}</p>
                            </div>
                        </div>
                        <div className='tag'>
                            <Link to="/">Vi???t blog</Link>
                            <Link to="/">B??i vi???t c???a t??i</Link>
                        </div>
                        <div className='tag'>
                            <Link to="/">B??i vi???t ???? l??u</Link>
                        </div>
                        <div className='tag'>
                            <Link to="/">C??i ?????t</Link>
                            <Link to="/login" onClick={logOut}>????ng xu???t</Link>
                        </div>
                    </div>
                </div>
                <Link to="/login" className={props.user ? "hide" : "login-btn"} >????ng nh???p</Link>
            </div>
        </div>
    )
}

export default HeaderHome