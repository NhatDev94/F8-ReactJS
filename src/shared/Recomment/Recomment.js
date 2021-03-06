import React, { useEffect, useState } from 'react'

import * as api from '../../api/api'
import * as time from '../../service/time'

import FormInput from '../FormInput/FormInput'


import './recomment.css'

function Recomment(props) {
    let [showDrop, setShowDrop] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [showEdit, setShowEdit] = useState(false)

    let timeRecomment = time.getTimeAgo(props.recomment.time)

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

    function addRecomment(input) {
        setShowAdd(false)

        props.addRecomment(input)
    }

    async function editRecomment(input) {
        setShowEdit(false)
        let index = props.comment.recomments.indexOf(props.recomment)
        let newRecomment = props.recomment
        let newComment = props.comment

        newRecomment.body = input
        newComment.recomments[index] = newRecomment
        const res = await api.putComment(props.comment.id, newComment)
        props.getComments()
    }

    function deleteRecomment() {
        setShowAdd(false)
        setShowEdit(false)
        props.deleteRecomment(props.recomment.recommentId)
    }


    return (
        <div className='recomment'>
            <div className='flex'>
                <div className='recomment-user-img'>
                    <img src={props.recomment.authorImg} alt='F8' />
                </div>
                <div className='recomment-right'>
                    <div className='recomment-body'>
                        <h6 className='author'>{props.recomment.author}</h6>
                        <p>{props.recomment.body}</p>
                    </div>
                    <div className='recomment-action flex'>
                        <p>Th??ch</p>
                        <p onClick={showFormAdd}>Tr??? l???i</p>
                        <p className='disable'>{timeRecomment}</p>
                        <div className='drop-icon'>
                            <i
                                className="show-drop fas fa-ellipsis-h"
                                onClick={() => setShowDrop(!showDrop)}></i>
                            <div className={showDrop ? 'drop-dow' : 'hide'}>
                                <div 
                                    className={props.recomment.authorId === props.user.userId ? 'drop-item flex' : 'hide'}
                                    onClick={showFormEdit}
                                >
                                    <i className="fas fa-pen"></i>
                                    <p>S???a b??nh lu???n</p>
                                </div>
                                <div
                                    className={props.recomment.authorId === props.user.userId ? 'drop-item flex' : 'hide'}
                                    onClick={() => deleteRecomment()}
                                >
                                    <i className="fas fa-trash"></i>
                                    <p>X??a b??nh lu???n</p>
                                </div>
                                <div className={props.recomment.authorId === props.user.userId ? 'hide' : 'drop-item flex'}>
                                    <i className="fas fa-flag"></i>
                                    <p>B??o c??o b??nh lu???n</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Form Input Add Recomment*/}
            <div className='form'>
                {
                    showAdd && <FormInput 
                                    submitName="Tr??? l???i"
                                    getInput={addRecomment}
                                    hideForm={hideFormAdd}
                                    user={props.user} 
                                />
                }
            </div>

            <div className='form'>
                {
                    showEdit && <FormInput 
                                    data={props.recomment}
                                    submitName="S???a"
                                    getInput={editRecomment}
                                    hideForm={hideFormEdit}
                                    user={props.user} 
                                />
                }
            </div>
        </div>
    )
}

export default Recomment