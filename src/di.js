import * as general from './modules/general';
import * as blog from './modules/blog';

export default {
    ...general.models,
    ...general.repository,
    ...general.services,
    ...general.controllers,
    ...general.controllersAs,
    ...blog.models,
    ...blog.repository,
    ...blog.services,
    ...blog.controllers,
    ...blog.controllersAs
}