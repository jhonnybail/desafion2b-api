export default class Controller {
    model;
    service;
    request;
    response;
    allow = [];

    constructor(model, service) {
        this.model = model.constructor;
        this.service = service;
    }
    
    setAllow (allows) {
        if(Array.isArray(allows))
            this.allow = allows.map( v => v.toLocaleUpperCase());
        if(typeof allows === 'string')
            this.allow = [allows.toLocaleUpperCase()];
    }
    
    getAllow () {
        return this.allow;
    }

    setRequest(request) {
        this.request = request;
    }

    setResponse(response) {
        this.response = response;
    }

    async get (id) {
        return this.response.json({success: true, data: await this.service.getById(id)});
    }

    async getList () { 
        return this.response.json({success: true, data: await this.service.find(this.buildParams())});
    }

    async post (data) {
        if(!data) throw Error("Data is not was send.");
        let obj = new this.model;
        obj.$setJson(data);
        return this.response.json({success: true, data: await this.service.save(obj)});
    };

    async put (id, data) {
        let obj = await this.service.getById(id);
        obj.$setJson(this.buildParams(data));
        return this.response.json({success: true, data: await this.service.save(obj)});
    };

    async delete (id) {
        let obj = new this.model;
        obj.$setJson(this.buildParams({id: id}));
        return this.service.remove(obj)
            .then(result => this.response.json({success: true}));
    };
    
    buildRouterParams () {
        const { params } = this.request;
        let result = Object.keys(params).reduce((result, key) => {
            if(key.match(/param/) && params[key]){
                let value = params['value' + key.replace('param', '')];
                result[params[key]] = Number.isNaN(Number(value)) ? value : Number(value);
            }
            return result;
        }, {});
        if(params.id) return {...result, id: params.id};
        return result;
    }
    
    buildParams (data = {}) {
        if(this.request){
            const { params, method, body, query } = this.request;
    
            let dataParams  = this.buildRouterParams();
            
            if(['post', 'put'].includes(method.toLocaleLowerCase())){
                dataParams = {...dataParams, ...body};
            }
            return {...query, ...dataParams, ...data};
        }
        return data;
    };
}