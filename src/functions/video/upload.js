import config from '../../config'
import BMF from 'browser-md5-file'
import axios from 'axios'
import url from 'url'
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob'

export default function uploadVideo(video, values) {
    let body = new FormData()
    body.append('fileName', video.name)

    new BMF().md5(
        video,
        (err, hash) => {
            //console.error('error', err)
            body.append('id', hash)
        },
    )
    
    body.append('title', values.title)
    body.append('description', values.description)
    body.append('privacy', values.privacy)

    axios({
        method: 'get',
        url: `${config.apiUrl}/auth/user/id`
    }).then(res => {
        body.append('uploader', res.data)
    })

    let uploadSasUrl

    axios({
        method: 'post',
        url: `${config.apiUrl}/api/v1/video/upload`,
        data: body
    }).then(async res => {
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