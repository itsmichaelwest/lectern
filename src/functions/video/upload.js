import config from '../../config'
import axios from 'axios'

export default function uploadVideo(files, event) {
    var body = new FormData();
    body.append('video', files[0])
    axios({
        method: 'post',
        url: `${config.apiUrl}/api/v1/video/upload`,
        data: body
    })
    .then(response => {
        console.log(response)
    })
    .catch(() => {
        console.log('Ouch!')
    })
}