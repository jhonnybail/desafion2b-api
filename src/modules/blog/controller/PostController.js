import Controller from '../../generic/Controller';

export default class PostController extends Controller  {

    constructor(model, service) {
        super(model, service);
        this.setAllow('get');
    }
    
    async post (data) {
        let {id, nome, email} = this.request.auth.$getJson();
        data.autor  = {id, nome, email};
        return await super.post(data);
    }
    
}