import React from "react";
import { Link } from "react-router-dom";

import './searchResult.css'

function SearchResult(props) {

    return (
        <div className="search-result">
            <div className="top flex">
                <i className="fas fa-search"></i>
                <p>Kết quả cho '{props.search}' </p>
            </div>
            {
                props.courses.length > 0 && <div className={props.courses ? 'catalog' : 'hide'}>
                                                <h2 className="result-title">KHOÁ HỌC</h2>
                                                    {
                                                        props.courses.length > 0 && props.courses.map((course, index) => {
                                                            return <Link to={`/learning/${course.courseId}`} key={index}>
                                                                        <div className="result-item flex" >
                                                                            <div className="img">
                                                                                <img src={course.urlImg} />
                                                                            </div>
                                                                            <h6>{course.name}</h6>
                                                                        </div>
                                                                    </Link>
                                                        })
                                                    }
                                            </div>
            }

            {
                props.blogs.length > 0 && <div className={props.blogs ? 'catalog' : 'hide'}>
                                                <h2 className="result-title">BÀI VIẾT</h2>
                                                {
                                                    props.blogs.length > 0 && props.blogs.map((blog, index) => {
                                                        return <Link to='/blogs' key={index}>
                                                                    <div className="result-item flex">
                                                                        <div className="img">
                                                                            <img src={blog.img} />
                                                                        </div>
                                                                        <h6>{blog.title}</h6>
                                                                    </div>
                                                                </Link>
                                                    })
                                                }
                                            </div>
            }
        </div>
    )
}

export default SearchResult