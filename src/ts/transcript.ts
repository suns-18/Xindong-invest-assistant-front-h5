export const indexToAlphabets = (index: number) => {
    let CHAR_A = 65
    return String.fromCharCode(CHAR_A + index)
}

export const localTime = (source: string,
                          shift: boolean = false) => {
    if (source === null) {
        return ''
    } else {
        let date = undefined
        if (shift) {
            const localDate = Date.parse(new Date(source).toISOString())
                - 8 * 3600 * 1000
            date = new Date(localDate)
        } else date = new Date(source)


        const y = date.getFullYear()
        let m: string | number = date.getMonth() + 1
        m = m < 10 ? `0${String(m)}` : m
        let d: string | number = date.getDate()
        d = d < 10 ? `0${String(d)}` : d
        let h: string | number = date.getHours()
        h = h < 10 ? `0${String(h)}` : h
        let minute: string | number = date.getMinutes()
        minute = minute < 10 ? `0${String(minute)}` : minute
        let second: string | number = date.getSeconds()
        second = second < 10 ? `0${String(second)}` : second
        return `${String(y)}-${String(m)}-${String(d)}   ${String(h)}:${String(
            minute
        )}:${String(second)}`
    }
}