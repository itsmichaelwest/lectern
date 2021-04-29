# Lectern - CS39440 Major Project

This project focuses on creating a video platform with timestamped comments and potentially other interactive media.
The website is available at [lectern.video](https://lectern.video).

> **IMPORTRANT:** This project requires certain secret keys/variables to be set for development. See the
> [Azure deployment guide](./AZURE.MD) for instructions on generating these yourself, or send an email to
> [maw86@aber.ac.uk](mailto:maw86@aber.ac.uk) to obtain a prebuilt `.env` file. Keys are not included in this repository
> for security reasons. Many aspects of this project cannot be run locally without setting these variables. You can 
> always access Lectern on the web at [lectern.video](https://lectern.video).

## Getting started

You'll need [Node.js](https://nodejs.org/download/) and [Yarn](https://classic.yarnpkg.com/lang/en/) installed.

1. Clone this repository.
2. Run `yarn` to install dependencies.
3. Refer to the [Azure deployment guide](./AZURE.MD).

What you'll do next depends on if you want to run the website in development mode or server a production build.

## Directory structure

|Directory|Contains|
|-|-|
|public|Files to be made available by the HTTP server. Nothing in here is compiled, the files are served as-is.|
|server|Server source, can be operated independently.|
|src|Client source, can be operated independently but relies heavily on server component.|

## Development

The development build utilizes hot reload on both the client and server, facilitating an smoother development workflow. 
You can also choose to run either side independently, though since the client/server are heavily dependent on each other, 
I recommend using the combined development mode.

You **must** create a `.env` file with the variables described in the [Azure deployment guide](./AZURE.MD).

> *Note:* There are some issues developing on Apple M1 devices, where the development process will spontaneously crash. 
> This is likely due to a bug in Node or one of the packages I am using. Keep an eye on your terminal window and just 
> re-run the relevant development command if a crash occurs.

The commands available are:

### `yarn dev`

This will first start up the development server, followed by the client.\
Open [http://localhost:8081](http://localhost:8081) to view the app in the browser (it will also open automatically when this comment is first invoked).

### `yarn dev-server`

Starts up the development server only. Useful for debugging new routes and API calls.\
Open [http://localhost:8080](http://localhost:8080) to view the server in the browser.

### `yarn dev-client`

Starts just the client in hot reload mode. Useful for light debugging of the client UI, but not much else as it relies 
on API calls to the server.\
Will open at the same URL as `yarn dev`.

## Production

There are two commands available for production settings:
### `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start`
Builds the app in production mode, and then starts the server. Since the app is pre-built, hot-reload is not available.\
Open [http://localhost:8080](http://localhost:8080) to view the web app in the browser.

## Testing
There are three commands available for running tests:

### `yarn test`
Run all available client and server tests. The client tests run first, see below. After running the client tests, 
press `q` to run the server tests.

### `yarn test-client`
Run only the client tests. *Jest* runs in a full-screen mode. To exit, press `q`. If you have run the tests before, you 
will need to press `a` to run them again.

### `yarn test-server`
Run only the server tests.