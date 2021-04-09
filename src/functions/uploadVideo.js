import { apiUrl } from '../config'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { BlobServiceClient } from '@azure/storage-blob'

export default async function uploadVideo(video, values, callback, progress) {
    // Validate inputs
    if (!video) {
        console.error('[UploadVideo] Video file missing!')
        return callback(false)
    }

    if (values.title === "" || !values.description === "") {
        console.error('[UploadVideo] Values missing!')
        return callback(false)
    }

    const videoId = uuidv4()
    const storageAccountName = 'cs394lecternvideos'
    const containerName = 'videos'
    const body = {
        'videoId': videoId,
        'title': values.title,
        'description': values.description,
        'privacy': values.privacy,
        'streamUrl': `https://${storageAccountName}.blob.core.windows.net/${containerName}/${videoId}`
    }

    axios
    .get(`${apiUrl}/api/v1/video/sas`)
    .then(async res => {
        const sasToken = res.data

        const blobService = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        )

        const containerClient = blobService.getContainerClient(containerName)

        const blobClient = containerClient.getBlockBlobClient(videoId)

        await blobClient.uploadData(video, {
            blockSize: 4 * 1024 * 1024, // 4MB Block size
            blobHTTPHeaders: {
                blobContentType: video.type
            },
            concurrency: 20, // 20 concurrent
            onProgress: (event) => progress(event.loadedBytes)
        }).then(res => {
            axios.post(`${apiUrl}/api/v1/video/upload`, body)
            .then(res => {
                return callback(true)
            })
            .catch(err => {
                console.error(err)
                return callback(false)
            })
        })
    })
    .catch(err => {
        console.error(err)
        return callback(false)
    })
}