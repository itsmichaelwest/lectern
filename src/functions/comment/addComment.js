import config from '../../config'
import axios from 'axios'

export default async function addComment(videoId, commentBody) {
    console.log(commentBody)

    axios({
        method: 'POST',
        url: `${config.apiUrl}/api/v1/comment/${videoId}`,
        data: {
            'comment': `${commentBody}`,
        }
    }).then(async res => {
        console.log(res)
    })
}