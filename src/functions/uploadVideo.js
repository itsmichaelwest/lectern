import { apiUrl } from '../config'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { BlobServiceClient } from '@azure/storage-blob'
import createThumbnail from './createThumbnail'

// Upload the video and thumbnail files to Microsoft Azure, then send a POST request
// to the API to insert the video into the database.
export default async function uploadVideo(video, values, callback, progress) {
    // Validate file input
    if (!video) {
        return callback(false)
    }

    // Validate form input
    if (values.title === "" || !values.description === "") {
        return callback(false)
    }

    axios
    .get(`${apiUrl}/api/v1/video/upload/sas`)
    .then(async res => {
        const sasToken = res.data

        const videoLength = document.getElementById('tempVideo').duration
        const thumbnail = createThumbnail(document.getElementById('tempVideo'))

        const videoId = uuidv4()
        const storageAccountName = 'cs394lecternvideos'
        const videoContainerName = 'videos'
        const thumbContainerName = 'thumbnails'

        const body = {
            'videoId': videoId,
            'title': values.title,
            'description': values.description,
            'privacy': values.privacy,
            'streamUrl': `https://${storageAccountName}.blob.core.windows.net/${videoContainerName}/${videoId}`,
            'vidLength': videoLength,
            'thumbnail': `https://${storageAccountName}.blob.core.windows.net/${thumbContainerName}/${videoId}`,
        }
        
        const blobService = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        )

        const thumbContainerClient = blobService.getContainerClient(thumbContainerName)
        const thumbBlobClient = thumbContainerClient.getBlockBlobClient(videoId)
        await thumbBlobClient.uploadData(thumbnail.src, {
            blockSize: 4 * 1024 * 1024,
            concurrency: 20
        }).then(async () => {
            const videoContainerClient = blobService.getContainerClient(videoContainerName)
            const videoBlobClient = videoContainerClient.getBlockBlobClient(videoId)
            await videoBlobClient.uploadData(video, {
                blockSize: 4 * 1024 * 1024,
                blobHTTPHeaders: {
                    blobContentType: video.type
                },
                concurrency: 20,
                onProgress: (event) => progress(event.loadedBytes)
            }).then(() => {
                axios.post(`${apiUrl}/api/v1/video/upload`, body)
                .then(() => {
                    return callback(body)
                })
                .catch(err => {
                    console.error(err)
                    return callback(false)
                })
            })
        })
    })
    .catch(err => {
        console.error(err)
        return callback(false)
    })
}