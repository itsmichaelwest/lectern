import config from '../config'
import axios from 'axios'

export default function searchVideo(query, callback) {
    axios
        .get(`${config.apiUrl}/api/v1/video/search/${query}`)
        .then(res => {
            return callback(res)
        })
}