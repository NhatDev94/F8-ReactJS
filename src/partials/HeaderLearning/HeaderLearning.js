import React from "react";
import { Link } from 'react-router-dom'

import './headerLearning.css'

function HeaderLearning(props) {

    return (
        <div className="header flex">
            <div className="header-left flex">
                <Link to="/F8-ReactJS">
                    <i className="fas fa-angle-left"></i>
                </Link>
                <div className="logo">
                    <Link to="/F8-ReactJS"><img src="https://fullstack.edu.vn/assets/images/f8_text_logo.png" alt="logo" /></Link>
                </div>
                <div className="course-title">
                    {props.title}
                </div>
            </div>
            <div className="header-right flex">
                <i className="fas fa-question-circle"></i>
                <span>Hướng dẫn</span>
            </div>
        </div>
    )
}

export default HeaderLearning