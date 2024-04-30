
## Installation

Install with npm

- Setup the backend
```bash
  cd backend
  npm install
```
- Setup the frontend 
```bash
  cd frontend
  npm install
```
## Environment Variables 

To run this project, you will need to add the following environment variables to your .env file ( which you are going to create in the backend folder backend/.env )
```bash
  PORT = 4000
  MONGO_URI = your_mongo_uri
  JWT_SECRET = your_jwt_secret
```
you may want to change the frontend code depending on whether you chose a PORT other than 4000




## Firebase Setup
Setup a firebase storage from the firebase console.
Create a firebase.js file inside frontend/src/ 
```bash
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```
Make sure to copy and paste your own firebase configuration parameters from the firebase console.
## Run Locally

Start the backend server

```bash
  npm test
```
Start the frontend server

```bash
  npm start
```

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)

