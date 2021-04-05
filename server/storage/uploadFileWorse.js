const { ServiceURL, StorageURL, StorageSharedKeyCredential } = require('@azure/storage-blob')

function retrieveSasUrl() {
    const credentials = new StorageSharedKeyCredential(
        process.env.AZURE_STORAGE_ACCOUNT_NAME,
        process.env.AZURE_STORAGE_ACCOUNT_KEY
    )

    return credentials
}

module.exports = retrieveSasUrl