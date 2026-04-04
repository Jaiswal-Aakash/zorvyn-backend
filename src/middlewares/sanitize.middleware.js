const sanitize = (obj) => {
    if(!obj || typeof obj !== 'object') return obj;

    for(let key in obj) {
        if(key.startsWith('$') || key.startsWith('.')){
            delete obj[key];
        } else if(typeof obj[key] === 'object'){
            sanitize(obj[key]);
        }
    }
    return obj;
}

const sanitizeMiddleware = (req, res, next) => {
    if(req.body) sanitize(req.body);
    if(req.params) sanitize(req.params);

    const cleanQuery = {};
    for(let key in req.query){
        if(!key.startsWith('$') && !key.startsWith('.')){
            cleanQuery[key] = req.query[key];
        }
    }
    req.cleanQuery = cleanQuery;

    next();
};

module.exports = sanitizeMiddleware;