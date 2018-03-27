# onelogin-scim-node

A simple Node.js API built using [Restify](http://restify.com/) that handles and responds to all of the SCIM requests made by OneLogin for user provisioning.

The sample is based on the [OneLogin Core User Schema](https://developers.onelogin.com/scim/define-user-schema) but could be easily adapted to support the Enterprise schema.

## Endpoints
The endpoints are configured in the root `index.js` file and each has a corresponding handler which is found in the `handlers` directory.

```js
// Users
server.get('/Users', handlers.users.list)
server.get('/Users/:id', handlers.users.get)
server.post('/Users', handlers.users.create)
server.put('/Users/:id', handlers.users.update)
server.del('/Users/:id', handlers.users.delete)

// Groups
server.get('/Groups', handlers.groups.list)
server.post('/Groups', handlers.groups.create)
server.patch('/Groups/:id', handlers.groups.update)
```

## User/Group Store
When you run this sample it will create a temp-db.json file in the root of the project that contains `users` and `groups`. As you run the provisioning tasks in OneLogin this db will be updated.

This file based db is powered using LowDB and is not intended for production use. It is simply for this example.

It is expected that you would replace the calls to this db with your own database or api calls.

## Logging
This sample shamelessly uses `console.log` all over the place as a simple way to display whats going on as the endpoints are hit. It is expected that you will replace this with your favorite logging solution.

## Run the sample
You can run this locally and watch the terminal as OneLogin sends provisioning requests.

### 1. Download the code and install dependencies
From your terminal

```sh
git clone https://github.com/onelogin/onelogin-scim-node.git
cd onelogin-scim-node && npm install
```

### 2. Run the code
This will start the SCIM API on `http://localhost:8080`
```sh
npm start
```

### 3. Expose the API to the internet
To run this sample end to end with OneLogin it needs to be exposed to the internet so that OneLogin make provisioning requests to the various endpoints.

For this we recommend using [ngrok](https://ngrok.com/).

In a new terminal window download ngrok
```sh
npm install -g ngrok
```

Then create a new HTTP tunnel using ngrok and point it at your SCIM API
```sh
ngrok http 8080
```

Ngrok will create an `HTTPS` url that you will need to copy and use when setting up your SCIM app in OneLogin.

![ngrok](https://s3.amazonaws.com/onelogin-screenshots/dev_site/images/ngrok8080.png)

### 4. Configure your SCIM app in OneLogin
If you already have a SCIM app configured then simply paste the ngrok url in the **SCIM Base URL** field on the **Configuration** tab of your app.

If you don't have a SCIM app conifured yet then [follow this guide to create an app](https://developers.onelogin.com/scim/create-app) using the **SCIM Provisioner with SAML (Core Schema)** .

### 5. Trigger provisioning tasks and test the app
Follow [this guide to enable provisioning and test](https://developers.onelogin.com/scim/test-your-scim) your SCIM API.
