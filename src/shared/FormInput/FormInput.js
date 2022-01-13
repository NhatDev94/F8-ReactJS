import React, { useState, useEffect } from 'react'
import './formInput.css'

function FormInput(props) {
    let showActionDefault = props.addComment ? false : true
    let disableDefault = props.addComment ? true : false
    let [input, setInput] = useState('')
    let [showAction, setShowAction] = useState(showActionDefault)
    let [isDisable, setIsDisable] = useState(disableDefault)
   
    useEffect(() => {
        props.data && setInput(props.data.body)
    }, []);

    function submit() {
        if (input === undefined || input === null || input.trim().length === 0) {
            return
        }
        if (props.addComment) {
            setShowAction(false)
        }
        props.getInput(input)
        setInput('')
    }

    function cancelHandle() {
        if (props.addComment) {
            setShowAction(false)
            return
        }
        // Form khac
        props.hideForm()
    }

    function focusHandle() {
        if (!props.addComment) return
        setShowAction(true)
    }

    return (
        <div className='form-input flex'>
            <div className={props.addComment ? 'user-img' : 'user-small'}>
                <img src={props.user.img} alt='F8' />
            </div>
            <div className='form-content'>
                <input
                    placeholder='Bạn có thắc mắc gì trong bài học này?'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onFocus={focusHandle}
                    onKeyUp={e => e.code === 'Enter' && submit()} />
                <div className={showAction ? 'action flex' : 'hide'}>
                    <div className='insert flex'>
                        <i className="fas fa-code"></i>
                        <p>Chèn code</p>
                    </div>
                    <div className='submit-box'>
                        <button
                            className='cancel'
                            onClick={cancelHandle}>HỦY</button>
                        <button
                            className={isDisable && input === '' ? 'disable' : 'submit'}
                            onClick={submit}>{props.submitName}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormInput