import Repository from './Repository';

export default class Service {
    repository;

    constructor(repository) {
        this.repository = repository;
    }

    async getById (id) {
        return await this.repository.findById(id);
    }

    async find (params) { 
        return await this.repository.find(params);
    }

    async save (model) {
        return await (model.$id() ? this.repository.update(model) : this.repository.insert(model));
    }

    async remove (model) {
        return await this.repository.remove(model);
    }
}