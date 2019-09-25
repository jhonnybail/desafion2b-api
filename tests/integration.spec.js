import chai from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";
import app from '../src/app';

chai.use(chaiAsPromised);
chai.use(chaiHttp);
let { expect, request } = chai;
chai.should();

describe('Integration Tests', () => {
  
  describe('Requests that don\'t requires Authorization', () => {
    
    it('Home should be posts feed', async () => {
      
      let home = await request(app).get('/');
      home.should.not.be.rejectedWith;
      home.should.to.have.a.property('res').that.have.status(200);
      home.res.should.to.be.json;
      
      let result = home.body;
      result.should.to.have.a.property('success', true);
      result.should.to.have.a.property('data').that.to.be.an('object').that.have.a.property('total');
      result.data.should.to.have.a.property('results').that.to.be.an('array');
    
    });
    
  });
  
  describe('Requests that requires Authorization', () => {
    
    describe('Missing header Authorization', () => {
      
      it('List Users requires Authorization', async () => {
      
        let users = await request(app).get('/api/v1/user');
        users.should.not.be.rejectedWith;
        users.should.to.have.a.property('res').that.have.status(401);
        users.res.should.to.be.json;
      
      });
      
      it('Not allowed to publish without Autorization', async () => {
        
        let post = await request(app).post('/api/v1/post')
                          .send({titulo: 'Teste'});
        post.should.not.be.rejectedWith;
        post.should.to.have.a.property('res').that.have.status(401);
        post.res.should.to.be.json;
      
      });
      
    });
      
    describe('Sending header', () => {
      
      it('Publish without texto', async () => {
        
        let auth  = 'Basic bk5aUGU2Y3RxZlB6WldwRklZMHM6eWEyOS5HbHlNQjFGUDVIZjFSZkdtdEc2NkR4RGx2dTYwQzVKUm5oajZOMzBMSk1nWEdvc2ZMenN5TDBsLXVROHlMdUpQQ1UyNDlXTVZ6UnhFWHp3UnRSajJjTVVsQ1dhVE5yc3UyckRDTFZvS0tKeXBVbzhfcVJuZVZjazJtSVA5S3c=';
        let post  = await request(app).post('/api/v1/post')
                          .set({
                            Authorization: auth
                          })
                          .send({titulo: 'Teste'});
        post.should.not.be.rejectedWith;
        post.should.to.have.a.property('res').that.have.status(400);
        post.res.should.to.be.json;
        post.body.should.to.have.a.property('success', false);
        post.body.should.to.have.a.property('message');
      
      });
      
    });
    
  });

});