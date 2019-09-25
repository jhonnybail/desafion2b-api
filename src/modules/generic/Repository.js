import { firestore } from 'firebase-admin';
import Model from './Model';

export default class Repository {
    model;
    db;

    constructor(model) {
        if(!(model instanceof Model))
            throw new TypeError("Instance model should be from Model.");
        this.model  = model.constructor;
        this.db     = firestore();
    };

    async findById (id) {
        let collection  = this.db.collection(this.model.collection);
        let obj         = await collection.doc(id).get();
        if(!obj.data()) throw new Error('not-found');
        return this._buildModel(obj);
    }

    async find (params) {
                
        let collection  = await this.db.collection(this.model.collection);
        let result      = [];

        if(params && Object.keys(params).length > 0)
            Object.keys(params).forEach( v => !['orderBy', 'orderByDesc'].includes(v) ? collection = collection.where(v, '==', params[v]) : null);
        
        (await collection.get()).forEach(doc => {
            result.push(this._buildModel(doc));
        });
        if(Array.isArray(result)) return {total: result.length, results: result};
        return result;
    }

    async insert (model) {
        if(!(model instanceof Model))
            throw new TypeError("Instance model should be from Model.");
            
        let collection  = await this.db.collection(this.model.collection);
        let document    = await collection.add(model.$getJson());
        model.$id(document.id);
        return model;
    }

    async update (model) {
        if(!(model instanceof Model))
            throw new TypeError("Instance model should be from Model.");
            
        let doc = this.db.collection(this.model.collection).doc(model.$id());
        doc.set(model.$getJson());
        return model;
    }

    async remove (model) {
        if(!(model instanceof Model))
            throw new TypeError("Instance model should be from Model.");
            
        return await this.db.collection(this.model.collection).doc(model.$id()).delete();
    }

    _buildModel (doc) {
        let model = new this.model;
        model.$id(doc.id);
        model.$setJson(doc.data());
        return model;
    }
}