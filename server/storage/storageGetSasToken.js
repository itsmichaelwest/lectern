const { StorageSharedKeyCredential, AccountSASResourceTypes, AccountSASPermissions, AccountSASServices, generateAccountSASQueryParameters } = require('@azure/storage-blob')

function storageGetSasToken() {
    let sharedKeyCredential = new StorageSharedKeyCredential(
        process.env.AZURE_STORAGE_ACCOUNT_NAME, 
        process.env.AZURE_STORAGE_ACCOUNT_KEY
    )
    
    let accountSas = generateAccountSASQueryParameters(
        {
            startsOn: new Date(new Date().valueOf() - 8640),
            expiresOn: new Date(new Date().valueOf() + 86400000),
            resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
            permissions: AccountSASPermissions.parse("rwdlc").toString(),
            services: AccountSASServices.parse("b").toString(),
        },
        sharedKeyCredential
    ).toString()

    return accountSas
}

module.exports = storageGetSasToken