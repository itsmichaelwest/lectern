# Lectern - CS39440 Major Project

This project focuses on creating a video platform with timestamped comments and potentially other interactive media. 
The project is at a fairly advanced state, with most of the UI complete and API stabilized. We still need to implement
the actual video upload and playback functionality, expect that to come in the next week or so.

Please see the Wiki for API documentation and current user stories. This documentation is set to evolve over time and 
may relocate to new locations. This README will be updated in the event that happens.

## Getting started

You'll need [Node.js](https://nodejs.org/download/) installed.

1. Clone this repository.
2. Run `yarn` to install dependencies.

What you'll do next depends on if you want to run the website in development mode or server a production build.

## Directory structure

|Directory|Contains|
|-|-|
|config|Configuration files for Webpack and other build processes. The files in this directory are in the process of being cleaned up, they are mostly boilerplate ejected by react-scripts.|
|public|Files to be made available by the HTTP server.|
|scripts|Build scripts. Mostly boilerplate ejected by react-scripts.|
|server|Server source, can be operated independently.|
|src|Client source, can be operated independently but relies heavily on server component.|

## Development

The development build utilizes hot reload on both the client and server, facilitating an smoother development workflow. 
You can also choose to run either side independently, though since the client/server are heavily dependent on each other, 
I recommend using the combined development mode.

> *Note:* There are some issues developing on Apple M1 devices, where the development process will spontaneously crash. 
This is likely due to a bug in Node or one of the packages I am using. Keep an eye on your terminal window and just 
re-run the relevant development command if a crash occurs.

The scripts available are:

### `yarn dev`

This will first start up the development server, followed by the client.\
Open [http://localhost:8081](http://localhost:8081) to view the app in the browser.

### `yarn dev-no-server-refresh`
Starts up the development server without `nodemon` and therefore server hot reload will be disabled.\
Open [http://localhost:8081](http://localhost:8081) to view the app in the browser.

### `yarn server-dev`

Starts up the development server only. Useful for debugging new routes and API calls.\
Open [http://localhost:8080](http://localhost:8080) to view the server in the browser.

### `yarn client-dev`

Starts just the client in hot reload mode. Useful for light debugging of the client UI, but not much else as it relies 
on API calls to the server.\
Will open at the same URL as `yarn dev`.

## Production

There are two scripts available for production settings:
### `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn server`
Starts the server in production mode.

### `yarn start`
Builds the app in production mode, and then starts the server. Since the app is pre-built, hot-reload is not available.\
Open [http://localhost:8080](http://localhost:8080) to view the web app in the browser.