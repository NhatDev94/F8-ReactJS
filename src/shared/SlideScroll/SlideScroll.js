import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogItem from '../BlogItem/BlogItem'
import Course from '../Course/Course'
// import Video from '../Video/Video'
import './slideScroll.css'

function SlideScroll(props) {
    const SCROLL_WIDTH = 700

    function scrollHandle(target, arrow) {
        let closest = target.closest('.scroll-wrap')
        let scrollContent = closest.querySelector('.scroll-content')
        let courseItem = closest.querySelectorAll('.scroll-content .item')
        let listWidth = courseItem[0].clientWidth * courseItem.length
        let leftBtn = closest.querySelector('.pre')
        let rightBtn = closest.querySelector('.next')
        let scrollWidth = null
        scrollWidth = arrow === 'next' ? SCROLL_WIDTH : -SCROLL_WIDTH
        scrollContent.scrollTo({
            top: 0,
            left: scrollContent.scrollLeft + scrollWidth,
            behavior: 'smooth'
        })
        if (arrow === "next") {
            leftBtn.style.display = "flex"
            if (scrollContent.scrollLeft + scrollWidth >= listWidth - SCROLL_WIDTH) {
                rightBtn.style.display = "none"
            }
            return
        }
        if (arrow === 'pre') {
            rightBtn.style.display = 'flex'
            if (scrollContent.scrollLeft + scrollWidth <= 0) {
                leftBtn.style.display = "none"
            }
            return
        }
    }

    return (
        <div className='scroll-wrap'>
            <div className='title-box flex'>
                <h2 className='title'>{props.title}</h2>
                <Link to={props.to} className='viewAll flex'>
                    <p>Xem tấc cả</p>
                    <i className="fas fa-angle-right"></i>
                </Link>
            </div>
            <div className='scroll-content flex'>
                {
                    props.items && props.items.map((item, index) => {
                        // Thay lai bang course
                        if (props.type === 'courses') {
                            return <Course course={item} key={index} />
                        }
                        if (props.type === 'blogs') {
                            return <BlogItem blog={item} key={index} />
                        }
                        if (props.type === 'videos') {
                            return <BlogItem blog={item} key={index} />
                        }
                    })
                }
            </div>
            <div className='control flex'>
                <div
                    className='arrow pre'
                    onClick={(e) => scrollHandle(e.target, 'pre')}
                >
                    <i className="fas fa-angle-left"></i>
                </div>
                <div
                    className='arrow next'
                    onClick={(e) => scrollHandle(e.target, 'next')}
                >
                    <i className="fas fa-angle-right"></i>
                </div>
            </div>
        </div>
    )
}

export default SlideScroll