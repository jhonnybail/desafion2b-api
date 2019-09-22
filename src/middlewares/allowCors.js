
export default (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Expose-Headers', 'X-Token');

    if (req.method === 'OPTIONS') {
        res.send();
        return;
    }

    next();
};