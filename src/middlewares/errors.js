
export const notFound = (req, res, next) => {
    return res.status(404).json('Nenhuma rota encontrada.');
};

export const parser = (err, req, res, next) => {

    switch (err.message) {
        case 'not-found':
            err.status = 404;
            break;
        case 'access-denied':
            err.status = 403;
            break;
        default:
            err.status = 400;
    }

    next(err);
};

export const developmentError = (err, req, res, next) => {
    
    if(err){
        console.error(err.status || 500);
        console.error(err.message);
        console.error(err.stack);
        console.log(req.headers);
        console.log(req.body);
    
        if (typeof err === 'string') {
            err = {
                message: err
            };
        }
    
        res.status(err.status || 500).send({
            success: false,
            message: err.message,
            stack: err.stack
        });
    }
    res.end();
}

export const productionError = async (err, req, res, next) => {
    if(err){
        err.status = err.status || 500;
        if (err.status === 500) {
            err.errorData = {
                user: req.user,
                req: {
                    method: req.method,
                    url: req.originalUrl,
                    queryString: req.params,
                    body: req.body,
                }
            };
        }
        res.status(err.status).send('Erro interno da aplicaçã');
    }
    
    res.end();
}