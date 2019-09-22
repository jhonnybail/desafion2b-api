
export const models = {
    'general.model.Post': {
        class: require('./Post').default
    }
};

export const controllers = {
    'general.controller.Post': {
        class: require('./controller/PostController').default,
        arguments: ['@general.model.Post', '@general.service.Post']
    }
};

export const controllersAs = {
    'post': '@general.controller.Post'
}

export const services = {
    'general.service.Post': {
        class: require('./service/PostService').default,
        arguments: ['@general.repository.Post']
    }
};

export const repository = {
    'general.repository.Post': {
        class: require('../generic/Repository').default,
        arguments: ['@general.model.Post']
    }
}