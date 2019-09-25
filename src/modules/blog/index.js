
export const models = {
    'blog.model.Post': {
        class: require('./Post').default
    }
};

export const controllers = {
    'blog.controller.Post': {
        class: require('./controller/PostController').default,
        arguments: ['@blog.model.Post', '@blog.service.Post']
    }
};

export const controllersAs = {
    'post': '@blog.controller.Post'
}

export const services = {
    'blog.service.Post': {
        class: require('./service/PostService').default,
        arguments: ['@blog.repository.Post']
    }
};

export const repository = {
    'blog.repository.Post': {
        class: require('../generic/Repository').default,
        arguments: ['@blog.model.Post']
    }
}