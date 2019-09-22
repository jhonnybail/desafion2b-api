import Container from './Container';

export default class DependencyInjectionMiddleware {

    container;

    constructor (services) {
        this.container = Container.getInstance();
        Object.keys(services).forEach( key => this.container.set(key, services[key]));
    }

    middleware () {
        return (req, res, next) => {
            req.container = this.container;
            next();
        }
    }

}