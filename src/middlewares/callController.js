
export default async (req, res, next) => {
    let { container, method, params, body} = req;
    
    try {
        const controller    = container.get(params.controller);
        const allow         = controller.getAllow();
        
        controller.setRequest(req);
        controller.setResponse(res);
        
        if(allow.length == 0 || (allow[0] !== '*' && !allow.includes(method)))
            if(!req.auth)
                throw new Error("Requisição sem autorização.");
        
        (async () => {         
            if(method.toLocaleLowerCase() === 'get'){
                return (!params.id ? controller.getList() : controller.get(params.id));
            }else if(method.toLocaleLowerCase() === 'post'){
                return controller.post(body);
            }else if(method.toLocaleLowerCase() === 'put'){
                return controller.put(params.id, body);
            }else if(method.toLocaleLowerCase() === 'delete'){
                return controller.delete(params.id);
            }
        })()
            .then(response => next())
            .catch(error => {
                if(error.name === "ServiceNotFoundException")
                    next(new Error('not-found'));
                else
                    next(error);
            })
        
    }catch(error){ 
        if(error.name === "ServiceNotFoundException")
            next(new Error('not-found'));
        else
            next(error);
    }
}