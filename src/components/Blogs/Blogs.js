import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import HeaderHome from "../../partials/HeaderHome/HeaderHome";
import SideBar from "../../partials/SideBar/SideBar";
import Footer from "../../partials/Footer/Footer";
import * as api from '../../api/api'


import './blogs.css'
import BlogDetail from "../../shared/BlogDetail/BlogDetail";

function Blogs(props) {
    let [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function getBlogs() {
            const res = await api.getBlogsAndVideos()
            setBlogs(res)
        }

        getBlogs()
    }, [])

    return (
        <div className="blogs">
            <HeaderHome
                user={props.user}
                logOut={props.logOut} />
            <div className="main">
                <div className="sidebar-wrap">
                    <SideBar />
                </div>
                <div className="main-content">
                    <div className="blogs-left">
                        <div className="title">
                            <h2 className="title-content">Phù hợp với bạn</h2>
                        </div>
                        <div className="blog-list">
                            {
                                blogs && blogs.map((blog, index) => {
                                    return <BlogDetail blog={blog} key={index} />
                                })
                            }
                        </div>
                    </div>
                    <div className="blog-right">

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Blogs

