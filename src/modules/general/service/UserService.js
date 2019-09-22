import Service from '../../generic/Service';
import { auth } from 'firebase';

export default class UserService extends Service  {

    firebase;

    constructor(repository, firebase) {
        super(repository);
        this.firebase = firebase;
    }

    async save (model) {
        if(!model.email) throw Error('E-mail é obrigatório.');
        if(!model.$id()){
            let result = await this.find({email: model.email});
            if(result.total > 0) throw new Error('E-mail já cadastrado.');
        }
        return await super.save(model);
    }
    
    auth = async (method, params) => {
        
        if(method === 'google'){
            let credential = auth.GoogleAuthProvider.credential(
                    params.id_token,
                    params.access_token);
            let userCredential = await this.firebase.auth().signInWithCredential(credential);
            let result  = await this.find({email: userCredential.email});
            let model;
            if(result.total == 0){
                model = new this.repository.model;
                model.$setJson({
                    nome: userCredential.displayName.split(" ")[0],
                    sobrenome: userCredential.displayName.split(" ").reverse()[0],
                    email: userCredential.email,
                    avatar: userCredential.photoURL,
                    googleAccessToken: params.access_token
                });
            }else{
                model = result.results[0];
                model.$setJson({
                    avatar: userCredential.photoURL,
                    googleAccessToken: params.access_token
                });
            }
            
            return await this.save(model);
        }
        
        return false;
        
    }

}