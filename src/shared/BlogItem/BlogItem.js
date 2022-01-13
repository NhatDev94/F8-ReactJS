import React from 'react'
import { Link } from 'react-router-dom'

import './blogItem.css'

function BlogItem(props) {

    let blogStyle = { backgroundImage: `url(${props.blog.img})` }
    return (
        <div className='blog item'>
            <Link to='/blogs'>
                <div className='blog-img' style={blogStyle}></div>
            </Link>
            <Link to='/blogs'>
                <h4 className='title'>{props.blog.title}</h4>
            </Link>
            <div className='author-box flex'>
                <div className='avatar'>
                    <img src={props.blog.authorImg} alt='img' />
                </div>
                <h6 className='author-name'>{props.blog.author}</h6>
                <p className='createdDate'>{props.blog.time}</p>
            </div>
        </div>
    )
}

export default BlogItem
