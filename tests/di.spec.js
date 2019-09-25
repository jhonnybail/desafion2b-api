import { expect } from "chai";
import Container from '../src/middlewares/di/Container';

describe('DI Tests', () => {

  it('Testing Set and Get new service', done => {
    const container = new Container;
    container.set('service', 1);
    expect(container.get('service')).to.equal(1);
    done();
  });

  it('Testing Set and Get function', done => {
    const container = new Container;
    container.set('service', (a) => a * 2);
    expect(container.get('service')).to.be.a('function');
    expect(container.get('service')(2)).to.equal(4);
    expect(container.get('service')(2)).to.equal(4);
    done();
  });

  it('Testing Set and Get class', done => {
    const container = new Container;
    class MyClass {}

    container.set('service', MyClass);
    expect(container.get('service')).to.be.a('function');
    expect(new (container.get('service'))).to.be.an.instanceof(MyClass);

    container.set('service', {class: MyClass});
    expect(container.get('service')).to.be.a('object');
    expect(container.get('service')).to.be.an.instanceof(MyClass);
    
    done();
  });

  it('Dependency test', done => {
    const container = new Container;
    class MyClass { constructor(a){this.a = a} }

    container.set('service', {class: MyClass});
    expect(container.get('service').a).to.be.an.undefined;

    container.set('service', {class: MyClass, arguments: [1]});
    expect(container.get('service').a).to.equal(1);

    container.set('service', {class: MyClass, arguments: [new MyClass(2)]});
    expect(container.get('service').a).to.be.an('object');
    expect(container.get('service').a).to.be.an('object').that.to.have.property('a');
    expect(container.get('service').a).to.be.an('object').that.to.have.property('a', 2);
    
    done();
  });

  it('Look if two containers doesn\'t mix your services', done => {
    const container1 = new Container;
    const container2 = new Container;

    container1.set('service', 1);
    container2.set('service', 2);
    expect(container1.get('service')).to.equal(1);
    expect(container2.get('service')).to.equal(2);
    
    done();
  });

  it('Singleton test', done => {
    const container1 = Container.getInstance();
    const container2 = Container.getInstance();

    container1.set('service', 1);

    expect(container2.get('service')).to.equal(1);
    
    done();
  });

});