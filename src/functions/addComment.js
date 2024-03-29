import config from '../config'
import axios from 'axios'

// Adds a new comment to the database by sending a POST request to the API.
export default async function addComment(videoId, commentBody, timestamp, callback) {
    axios({
        method: 'POST',
        url: `${config.apiUrl}/api/v1/comment/${videoId}`,
        data: {
            'comment': `${commentBody}`,
            'timestamp': timestamp
        }
    })
    .then(async () => {
        return callback(true)
    })
    .catch(() => {
        return callback(false)
    })
}