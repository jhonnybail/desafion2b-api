import cloudinary from 'cloudinary';
import Service from '../../generic/Service';

export default class PostService extends Service  {

    async find (params) {
        let result = await super.find(params);
        result.results = result.results.reverse();
        return result;
    }

    async save (model) {
        if(!model.titulo) throw Error('Título é obrigatório.');
        if(!model.texto) throw Error('Texto é obrigatório.');
        if(!model.autor) throw Error('Autor é obrigatório.');
        model.data = new Date;
        model.idAutor = model.autor.id;
        return await super.save(model);
    }
    
}