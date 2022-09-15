const allRequestsErrorHandlerMiddleware = (middleware) => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (err) {
            console.log('err',err)
            next(err)
        }
    }
}

module.exports = allRequestsErrorHandlerMiddleware; 