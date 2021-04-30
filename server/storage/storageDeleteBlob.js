const { StorageSharedKeyCredential, BlobServiceClient } = require('@azure/storage-blob')

// Delete video and thumbnail files from Azure storage
function storageDeleteBlob(videoId) {
    const account = process.env.AZURE_STORAGE_ACCOUNT_NAME

    const sharedKeyCredential = new StorageSharedKeyCredential(
        account, 
        process.env.AZURE_STORAGE_ACCOUNT_KEY
    )

    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`, sharedKeyCredential
    )

    const videoContainerClient = blobServiceClient.getContainerClient('videos')
    const videoBlockBlobClient = videoContainerClient.getBlockBlobClient(videoId)
    const videoBlockBlobDeleteResponse = videoBlockBlobClient.deleteIfExists()

    const thumbnailContainerClient = blobServiceClient.getContainerClient('thumbnails')
    const thumbnailBlockBlobClient = thumbnailContainerClient.getBlockBlobClient(videoId)
    const thumbnailBlockBlobDeleteResponse = thumbnailBlockBlobClient.deleteIfExists()

    return videoBlockBlobDeleteResponse
}

module.exports = storageDeleteBlob