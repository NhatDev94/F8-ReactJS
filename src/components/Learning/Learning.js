import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderLearning from "../../partials/HeaderLearning/HeaderLearning";
import { Link } from 'react-router-dom'
import * as api from '../../api/api'
import FormInput from "../../shared/FormInput/FormInput";
import Comment from "../../shared/Comment/Comment";
import * as sort from '../../service/sort'


import './learning.css'

function Learning(props) {
    let param = useParams()
    let [course, setCourse] = useState([])
    let [comments, setComments] = useState([])
    let [currLesson, setCurrLesson] = useState({})

    useEffect(() => {
        async function setUp() {
            // Lay Course hien tai
            const res = await api.getCourseById(param.id)
            setCourse(res)

            // Lay Lesson hien tai
            let f8Lesson = JSON.parse(localStorage.getItem('f8-curr-lesson'))
            if (f8Lesson) {
                setCurrLesson(f8Lesson)
                const comments = await api.getCommentsByLessonId(f8Lesson.lessonId)
                setComments(comments)
                return
            }
            res.lessons.forEach(async lesson => {
                if (lesson.begin) {
                    setCurrLesson(lesson)
                    localStorage.setItem('f8-curr-lesson', JSON.stringify(lesson))

                    // get Comments lan dau theo lessonId
                    const comments = await api.getCommentsByLessonId(lesson.lessonId)
                    setComments(comments)
                }
            })
        }


        setUp()
    }, [])

    function navHandle(e) {
        let left = e.closest('.left')
        let navElems = left.querySelectorAll('.nav-item')
        let playList = left.querySelector('.play-list')
        let listComment = left.querySelector('.list-comment')
        let id = e.getAttribute('id')
        navElems.forEach(e => {
            e.classList.remove('active')
        })
        e.classList.add('active')
        listComment.style.display = 'none'
        playList.style.display = 'none'
        if (id === 'play-list') {
            playList.style.display = 'block'
        }
        if (id === 'comments') {
            listComment.style.display = 'block'
        }
    }

    async function addComment(input) {
        const comment = {
            author: props.user.name,
            authorId: props.user.userId,
            authorImg: props.user.img,
            body: input,
            recomments: [],
            time: new Date().getTime(),
            commentId: Math.random(),
            lessonId: currLesson.lessonId
        }
        const res = await api.postComment(comment)
        getComments()
    }

    async function getComments() {
        const res = await api.getCommentsByLessonId(currLesson.lessonId)
        setComments(res)
    }

    async function lessonHandle(index) {
        setCurrLesson(course.lessons[index])
        localStorage.setItem('f8-curr-lesson', JSON.stringify(course.lessons[index]))
        const comments = await api.getCommentsByLessonId(course.lessons[index].lessonId)
        setComments(comments)
    }

    return (
        <div className="learning">
            <HeaderLearning title={course.name} />
            <div className="learning-main flex">
                <div className="left">
                    <div className="video">
                        VIDEO
                    </div>
                    <div className="left-content">
                        <div className="sub-nav flex">
                            <div
                                id="play-list"
                                className="nav-item"
                                onClick={e => navHandle(e.target)}>Nội dung</div>
                            <div
                                id="comments"
                                className="nav-item active"
                                onClick={e => navHandle(e.target)}>Tổng quan</div>
                            <div
                                id="note"
                                className="nav-item"
                                onClick={e => navHandle(e.target)}>Ghi chú</div>
                            <div
                                id="more"
                                className="nav-item"
                                onClick={e => navHandle(e.target)}>Liên quan</div>
                        </div>
                        <div className="list-comment">
                            <span>Tham gia nhóm <Link to="https://www.facebook.com/groups/f8official">Học lập trình tại F8</Link> trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️</span>
                            <span>Các bạn subscribe kênh Youtube <Link to="https://www.youtube.com/c/F8VNOfficial">F8 Official</Link> để nhận thông báo khi có các bài học mới nhé ❤️</span>
                            <div className="list-comment-header flex">
                                <h4>{comments.length} hỏi đáp</h4>
                                <div className="social flex">
                                    <p>CHIA SẺ</p>
                                    <i className="fab fa-facebook"></i>
                                    <i className="fas fa-envelope"></i>
                                    <i className="fas fa-link"></i>
                                </div>
                            </div>
                            <div className="list-comment-content">
                                <div className="form-add-comment">
                                    <FormInput
                                        getInput={addComment}
                                        submitName="Bình luận"
                                        addComment={true}
                                        user={props.user} />
                                </div>
                                <div className="comments-wrap">
                                    {
                                        comments && sort.sortByTime(comments).map((comment, index) => {
                                            if (comment.lessonId === currLesson.lessonId) {
                                                return <Comment
                                                    comment={comment}
                                                    key={index}
                                                    getComments={getComments}
                                                    user={props.user} />
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="play-list">
                            <div className="title-box">
                                <h4 className="title">{course.name}</h4>
                                <p className="time-line">Chưa hoàn thành bài học nào</p>
                            </div>
                            <div className="content">
                                {
                                    course.lessons && course.lessons.map((lesson, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={lesson.lessonId == currLesson.lessonId ? "lesson active" : "lesson"}
                                                onClick={() => lessonHandle(index)}
                                            >
                                                <h6 className="lesson-title">{index + 1}. {lesson.name}</h6>
                                                <span className="time">{lesson.time}</span>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="play-list">
                        <div className="title-box">
                            <h4 className="title">{course.name}</h4>
                            <p className="time-line">Chưa hoàn thành bài học nào</p>
                        </div>
                        <div className="content">
                            {
                                course.lessons && course.lessons.map((lesson, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={lesson.lessonId === currLesson.lessonId ? "lesson active" : "lesson"}
                                            onClick={() => lessonHandle(index)}
                                        >
                                            <h6 className="lesson-title">{index + 1}. {lesson.name}</h6>
                                            <span className="time">{lesson.time}</span>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Learning
