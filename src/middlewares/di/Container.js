
export default class Container {

    static instance;

    _schema = {};
    _services = {};

    set (name, value) {
        this._schema[name] = value;
    }

    get (name) {
        if(!this._services[name])
            return this._services[name] = this._build(name);
        return this._services[name];        
    }

    _build (name) {
        let value = this._schema[name];
        if(typeof value !== 'object'){
           return this._bindValue(value);
        }else{
            if(value.class){
                let classInstance = value.class;
                if(Array.isArray(value.arguments)) 
                    value.arguments = value.arguments.map(v => this._bindValue(v));
                let newClass = classInstance.bind.apply(classInstance, [null].concat(value.arguments));
                return new newClass;
            }else{
                return value;
            }
        }
    }

    _bindValue (value) {
        if(typeof value === 'string'){
            if(value.charAt(0) === '@')
                return this.get(value.substr(1));           
        }
        return value;
    }
    
    static getInstance() {
        if(Container.instance)
            return Container.instance;
        return Container.instance = new Container;
    }

}