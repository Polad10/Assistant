import { getApp, getApps, initializeApp } from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
}

// Initialize Firebase
const appsNr = getApps().length
const app = appsNr === 0 ? initializeApp(firebaseConfig) : getApp()
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence
const auth =
  appsNr === 0
    ? firebaseAuth.initializeAuth(app, { persistence: reactNativePersistence(AsyncStorage) })
    : firebaseAuth.getAuth()

export default app
