import firebase from 'firebase';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
} from 'react-native-dotenv';

import 'firebase/firestore';

const FIREBASE_ENV = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
};

firebase.initializeApp(FIREBASE_ENV);

export const db = firebase.firestore();
