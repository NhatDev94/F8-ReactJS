import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput/FormInput'
import Recomment from '../Recomment/Recomment'

import * as api from '../../api/api'
import * as time from '../../service/time'

import './comment.css'

function Comment(props) {
    let [showDrop, setShowDrop] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [showEdit, setShowEdit] = useState(false)

    let timeComment = time.getTimeAgo(props.comment.time)
    
    useEffect(() => {
        window.addEventListener('click', toggleDropdow)

        return () => {
            window.removeEventListener('click', toggleDropdow)
        }
    }, [])

    function toggleDropdow(e) {
        if (!e.target.matches('.comment .drop-icon') && !e.target.matches('.comment .show-drop')) {
            setShowDrop(false)
        }
    }

    function showFormAdd() {
        setShowAdd(!showAdd)
        setShowEdit(false)
    }

    function showFormEdit() {
        setShowEdit(!showEdit)
        setShowAdd(false)
    }

    function hideFormAdd() {
        setShowAdd(false)
    }

    function hideFormEdit() {
        setShowEdit(false)
    }

    async function editComment(input) {
        setShowEdit(false)
        let newComment = props.comment
        newComment.body = input
        const res = await api.putComment(props.comment.id, newComment)
        props.getComments()
    }

    async function deleteComment() {
        const res = await api.deleteComment(props.comment.id)
        props.getComments()
    }

    async function addRecomment(input) {
        setShowAdd(false)
        let recomment = {
            recommentId: Math.random(),
            author: props.user.name,
            authorId: props.user.userId,
            authorImg: props.user.img,
            body: input,
            time: new Date().getTime(),
            like: 122
        }
        let comment = props.comment
        comment.recomments = [...props.comment.recomments, recomment]
        const res = await api.putComment(props.comment.id, comment)
        props.getComments()
    }

    async function deleteRecomment(id) {
        let newRecomments = props.comment.recomments.filter(recomment => {
            return recomment.recommentId !== id
        })
        let comment = props.comment
        comment.recomments = newRecomments
        const res = await api.putComment(props.comment.id, comment)
        props.getComments()
    }

    



    return (
        <div className='comment'>
            <div className="flex">
                <div className='user-img'>
                    <img src={props.comment.authorImg} alt='F8' />
                </div>
                <div className='comment-right'>
                    <div className='comment-body'>
                        <h6 className='author'>{props.comment.author}</h6>
                        <p>{props.comment.body}</p>
                    </div>
                    <div className='comment-action flex'>
                        <p>Thích</p>
                        <p onClick={showFormAdd}>Trả lời</p>
                        <p className='disable'>{timeComment}</p>
                        <div className='drop-icon'>
                            <i
                                className="show-drop fas fa-ellipsis-h"
                                onClick={() => setShowDrop(!showDrop)}></i>
                            <div className={showDrop ? 'drop-dow' : 'hide'}>
                                <div 
                                    className={props.comment.authorId === props.user.userId ? 'drop-item flex' : 'hide'}
                                    onClick={showFormEdit}>
                                    <i className="fas fa-pen"></i>
                                    <p>Sửa bình luận</p>
                                </div>
                                <div
                                    className={props.comment.authorId === props.user.userId ? 'drop-item flex' : 'hide'}
                                    onClick={deleteComment}>
                                    <i className="fas fa-trash"></i>
                                    <p>Xóa bình luận</p>
                                </div>
                                <div className={props.comment.authorId === props.user.userId ? 'hide' : 'drop-item flex'}>
                                    <i className="fas fa-flag"></i>
                                    <p>Báo cáo bình luận</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Input Add Recomment*/}
            <div className={showAdd ? "form" : "hide"}>
                <FormInput 
                    getInput={addRecomment} 
                    submitName="Trả lời" 
                    hideForm={hideFormAdd}
                    user={props.user} />
            </div>

            <div className={showEdit ? 'form' : 'hide'}>
                <FormInput 
                    getInput={editComment} 
                    submitName="Sửa" 
                    data={props.comment} 
                    hideForm={hideFormEdit}
                    user={props.user} />
            </div>
            {/* List ReComment */}
            <div className="list-recomment">
                <div className='recomment-wrap'>
                    {
                        props.comment.recomments && props.comment.recomments.map((recomment, index) => {
                            return <Recomment
                                key={index}
                                recomment={recomment}
                                addRecomment={addRecomment}
                                deleteRecomment={deleteRecomment}
                                getComments={api.getComments}
                                comment={props.comment}
                                user={props.user} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment