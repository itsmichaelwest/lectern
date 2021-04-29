# Azure deployment guide

This project makes use of resources on Microsoft Azure to function. If you want
to deploy Lectern for yourself, you'll need to set up these resources before
beginning development or deploying to a web server.

> **To major project markers:** You *don't* need to do this, the resources are
> already set up in Azure for this project. You will need the appropriate keys/secrets
> to interface with these resources though -- send an email to
> [maw86@aber.ac.uk](mailto:maw86@aber.ac.uk) to obtain a prebuilt `.env` file
> with these variables contained.

## Step-by-step walkthough
### 1. Create an `.env` file
An `.env` file is used to store certain environment variables that shouldn't
be committed to source control. You will need to create one and populate it with
the variables you obtain when setting up Azure resources.

1. Create a new file at the root of the project repository called `.env`.
2. Copy the following into the new file:
```
MICROSOFT_GRAPH_CLIENT_ID=
MICROSOFT_GRAPH_CLIENT_SECRET=

AUTH_REDIRECT_URL=
PORT=

AZURE_STORAGE_CONNECTION_STRING=

AZURE_STORAGE_ACCOUNT_KEY=
AZURE_STORAGE_ACCOUNT_NAME=

DB_USERNAME=
DB_PASSWORD=
DB_SERVER=
DB_DATABASE=
```

Next, log into the Azure portal at [portal.azure.com](https://portal.azure.com).

### 2. Register a new application
For users to be able to log into Lectern, there needs to be an application that
they can authorize against in Azure. We'll register this now.

1. Go to the [App registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) panel.
2. Click on **New registration**.
3. Enter a name for the application.
4. Select **Accounts in any organizational directory (Any Azure AD directory - Multitenant)**.
5. Enter the **Redirect URI** of `http://localhost:8081/auth/microsoft/callback`.
6. Click **Register**.

You should now see the new application. Enter its management panel. Copy the
**Application (client) ID** value into the `MICROSOFT_GRAPH_CLIENT_ID` line of
your `.env` file. Enter the value `http://localhost:8081` into the `AUTH_REDIRECT_URL`
line of the file, and the value `8081` into the `PORT` line.

1. Click **Certificates & secrets** in the left navigation pane.
2. Click **New client secret**.
3. Give the secret a name and set an expiry period.
4. Click **Add**.
5. Copy the **Value** of your new secret from the table. Keep this safe as you
will not be able to get a copy of it again!

Now copy the client secret into the `MICROSOFT_GRAPH_CLIENT_SECRET` line of your
`.env` file.

### 3. Create a resource group
A resource group will help keep your Azure resources organized neatly.

1. Go to the [Resource groups](https://portal.azure.com/#blade/HubsExtension/BrowseResourceGroups) panel.
2. Click on **Create**.
3. Give the resource group a name.
4. Select a region for the resource group. For UK-based deployments, **(Europe)
UK South** is recommended.
5. Click **Review + create**. Then click **Create**.

Your resource group is now created. Use this resource group whenever you create
new Lectern resources in Azure.

### 4. Storage containers
Lectern requires two storage containers -- one for session storage and one for
storing videos/thumbnails. We'll create these now.

#### Session table storage
1. Go to the [Storage accounts](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) panel.
2. Click on **Create**.
3. Select the resource group you created earlier.
4. Give the storage account a name.
5. Select a region for the storage account. For UK-based deployments, **(Europe)
UK South** is recommended.
6. Click **Review + create**. Then click **Create**.

The first storage account is now created. Enter its management panel.

1. Select **Access keys** in the left navigation pane.
2. Click **Show keys**.
3. Copy the **Connection string** of **key1**.

Paste the connection string into the `AZURE_STORAGE_CONNECTION_STRING` line of
your `.env` file.

#### Video/thumbnail storage
1. Go to the [Storage accounts](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) panel.
2. Click on **Create**.
3. **IMPORTANT:** Click on the link next to **If you need to create a legacy storage account type, please click here.**.
4. Select the resource group you created earlier.
5. Give the storage account a name.
6. Select a region for the storage account. For UK-based deployments, **(Europe)
UK South** is recommended.
7. Select **BlobStorage** from the **Account kind** dropdown.
8. Click **Review + create**. Then click **Create**.

The second storage account is now created. Enter its management panel.

1. Select **Access keys** in the left navigation pane.
2. Click **Show keys**.
3. Copy the **Key** of **key1**.

Paste the key into the `AZURE_STORAGE_ACCOUNT_KEY` line of your `.env` file.
Then copy the **Storage account name** and paste that into the `AZURE_STORAGE_ACCOUNT_NAME`
line of your file.

### 5. SQL database
Lectern requires a Microsoft SQL Server database to store user, channel, video,
and comment information. We'll create this now.

1. Go to the [SQL databases](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Sql%2Fservers%2Fdatabases) panel.
2. Click on **Create**. The page may take a while to load here.
3. Select the resource group you created earlier.
4. Give the database a name.
5. Click **Create new** underneath the **Server** dropdown.
6. Enter a server name, admin username, and password. Save all these values in
a safe space.
7. Select a region for the server. For UK-based deployments, **(Europe)
UK South** is recommended.
8. Click **OK**.
9. Click **Configure database**
10. Click **Looking for basic, standard, premium?**
11. Adjust the storage amount as you see fit. Lectern does not require massive
amounts of SQL storage.
12. Click **Apply**.
13. Click **Review + create**. Then click **Create**.

The SQL database and server are now created. Enter the management panel of 
database.

Paste your database username into the `DB_USERNAME` line of your `.env` file.
Paste the password into the `DB_PASSWORD` line. Enter the name of the database
you created into the `DB_DATABASE` line.

Next, copy the **Server name** value from the management panel into the
`DB_SERVER` line of the file.

### 6. Azure Web App
If you want to deploy Lectern to Azure, follow these additional steps. Otherwise
you can stop here and begin local development.

1. Go to the [App Services](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites) panel.
2. Click on **Create**.
3. Select the resource group you created earlier.
4. Give the web app a name.
5. Select the **Node 14 LTS** option from the **Runtime stack** dropdown.
6. Select a region for the server. For UK-based deployments, **(Europe)
UK South** is recommended.
7. Click **Review + create**. Then click **Create**.



Your web app has been created. Enter the management panel of the web app and
click on **Configuration** in the left navigation pane. Under the **Application
settings** tab, use the **New application setting** button to add the secrets we
have copied into your `.env` file.

You should also add an additional variable called `WEBSITES_CONTAINER_START_TIME_LIMIT`
with the value of `600`. This is used to prevent Azure from timing out the warmup
of the code container, which can happen on lower tier app service plans. Save the
variables.

Next, go to the **General settings** tab and switch **Always on** to *On**. This
stops Azure from putting the web app to sleep if it is inactive.

There are multiple ways to deploy to an Azure web
app, see the [instructions on Microsoft Docs](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=platform-linux#deploy-to-azure) for how to
do this from [Visual Studio Code](https://code.visualstudio.com/) (the IDE used to develop Lectern).

---

With this, your Azure resources and `.env` file are complete, you are ready
to begin local development or deploy the application to a hosting service. If
you have any questions, please contact [maw86@aber.ac.uk](mailto:maw86@aber.ac.uk).