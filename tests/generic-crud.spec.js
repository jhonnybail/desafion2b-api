import { expect } from "chai";
import * as firebaseAdmin from 'firebase-admin';
import Model from '../src/modules/generic/Model';
import Repository from '../src/modules/generic/Repository';

let admin = firebaseAdmin.initializeApp({
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
let Teste;
let repository;

describe('Generic CRUD', () => {

  describe('Testing Model', () => {

    it('Create Model', done => {
      
      Teste = class Teste extends Model {
        static get collection() {
          return 'teste';
        }
      }

      expect(Teste).to.be.a('function');
      expect(Teste).to.have.a.property('collection').that.to.be.a('string');
      expect(new Teste).to.be.an.instanceof(Model);

      done();

    });

    it('Model $setJson method', done => {
      
      let teste = new Teste;
      teste.$setJson({name: 'Jonathan'});

      expect(teste).to.have.a.property('name', 'Jonathan');

      done();

    });

    it('Model $getJson method', done => {
      
      let teste1 = new Teste;
      let teste2 = new Teste;
      teste1.name = 'Jonathan';
      teste1.other = teste2;
      teste2.name = 'Bogdanovicz'

      expect(teste1).to.have.a.property('name', 'Jonathan');
      expect(teste2).to.have.a.property('name', 'Bogdanovicz');
      expect(teste1).to.have.a.property('other').that.to.be.an.instanceof(Teste);

      let data = teste1.$getJson();
      expect(data).to.be.an('object');
      expect(data).to.have.a.property('name');
      expect(data).to.have.a.property('other').that.to.not.be.an.instanceof(Teste);

      done();

    });

    it('Model $getJson method', done => {
      
      let teste = new Teste;
      teste.$id(1);
      expect(teste.$id()).to.equal(1);
      expect(teste.$getJson()).to.have.a.property('id', 1);

      done();

    });

  });

  describe('Testing Repository', () => {

    it('Create repository', done => {
      
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

      repository = new Repository(Teste);

      expect(repository).to.have.includes(['insert', 'find', 'update', 'findById', 'delete']);
      expect(new (repository.model)).to.be.an.instanceof(Teste);

      done();

    });

    it('Insert data', done => {
      
      expect(() => repository.insert({name: 'Jonathan'})).to.throw(Error);

      let data = new Teste;
      data.name = 'Jonathan';

      expect(data.$id()).to.be.empty;

      let data = repository.insert(data);

      expect(data).to.be.an.instanceof(Teste);
      expect(data).to.have.an.instanceof(Teste);


      done();

    });

  });

});