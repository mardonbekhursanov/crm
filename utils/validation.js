const ServerError = (res, error) => {
    return res.status(500).json({
        alert: {
            error: error.message
        }
    }
    )
}
const ValidError = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({
        alert: {
            error: errorMessage
        }
    })
}   
module.exports = {
    ServerError,
    ValidError
}