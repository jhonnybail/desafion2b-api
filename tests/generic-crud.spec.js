import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as firebaseAdmin from 'firebase-admin';
import Model from '../src/modules/generic/Model';
import Repository from '../src/modules/generic/Repository';

chai.use(chaiAsPromised);
let { expect } = chai;
chai.should();

let admin;
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
      
      admin = firebaseAdmin.apps.length === 0 ? firebaseAdmin.initializeApp({
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
      }) : firebaseAdmin.apps[0];

      repository = new Repository(new Teste);

      expect(repository).to.have.a.property('insert');
      expect(repository).to.have.a.property('find');
      expect(repository).to.have.a.property('findById');
      expect(repository).to.have.a.property('update');
      expect(repository).to.have.a.property('remove');
      expect(new (repository.model)).to.be.an.instanceof(Teste);

      done();

    });
    
    it('Return error when insert data without model', async () => {
      await repository.insert({name: 'Jonathan'}).should.be.rejectedWith(TypeError);
    });

    it('Insert data', async () => {
      
      let data = new Teste;
      data.name = 'Jonathan';

      expect(data.$id()).to.be.undefined;

      data = await repository.insert(data);

      expect(data).to.be.an.instanceof(Teste);
      expect(data.$id()).to.not.be.empty;

    });

    it('Find data', async () => {
      
      let results = await repository.find();
      
      expect(results).to.be.an('object').that.to.have.a.property('total').that.to.be.at.least(1);
      expect(results).to.have.a.property('results').that.to.be.an('array');
      expect(results.results[0]).to.be.instanceof(Teste);
      
      let model = await repository.findById(results.results[0].$id());
      
      expect(model).to.be.instanceof(Teste);
      
      await repository.findById(0).should.be.rejectedWith(Error);

    });

    it('Update data', async () => {
      
      let results = await repository.find();
      results.results[0].name = "Débora";
      
      let model = await repository.update(results.results[0]) ;
      
      expect(model).to.be.instanceof(Teste);
      expect(model).to.be.a.property('name', 'Débora');
      
      await repository.update({id: model.$id(), name: 'Débora'}).should.be.rejectedWith(Error);

    });

    it('Remove data', async () => {
      
      let results           = await repository.find();
      let [model, ...list]  = results.results;
      
      await repository.remove({id: model.$id()}).should.be.rejectedWith(Error);
      await repository.remove(model).should.not.be.rejectedWith(Error);
      await repository.findById(model.$id()).should.be.rejectedWith(Error);
      
      list.forEach(async v => repository.remove(v).should.not.be.rejectedWith(Error));

    });

  });

});