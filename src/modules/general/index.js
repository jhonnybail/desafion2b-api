
export const models = {
    'general.model.User': {
        class: require('./User').default
    }
};

export const controllers = {
    'general.controller.User': {
        class: require('../generic/Controller').default,
        arguments: ['@general.model.User', '@general.service.User']
    }
};

export const controllersAs = {
    'user': '@general.controller.User'
}

export const services = {
    'general.service.User': {
        class: require('./service/UserService').default,
        arguments: ['@general.repository.User', '@firebase']
    }
};

export const repository = {
    'general.repository.User': {
        class: require('../generic/Repository').default,
        arguments: ['@general.model.User']
    }
}