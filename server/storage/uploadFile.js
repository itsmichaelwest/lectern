const msRestNodeAuth = require('@azure/ms-rest-nodeauth')
const { AzureMediaServices } = require('@azure/arm-mediaservices')

async function prepareAssetAndBlockBlob(assetName) {
    const clientId = process.env.AZURE_CLIENT_ID
    const secret = process.env.AZURE_CLIENT_SECRET
    const tenantDomain = process.env.AZURE_TENANT_DOMAIN
    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID
    const resourceGroup = process.env.AZURE_RESOURCE_GROUP
    const accountName = process.env.AZURE_ACCOUNT_NAME

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

module.exports = prepareAssetAndBlockBlob