import express from 'express';
import bodyParser from "body-parser";
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

import DependencyInjectionMiddleware from './middlewares/di/DependencyInjectionMiddleware';
import Container from './middlewares/di/Container';
import callController from './middlewares/callController';
import allowCors from './middlewares/allowCors';
import authMiddleware from './middlewares/auth';
import * as errors from './middlewares/errors';

const app = express();
const main = express();
const container = Container.getInstance();

//Firebase
const firebaseAdmin = admin.apps.length == 0 ? admin.initializeApp({
    credential: admin.credential.cert({
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
}) : admin.apps[0];
const firebaseApp   = firebase.apps.length == 0 ? firebase.initializeApp({
    apiKey: process.env.FIREBASECLIENT_APIKEY,
    authDomain: process.env.FIREBASECLIENT_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKECT,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
}) : firebase.apps[0];
container.set('firebase', firebaseApp);
//

main.use(allowCors);
main.use('/api/v1', app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DI
app.use(new DependencyInjectionMiddleware(require('./di').default).middleware());
//

//Generic Routes
app.post('/auth', async (req, res, next) => {
    const { body }   = req;
    const { method, ...params } = body;
    const userService   = container.get('general.service.User');
    try{
        let user = await userService.auth(method, params);
        res.json({success: true, data: user});
    }catch(error){
        next(error);
    }
});

app.use(authMiddleware);

app.all('(/:param1/:value1)?(/:param2/:value2)?(/:param3/:value3)?/:controller', callController);
app.all('(/:param1/:value1)?(/:param2/:value2)?(/:param3/:value3)?/:controller/:id', callController);
//

app.use(errors.parser);
app.use(errors.developmentError);

export default main;