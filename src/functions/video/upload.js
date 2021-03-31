import config from '../../config'
import axios from 'axios'
//import url from 'url'
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob'

export default async function uploadVideo(video, values) {
    // Validate inputs
    /*
    if (!video) {
        console.error('[UploadVideo] Video file missing!')
        return
    }*/

    console.log(values)

    if (values.title === undefined || !values.description === undefined || !values.privacy === undefined) {
        console.error('[UploadVideo] Values missing!')
        return
    }

    axios({
        method: 'post',
        url: `${config.apiUrl}/api/v1/video/upload`,
        data: {
            //'fileName': video.name,
            'title': values.title,
            'description': values.description,
            'privacy': values.privacy
        }
    }).then(async res => {
        console.log(res)
        /*
        uploadSasUrl = res.data

        let sasUrl = url.parse(uploadSasUrl)

        const anonCred = new AnonymousCredential()

        let blobClient = new BlobServiceClient(uploadSasUrl, anonCred)
        let containerName = sasUrl?.path[0]

        console.log(`Uploading file named ${video.name} to blob in asset's container`)

        let containerClient = blobClient.getContainerClient('')
        let blockBlobClient = containerClient.getBlockBlobClient(video.name)

        console.log(video.type)

        
        await blockBlobClient.uploadData(video, {
            blockSize: 4 * 1024 * 1024, // 4MB Block size
            concurrency: 20, // 20 concurrent
            ContentType: video.type,
            onProgress: (ev) => console.log(ev)
        })
        */
        
    }).catch(err => {
        console.error(err)
    })
}