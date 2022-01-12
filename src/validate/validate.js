function isEmpty(val) {
    return val === undefined || val === null || val === '' ? true : false
}

export function validateEmail(email, users, type) {
    let err = ''
    let emailLogin = null
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (isEmpty(email)) {
        err = "Vui lòng nhập email"
        return err
    }
    if (!emailRegex.test(email)) {
        err = "Email không hợp lệ"
        return err
    }

    if (type === 'register') {
        users.map(user => {
            if (user.email === email) {
                err = 'Tài khoản đã tồn tại'
                return
            }
        })
        return err
    }

    users.forEach(user => {
        if (user.email === email) {
            emailLogin = user.email
            err = ''
        }
    })

    if (emailLogin === null) {
        err = "Tài khoản không tồn tại"
        return err
    }
    
    return err
}

export function validatePassword(password, email, users) {
    let err = ''
    let validate = false
    let isEmail = false
    if (isEmpty(password)) {
        err = "Vui lòng nhập mật khẩu"
        return err
    }
    if (password.length < 6) {
        err = "Mật khẩu phải lơn hơn 6 kí tự"
        return err
    }

    if (email === null) return err

    users.forEach(user => {
        if (email === user.email) {
            isEmail = true
            if (password === user.password) {
                validate = true
            }
        }
    })
    if (!isEmail) return err
    
    if (!validate) {
        err = "Mật khẩu không chính xác. Vui lòng kiểm tra lại"
        return err
    }
    return err
}

export function validateUserName(userName) {
    let err = ''
    if (isEmpty(userName)) {
        err = 'Vui lòng nhập UserName'
        return err
    }
    return err
}