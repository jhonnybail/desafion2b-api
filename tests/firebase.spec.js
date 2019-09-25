import { expect } from "chai";
import * as firebaseAdmin from 'firebase-admin';
import * as firebase from 'firebase';

let admin;
let client;

describe('Firebase SDK', () => {

  describe('Admin SDK', () => {

    it('Should be connect to Firebase', done => {
      
      admin = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert({
              type: process.env.FIREBASEADMIN_TYPE,
              project_id: process.env.FIREBASE_PROJECT_ID,
              private_key_id: process.env.FIREBASEADMIN_PRIVATE_KEY_ID,
              private_key: process.env.FIREBASEADMIN_PRIVATE_KEY,
              client_email: process.env.FIREBASEADMIN_CLIENT_EMAIL,
              client_id: process.env.FIREBASEADMIN_CLIENT_ID,
              auth_uri: process.env.FIREBASEADMIN_AUTH_URI,
              token_uri: process.env.FIREBASEADMIN_TOKEN_URI,
              auth_provider_x509_cert_url: process.env.FIREBASEADMIN_AUTH_PROVIDER_X509_CERT_URL,
              client_x509_cert_url: process.env.FIREBASEADMIN_CLIENT_X509_CERT_URL
          }),
          databaseURL: process.env.FIREBASE_DATABASEURL
      });

      expect(admin).to.be.an.property('firestore').that.to.be.a('function');
      expect(admin.firestore()).to.be.an('object');

      done();

    });

  });

  describe('Client SDK', () => {

    it('Should be connect to Firebase', done => {
      
      client = firebase.initializeApp({
        apiKey: process.env.FIREBASECLIENT_APIKEY,
        authDomain: process.env.FIREBASECLIENT_AUTHDOMAIN,
        databaseURL: process.env.FIREBASE_DATABASEURL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGEBUCKECT,
        messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
      });

      expect(client).to.be.an.property('auth').that.to.be.a('function');
      expect(client.auth()).to.be.an('object');

      done();

    });

  });

});