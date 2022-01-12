export function sortByTime(data) {
    for(let i = 0; i < data.length; i++) {
        for(let j = i + 1; j < data.length; j++) {
            if (data[j].time > data[i].time) {
                let temp = data[j]
                data[j] = data[i]
                data[i] = temp
            }
        }
    }
    return data
}