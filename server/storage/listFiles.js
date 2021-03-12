const msRestNodeAuth = require('@azure/ms-rest-nodeauth')
const { AzureMediaServices } = require('@azure/arm-mediaservices')

/*
async function list() {
    // Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
    // from your Media Services account's API Access page in the Azure portal.
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
  
    // List Assets in Account
    console.log(`Listing Assets Names in account: ${accountName}`)
    var assets = await mediaClient.assets.list(resourceGroup, accountName)
  
    assets.forEach(asset => {
        console.log(asset.name)
    });
  
    if (assets.odatanextLink) {
        console.log("There are more than 1000 assets in this account, use the assets.listNext() method to continue listing more assets if needed")
        console.log("For example:  assets = await mediaClient.assets.listNext(assets.odatanextLink)");
    }
}
  
list().catch((err) => {
    console.error("Error running sample:", err.message);
});

module.exports = {
    list
}*/
