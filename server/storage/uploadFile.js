const msRestNodeAuth = require('@azure/ms-rest-nodeauth')
const { AzureMediaServices } = require('@azure/arm-mediaservices')

async function prepareAssetAndBlockBlob(assetName) {
    const clientId = process.env.AADCLIENTID
    const secret = process.env.AADSECRET
    const tenantDomain = process.env.AADTENANTDOMAIN
    const subscriptionId = process.env.SUBSCRIPTIONID
    const resourceGroup = process.env.RESOURCEGROUP
    const accountName = process.env.ACCOUNTNAME

    let clientOptions = {
        longRunningOperationRetryTimeout: 5 // set the timeout for retries to 5 seconds
    }

    const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(clientId, secret, tenantDomain)
    const mediaClient = new AzureMediaServices(creds, subscriptionId, clientOptions)
    console.log(`Uploading asset to: ${accountName}`)

    let uploadSasUrl

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
        
        console.log(uploadSasUrl)

        let result = await Promise.resolve(uploadSasUrl)
        return result
    }
}

module.exports = {
    prepareAssetAndBlockBlob
}