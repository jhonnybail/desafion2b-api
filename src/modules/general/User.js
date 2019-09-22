import Model from '../generic/Model';

export default class User extends Model {

    static get collection() {
        return 'user';
    }

}