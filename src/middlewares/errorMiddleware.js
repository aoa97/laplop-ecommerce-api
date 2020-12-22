const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (e, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)

    // Accessed in FE via [e.response.data]
    res.send({
        message: e.message,
        stack: process.env.Node_ENV === 'dev' ? e.stack : null
    })
}

export { notFound, errorHandler }
