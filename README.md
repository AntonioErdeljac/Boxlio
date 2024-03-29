# Boxlio

*A new way to deliver.*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
#### Web application:
* Node.js
* MongoDB
* npm

#### Android app:
* adb
* Android Studio
* watchman

### Installing

A step by step series of examples that tell you have to get a development env running

**After cloning the repo:**

Installing the frontend

```
cd Boxlio/frontend
npm install --save
npm start
```

Installing the backend

```
cd Boxlio/backend
npm install --save
npm install -g nodemon
npm run dev
```

Installing the android app

```
cd Boxlio/BoxlioAndroid
react-native run-android
npm start
```

Route to [localhost:3000](http://localhost:3000/) in your browser, and create an account.

## Built With

* [React.js](https://reactjs.org/) - The web framework used
* [Node.js](https://nodejs.org/en/) - The backend framework used
* [Express.js](https://expressjs.com/) - The backend node.js framework used
* [Socket.io](https://socket.io/) - Used for real-time bidirectional event-based communication
* [React Native](https://facebook.github.io/react-native/) - The mobile framework used

## Authors

* **Antonio Erdeljac** - *Initial work* - [Boxlio](https://github.com/AntonioErdeljac/Boxlio)

## Acknowledgments

* This project was created for Croatian IT competition
* Since Boxlio is still under development, backend constants were not extracted into environment variables. You will have to change *API_ROOT* constant in *BoxlioAndroid/src/constants/routes.js* to your own value so Boxlio can function properly (preferably a ngrok tunnel to backend so android app can connect to backend.).
