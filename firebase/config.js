const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');
dotenv.config();



class FirebaseConfig {
  constructor() {
    this.apiKey = process.env.FIREBASE_API_KEY,
    this.authDomain = process.env.FIREBASE_AUTH_DOMAIN,
    this.projectId = process.env.FIREBASE_PROJECT_ID,
    this.storageBucket = process.env.FIREBASE_STORAGE_BUCKET,
    this.messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID,
    this.appId = process.env.FIREBASE_APP_ID,
    this.measurementId = process.env.FIREBASE_MEASUREMENT_ID

    this.app = null;
    this.auth = null;
    this.initializeApp();
  }

  config() {
    return {
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId,
      appId: this.appId,
      measurementId: this.measurementId
    }
  };

  initializeApp() {
    this.app =  initializeApp(this.config());
  }
}

module.exports = FirebaseConfig;
