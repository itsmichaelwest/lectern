import config from '../config'
import axios from 'axios'

// Search for videos and channels by performing the relevant GET queries against
// the API.
export default async function searchVideo(query, callback) {
    let response = []

    await axios
        .get(`${config.apiUrl}/api/v1/video/search/${query}`)
        .then(res => {
            response.push(res.data)
        })

    await axios
        .get(`${config.apiUrl}/api/v1/channel/search/${query}`)
        .then(res => {
            response.push(res.data)
        })

    return callback(response)
}