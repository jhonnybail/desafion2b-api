
export default async (req, res, next) => {
    const { container, method, params, body, headers} = req;
    
    try {
        const service   = container.get('general.service.User');
        const token     = String(headers['authorization']).split(' ')[1];
        
        let buff                = new Buffer(token, 'base64');
        let text                = buff.toString('ascii');
        let [id, accessToken]   = text.split(":");
        
        let user = await service.getById(id);
        
        req.auth = user;
        
    }catch(error){
        req.auth = null;
    }
    next();
}