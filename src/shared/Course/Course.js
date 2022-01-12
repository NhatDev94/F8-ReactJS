import React from 'react'
import { Link } from 'react-router-dom'

import './course.css'

function Course(props) {

    return (
        <div className='course item'>
            <Link to={`/learning/${props.course.courseId}`}>
                <div className='course-img'>
                    <img src={props.course.urlImg} />
                </div>
            </Link>
            <Link to={`/learning/${props.course.courseId}`}>
                <h4 className='course-title'>{props.course.name}</h4>
            </Link>
            <div className='view'>
                <i className="fas fa-users"></i>
                <span>{props.course.view}</span>
            </div>
        </div>
    )
}

export default Course