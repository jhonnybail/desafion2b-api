import User from '../User';
import Service from '../../generic/Service';
//import { auth } from 'firebase';

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
            /*let credential = auth.GoogleAuthProvider.credential(
                    params.id_token,
                    params.access_token);
            let user    = (await this.firebase.auth().signInWithCredential(credential)).additionalUserInfo.profile;
            let result  = await this.find({email: user.email});
            let model;
            if(result.total == 0){
                model = new this.repository.model;
                model.$setJson({
                    nome: user.name.split(" ")[0],
                    sobrenome: user.family_name,
                    email: user.email,
                    avatar: user.picture,
                    googleAccessToken: params.access_token
                });
            }else{
                model = result.results[0];
                model.$setJson({
                    avatar: user.picture,
                    googleAccessToken: params.access_token
                });
            }
            
            return await this.save(model);*/
        }
        
        return false;
        
    }

}