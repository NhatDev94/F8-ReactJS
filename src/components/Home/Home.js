import React, { useState, useEffect } from "react";
import HeaderHome from "../../partials/HeaderHome/HeaderHome";
import Footer from '../../partials/Footer/Footer'
import SideBar from "../../partials/SideBar/SideBar";
import SlideScroll from '../../shared/SlideScroll/SlideScroll'
import Hero from './Hero/Hero'
import * as api from '../../api/api'

import './home.css'


function Home(props) {
    let [courses, setCourses] = useState([])
    let [blogs, setBlogs] = useState([])


    useEffect(() => {
        async function getCourses() {
            const res = await api.getCourses()
            setCourses(res)
        }
        
        async function getBlogsAndVideos() {
            const res = await api.getBlogsAndVideos()
            setBlogs(res)
        }
        getCourses()
        getBlogsAndVideos()

    }, [])

    return (
        <div className="home">
            <HeaderHome
                user={props.user}
                logOut={props.logOut}
            />
            <div className="main">
                <div className="sidebar-wrap">
                    <SideBar />
                </div>
                <div className="main-content">
                    <Hero />
                    <p className='subscriber'><span>122.107+</span> người khác đã học</p>
                    <SlideScroll title="Các khóa học" type="courses" items={courses} to='/courses' />
                    <SlideScroll title="Bài viết nổi bật" type="blogs" items={blogs} to='/blogs' />
                    {/* Video chua lam voi */}
                    {/* <SlideScroll title="Video nổi bật" type="videos" items={blogs} to='#' /> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home