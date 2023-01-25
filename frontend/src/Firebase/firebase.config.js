import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth"

import config from "../config/variable";

const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID,
  };


//   initialize firebase;
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Google_Provider = new GoogleAuthProvider(app)
const Facebook_Provider = new FacebookAuthProvider(app)

export default { Facebook_Provider, Google_Provider, auth}