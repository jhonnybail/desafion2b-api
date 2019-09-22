import Model from '../generic/Model';

export default class Post extends Model {

    static get collection() {
        return 'post';
    }

}