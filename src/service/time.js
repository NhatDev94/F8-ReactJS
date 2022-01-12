export function getTimeAgo(timeComment) {
    let value = ''
    let now = new Date().getTime()
    let time = Math.round((now - timeComment) / 1000)
    if (time > (60 * 60 * 24)) {
        value = `${Math.round(time / 86400)} ngày trước`
        return value
    }
    if (time > (60 * 60)) {
        value = `${Math.round(time / 3600)} giờ trước`
        return value
    }
    if (time > 60) {
        value = `${Math.round(time / 60)} phút trước`
        return value
    }
    value = `vài giây trước`
    return value
}