const logger = (req, res, next) => {
    console.log("method: ", req.method, "\nURL: ", req.url);
    next();
}

export default logger;

