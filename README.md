# leapblog

A simple blogging web application that allows users to read blog posts and their associated comments.  User's can sign up and log into the application to manage their blog posts and associated comments.

## Application Architecture

### Overview

leap blog consists of a web client and a RESTful backend.  The web client is a SPA written in Javascript using the React framework.  The backend is written in Javascipt using the ExpressJS framework to host the RESTful end points running on NodeJS.  The application leverages Firebase for data persistence and real-time updates.

### Hosting

leapblog is hosted on an AWS Lightsail VPS running an Ubuntu OS.  The web client static content is being served by Nginx.  Nginx is also acting as a reverse proxy that forwards requests to the RESTful API to ExpressJS.  ExpressJS is running on a NodeJS process which is being kept alive by pm2.

### User Authentication
The leapblog API is leveraging Firebase Auth for new user sign up and user authentication.  JWT tokens are being used by the API end points that require authenticated access.  JWT generation and validation is being performed by PassportJS middleware.  JWT tokens are expected to be present in the Authentication header with a value in the format of 'Bearer JWT'.

### Real-time Updates
The comments on blog posts update in real-time as the data changes in the Firebase datastore.  The react component that renders the blog post detail view wires up a connection to Firebase that updates the comments state property as data changes in the datastore.

## Application Design Considerations

### Overview
leapblog was developed as two completely decoupled user interface and back end components.  

ExpressJS is serving as a proxy and exposing a standard API for interacting with the application's datastore.  This has several benefits:

 - Provides an abstraction so that we can swap out the datastorage tier without impacting the user interface
 - Provides an extensible layer that can be used to introduce additional processing or enforcement of business rules without impacting the user interface
 - Enables us to scale the backend layer independently from the user interface.  The layer can be moved onto multiple servers and fronted by a load balancer without having to scale servers hosting the user interface
 - Enables us to create various types of user interface clients without having to replicate backend data processing or business logic.  We can have iOS, Andriod, and perhaps Magic Leap clients leveraging the same backend API.

 ## Roadmap

 ### User Interface
 
 - Styling needs some love due to me not catching the link to the design concept until the last minute.  Continue migrating styles from index.css to styled components and reduce the dependenacy on index.css while making the components/container mark up more semantic
 
 - Dates on comments and blog posts can be displayed in a more user friendly format.  Bring in a library like momentjs and provide better formatting (ie 2 days ago)

 - Refactor to connecting container components to redux like BlogPostList. This would clean up alot of the passing around of callbacks and logged in user state.

 - Look for a better approach to form validation so that we are not repeating the validation logic in all form components

 - Look for a better approach for displaying loading indication while http requests are in flight.

 - Some components in the components directory are acting as containers with state, these should be moved into the containers directory instead to keep the components directory reserved for presentational components

 - Create components for html markup that's currently repeated like the blog post, comment edit and delete buttons

 ### Operational

 - Add some logging functionality currently there are no application logs being written to to assist with troublshooting

 - Implement monitoring so that we can be aware of any applicaiton or performance issues.

 ### Architectural

 - Look into refactoring the backend into a serverless architecture so that we dont have to maintain the VPS and pay based on usage rather than server up-time. 
 

## Getting Started

Leapblog can be run locally using two processes.  One for serving up the user interface and another for serving up the backend API.

### Prerequisites

The below applications need to be installed on your machine in order to run leapblog and debug locally.

```
Node
```

### Installing

Install NodeJS which can be downloaded [here](https://nodejs.org)

Verify Node and NPM are installed properly

```
node --version
npm --version
```
#### Setting Up The Backend API
Please note that the source code will attempt to start a server listening on port 8090.  Please make sure this is available on your machine.  If not, the code can be modified to use another port in index.js.  Also, the backed will attept to connect to firebase which requires a file called firebase-cert-dev.json to be in the config directory.  This file is not checked into source control but can be download from the link I provided to Jared.

Download the source

```
git clone <repo>
```

Install the required Node modules, from the source dir:

```
npm install
```

Start the server

```
node index.js
```

Alternately, if you intend to make source code changes you can use nodemon to re-start the server when files are updated.

#### Setting Up The User Interface
Note that the code is configured to make http requests to http://localhost:8090.  Please make sure this is up and running in order for the UI to properly render.  As an alternative, the user interface can be configured to use the live backend by updating the apiBaseUrl property value from localhost:8090 to 34.226.117.113 in config/AppConfig.js

Install Create React App

```
npm install -g create-react-app
```

Download the source

```
git clone <repo>
```

Install the required Node modules, from the source dir:

```
npm install
```

Start up the user interface with the development server

```
npm start
```

This will start the application up on port 3000 and open up a browser window on your machine.

## Built With

* [React](https://reactjs.org/) - User Interface
* [Redux](https://redux.js.org/) - Application State
* [Bootstrap](https://getbootstrap.com/) - UI Style Framework
* [Styled Components](https://www.styled-components.com/) - React Component Styling 
* [ExpressJS](https://expressjs.com/) - Backend API
* [PassportJS](http://www.passportjs.org/) - Authentication Middleware
* [Firebase](https://firebase.google.com/) - Real-Time Data Storage & User Management
* [Nginx](https://www.nginx.com) - Static Server and Reverse Proxy
* [AWS Lightsail](https://amazonlightsail.com/) - Simple VPS
* [Ubuntu](https://www.ubuntu.com/) - Operating System


## Authors

* **Kevin Saeed** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to you guys, this was a fun project that invoked alot of learning!
