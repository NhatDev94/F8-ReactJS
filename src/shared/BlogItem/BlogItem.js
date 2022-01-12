import React from 'react'
import './blogItem.css'

function BlogItem(props) {
    let blogStyle = { backgroundImage: `url(${props.blog.img})` }
    return (
        <div className='blog item'>
            <a href=''>
                <div className='blog-img' style={blogStyle}></div>
            </a>
            <a href=''>
                <h4 className='title'>{props.blog.title}</h4>
            </a>
            <div className='author-box flex'>
                <div className='avatar'>
                    <img src='https://avatar-redirect.appspot.com/google/115663409059082752836?size=400' alt='img' />
                </div>
                <h6 className='author-name'>Dong Ngo</h6>
                <p className='createdDate'>{props.blog.createdDate}</p>
            </div>
        </div>
    )
}

export default BlogItem
