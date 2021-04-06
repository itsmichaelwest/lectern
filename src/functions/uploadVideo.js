import config from '../config'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { BlobServiceClient } from '@azure/storage-blob'

export default async function uploadVideo(video, values, callback) {
    // Validate inputs
    if (!video) {
        console.error('[UploadVideo] Video file missing!')
        return
    }

    if (values.title === "" || !values.description === "") {
        console.error('[UploadVideo] Values missing!')
        return callback(false)
    }

    const videoId = uuidv4()

    axios
    .get(`${config.apiUrl}/api/v1/video/sas`)
    .then(async res => {
        console.log(res)

        const storageAccountName = 'cs394lecternvideos'
        const containerName = 'videos'
        const sasToken = res.data

        const blobService = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        )

        const containerClient = blobService.getContainerClient(containerName)

        const blobClient = containerClient.getBlockBlobClient(videoId)
        const options = {
            blobHTTPHeaders: {
                blobContentType: video.type
            }
        }

        await blobClient.uploadData(
            video, options
        )

        axios({
            method: 'post',
            url: `${config.apiUrl}/api/v1/video/upload`,
            data: {
                'videoId': videoId,
                'title': values.title,
                'description': values.description,
                'privacy': values.privacy,
                'streamUrl': `https://${storageAccountName}.blob.core.windows.net/${containerName}/${videoId}`
            }
        })
        .then(res => {
            console.log(res)
            return callback(true)
        })
        .catch(err => {
            console.error(err)
            return callback(false)
        })
    })
}