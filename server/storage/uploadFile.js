const msRestNodeAuth = require('@azure/ms-rest-nodeauth')
const { AzureMediaServices } = require('@azure/arm-mediaservices')
const { BlobServiceClient, AnonymousCredential, BlobDownloadResponseModel } = require('@azure/storage-blob')
const path = require('path')
const url = require('whatwg-url')

module.exports = async function upload(video) {
    if (video !== undefined) {
        let assetName = video.md5

        await createInputAsset(assetName, video)

        return {
            odatatype: "#Microsoft.Media.JobInputAsset",
            assetName: assetName
        }
    } else {
        return false
    }
}

// Create the input asset to encode the content in to
async function createInputAsset(assetName, fileToUpload) {
    const clientId = process.env.AADCLIENTID
    const secret = process.env.AADSECRET
    const tenantDomain = process.env.AADTENANTDOMAIN
    const subscriptionId = process.env.SUBSCRIPTIONID
    const resourceGroup = process.env.RESOURCEGROUP
    const accountName = process.env.ACCOUNTNAME

    let clientOptions = {
        longRunningOperationRetryTimeout: 5 // set the timeout for retries to 5 seconds
    }

    const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(clientId, secret, tenantDomain);
    const mediaClient = new AzureMediaServices(creds, subscriptionId, clientOptions)

    console.log(`Uploading asset to: ${accountName}`)
    
    let uploadSasUrl
    let fileName
    let sasUri

    let asset = await mediaClient.assets.createOrUpdate(
        resourceGroup,
        accountName,
        assetName,
        {}
    )

    let date  = new Date()
    let readWritePermission = "ReadWrite"

    date.setHours(date.getHours() + 1)
    let input = {
        permissions: readWritePermission,
        expiryTime: date
    }

    let listContainerSas = await mediaClient.assets.listContainerSas(resourceGroup, accountName, assetName, input)

    if (listContainerSas.assetContainerSasUrls) {
        uploadSasUrl = listContainerSas.assetContainerSasUrls[0]
        fileName = fileToUpload.md5
        sasUri = url.parseURL(uploadSasUrl)

        const anonymousCredential = new AnonymousCredential()

        let blobClient = new BlobServiceClient(uploadSasUrl, anonymousCredential)

        let containerName = sasUri?.path[0]

        console.log(`Uploading file named ${fileName} to blob in the Asset's container`)

        let containerClient = blobClient.getContainerClient('')

        let blockBlobClient = containerClient.getBlockBlobClient(fileName)

        await blockBlobClient.uploadData(fileToUpload.data, {
            blockSize: 4 * 1024 * 1024, // 4MB Block size
            concurrency: 20, // 20 concurrent
            onProgress: (ev) => console.log(ev)
        })
    }

    return asset
}