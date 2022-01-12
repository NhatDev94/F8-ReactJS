import React from "react";
import { Link } from 'react-router-dom'
import HeaderHome from "../../partials/HeaderHome/HeaderHome";
import SideBar from "../../partials/SideBar/SideBar";
import Footer from "../../partials/Footer/Footer";


import './blogs.css'

function Blogs(props) {

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
                            <div className="blog-item">
                                <div className="author-box flex">
                                    <div className="author flex">
                                        <div className="avatar">
                                            <img src="https://avatar-redirect.appspot.com/google/111127707619781587452?size=400" alt="f8" />
                                        </div>
                                        <Link to="/F8-ReactJS">
                                            <h6 className="name">Dong Ngo</h6>
                                        </Link>
                                    </div>
                                    <div className="action flex">
                                        <i className="far fa-bookmark"></i>
                                        <i className="fas fa-ellipsis-h"></i>
                                    </div>
                                </div>
                                <div className="content-box flex">
                                    <div className="left">
                                        <Link to="/F8-ReactJS">
                                            <h2 className="content-title">Thoi gian va dong luc</h2>
                                        </Link>
                                        <p className="content">
                                            Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là “timetable”.
                                            Hay dân dã hơn thì người ta hay gọi là “Lịch thường nhật”, còn đối với
                                            học sinh, sinh viên gọi là “thời khóa biểu”.
                                        </p>
                                        <div className="time-box flex">
                                            <span className="createdDate">8 ngay truoc</span>
                                            <span className="time-read">6 phut doc</span>
                                        </div>
                                    </div>
                                    <div className="img">
                                        <Link to="/F8-ReactJS">
                                            <img src="https://cdn.fullstack.edu.vn/f8-production/blog_posts/1671/61b6368a3a089.jpg" alt="f8" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
