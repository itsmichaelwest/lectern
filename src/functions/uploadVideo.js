import { apiUrl } from '../config'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { BlobServiceClient } from '@azure/storage-blob'
import createThumbnail from './createThumbnail'

// REFERENCE THIS MICHAEL, IT'S HOW YOU GOT THE THUMBNAIL TO WORK
// https://stackoverflow.com/questions/23745988/get-an-image-from-the-video/44325898

// REFERENCE THIS TOO
// https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f

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

    axios
    .get(`${apiUrl}/api/v1/video/sas`)
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
                    return callback(true)
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