import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderLearning from "../../partials/HeaderLearning/HeaderLearning";
import { Link } from 'react-router-dom'
import * as api from '../../api/api'
import FormInput from "../../shared/FormInput/FormInput";
import Comment from "../../shared/Comment/Comment";
import * as sort from '../../service/sort'
import ReactPlayer from "react-player";


import './learning.css'
import VidyardPlayer from "react-player/vidyard";

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
        setComments([...res])
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
                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='react-player'
                                url='https://www.youtube.com/watch?v=DpvYHLUiZpc'
                                width='100%'
                                height='100%'
                                controls={true}
                            />
                        </div>
                    </div>
                    <div className="left-content">
                        <div className="sub-nav flex">
                            <div
                                id="play-list"
                                className="nav-item"
                                onClick={e => navHandle(e.target)}>N???i dung</div>
                            <div
                                id="comments"
                                className="nav-item active"
                                onClick={e => navHandle(e.target)}>T???ng quan</div>
                            <div
                                id="note"
                                className="nav-item"
                                onClick={e => navHandle(e.target)}>Ghi ch??</div>
                            <div
                                id="more"
                                className="nav-item"
                                onClick={e => navHandle(e.target)}>Li??n quan</div>
                        </div>
                        <div className="list-comment">
                            <span>Tham gia nh??m <Link to="https://www.facebook.com/groups/f8official">H???c l???p tr??nh t???i F8</Link> tr??n Facebook ????? c??ng nhau trao ?????i trong qu?? tr??nh h???c t???p ??????</span>
                            <span>C??c b???n subscribe k??nh Youtube <Link to="https://www.youtube.com/c/F8VNOfficial">F8 Official</Link> ????? nh???n th??ng b??o khi c?? c??c b??i h???c m???i nh?? ??????</span>
                            <div className="list-comment-header flex">
                                <h4>{comments.length} h???i ????p</h4>
                                <div className="social flex">
                                    <p>CHIA S???</p>
                                    <i className="fab fa-facebook"></i>
                                    <i className="fas fa-envelope"></i>
                                    <i className="fas fa-link"></i>
                                </div>
                            </div>
                            <div className="list-comment-content">
                                <div className="form-add-comment">
                                    <FormInput
                                        getInput={addComment}
                                        submitName="B??nh lu???n"
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
                                <p className="time-line">Ch??a ho??n th??nh b??i h???c n??o</p>
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
                            <p className="time-line">Ch??a ho??n th??nh b??i h???c n??o</p>
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
