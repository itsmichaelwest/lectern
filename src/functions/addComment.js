import config from '../config'
import axios from 'axios'

export default async function addComment(videoId, commentBody, timestamp, callback) {
    console.log(commentBody)

    console.log(timestamp)

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