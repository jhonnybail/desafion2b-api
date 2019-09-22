
export default class Model {
    id;

    $id = (id) => {
        if(id){
            this.id = id;
            return;
        }
        return this.id;
    }

    $setJson = (obj) => {
        Object.keys(obj).forEach(key => this[key] = obj[key]);
    }

    $getJson = () => {
        let data = {};
        Object.keys(this).forEach(value => {
            let newValue = typeof this[value] != "function" ? this[value] : null;
            if(newValue) {
                newValue    = newValue instanceof Model ? newValue.$getJson() : newValue;
                data[value] = newValue;
            }
        });
        return data;
    }
}