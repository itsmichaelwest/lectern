const { StorageSharedKeyCredential, BlobServiceClient } = require('@azure/storage-blob')

function storageDeleteBlob(videoId) {
    const account = process.env.AZURE_STORAGE_ACCOUNT_NAME

    const sharedKeyCredential = new StorageSharedKeyCredential(
        account, 
        process.env.AZURE_STORAGE_ACCOUNT_KEY
    )

    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`, sharedKeyCredential
    )

    const containerClient = blobServiceClient.getContainerClient('videos')
    const blockBlobClient = containerClient.getBlockBlobClient(videoId)
    const blockBlobDeleteResponse = blockBlobClient.delete()

    return blockBlobDeleteResponse
}

module.exports = storageDeleteBlob