import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderLearning from "../../partials/HeaderLearning/HeaderLearning";
import { Link } from 'react-router-dom'
import * as api from '../../api/api'
import './learning.css'
import FormInput from "../../shared/FormInput/FormInput";
import Comment from "../../shared/Comment/Comment";

function Learning(props) {
    let param = useParams()
    let [course, setCourse] = useState([])
    let [comments, setComments] = useState([])
    let [currLesson, setCurrLesson] = useState({})

    useEffect(() => {
        async function getCourseAndCurrLesson() {
            const res = await api.getCourseById(param.id)
            res.lessons.forEach(lesson => {
                if (lesson.begin) {
                    setCurrLesson(lesson)
                    getCommentsByLessonId(lesson.lessonId)
                    return
                }
            })
            setCourse(res)
        }
        getCourseAndCurrLesson()
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

    async function getCommentsByLessonId(lessonId) {
        const res = await api.getCommentsByLessonId(lessonId)
        setComments(res)
    }

    async function addComment(input) {
        const comment = {
            author: props.user.name,
            authorId: props.user.userId,
            authorImg: props.user.img,
            body: input,
            recomments: [],
            time: "2 ngay truoc",
            commentId: Math.random(),
            lessonId: currLesson.lessonId
        }
        const res = await api.postComment(comment)
        getCommentsByLessonId(currLesson.lessonId)
    }

    function lessonHandle(target) {

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
                                <h4>608 hỏi đáp</h4>
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
                                        comments && comments.map((comment, index) => {
                                            if (comment.lessonId == currLesson.lessonId) {
                                                return <Comment
                                                    comment={comment}
                                                    key={index}
                                                    getCommentsByLessonId={getCommentsByLessonId}
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
                                                className={lesson.begin ? "lesson active" : "lesson"}
                                                onClick={(e) => lessonHandle(e.target)}
                                            >
                                                <h6 className="lesson-title">{index}. {lesson.name}</h6>
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
                                        <div key={index} className={lesson.begin ? "lesson active" : "lesson"}>
                                            <h6 className="lesson-title">{index}. {lesson.name}</h6>
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
