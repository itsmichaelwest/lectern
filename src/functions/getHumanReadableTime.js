export default function getHumanReadableTime(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    if (minutes.toString().length === 1) {
        minutes = `0${minutes}`
    }
    if (seconds.toString().length === 1) {
        seconds = `0${seconds}`
    }
    return (`${minutes}:${seconds}`)
}