import config from '../../config'
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
    .then(async res => {
        console.log(res)
        return callback(true)
    })
    .catch(err => {
        console.log(err)
        return callback(false)
    })
}