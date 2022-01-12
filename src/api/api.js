const COURSE_URL = 'https://61c2edf79cfb8f0017a3e787.mockapi.io/Courses'
const COMMENT_URL = 'https://61c2edf79cfb8f0017a3e787.mockapi.io/Comment'
const USER_URL = 'https://61c2edf79cfb8f0017a3e787.mockapi.io/users'
const VIDEO_BLOGS_URL = 'https://61986846164fa60017c23067.mockapi.io/BlogsVideos'
const HERO_URL = 'https://61986846164fa60017c23067.mockapi.io/Slide'

// USER
export async function getUsers() {
    const res = await fetch(USER_URL).then(res => res.json())
    return res
}

export async function regester(user) {
    const res = await fetch(USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return res
}

// COURSES
export async function getCourses(signal) {
    const res = await fetch(COURSE_URL, {signal}).then(res => res.json())
    return res
}

export async function getCourseById(courseId) {
    let course = null
    const res = await getCourses()
    res.forEach(item => {
        if (item.courseId === courseId) {
            course = item
            return
        }
    })
    return course
}

// VIDEOS and BLOGS
export async function getBlogsAndVideos(signal) {
    const res = await fetch(VIDEO_BLOGS_URL, {signal}).then(res => res.json())
    return res
}

// COMMENTS
export async function getComments() {
    const res = await fetch(COMMENT_URL).then(res => res.json())
    return res
}

export async function getCommentsByLessonId(lessonId) {
    const res = await getComments()
    const comments = res.filter(comment => {
        return comment.lessonId === lessonId
    })
    return comments
}

export async function postComment(comment) {
    const res = await fetch(COMMENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    return res
}

export async function putComment(id, comment) {
    const res = await fetch(`${COMMENT_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    return res
}

export async function deleteComment(id) {
    const res = await fetch(`${COMMENT_URL}/${id}`, {
        method: 'DELETE'
    })
    return res
}

// SLIIDE
export async function getHeros(signal) {
    const res = await fetch(HERO_URL, {signal}).then(res => res.json())
    return res
}
