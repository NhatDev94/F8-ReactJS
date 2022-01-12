import React, { useEffect, useState } from "react";
import Course from '../../shared/Course/Course'
import Footer from "../../partials/Footer/Footer";
import SideBar from "../../partials/SideBar/SideBar";
import HeaderHome from "../../partials/HeaderHome/HeaderHome";

import './courses.css'

function Courses(props) {
    let [courses, setCourese] = useState([])

    useEffect(() => {
        async function getCourses() {
            const res = await fetch('https://61c2edf79cfb8f0017a3e787.mockapi.io/Courses')
                .then(res => res.json())
            setCourese(res)
        }
        getCourses()
    }, [])
    return (
        <div className="courses">
            <HeaderHome
                user={props.user}
                logOut={props.logOut} />
            <div className="main">
                <div className="sidebar-wrap">
                    <SideBar />
                </div>
                <div className="main-content">
                    <h2 className="title">Khóa học nổi bật</h2>
                    <div className="list-course flex">
                        {
                            courses && courses.map((course, index) => {
                                return <Course course={course} key={index} />
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Courses
