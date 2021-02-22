import config from '../../config'
import axios from 'axios'

export default function uploadVideo(files) {
    console.log('Uploading file to storage')
  
    axios
        .post(`${config.apiUrl}/api/v1/video/upload`, files)
        .then(response => {
            console.log(response)
        })
        .catch(() => {
            console.log('Ouch!')
        })
}