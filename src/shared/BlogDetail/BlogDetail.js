import React from "react";
import { Link } from 'react-router-dom'

import './blogDetail.css'

function BlogDetail(props) {

    return (
        <div className="blog-item">
            <div className="author-box flex">
                <div className="author flex">
                    <div className="avatar">
                        <img src={props.blog.authorImg} alt="f8" />
                    </div>
                    <Link to="/">
                        <h6 className="name">{props.blog.author}</h6>
                    </Link>
                </div>
                <div className="action flex">
                    <i className="far fa-bookmark"></i>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div className="content-box flex">
                <div className="left">
                    <Link to="/">
                        <h2 className="content-title">{props.blog.title}</h2>
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
                    <Link to="/">
                        <img src={props.blog.img} alt="f8" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail