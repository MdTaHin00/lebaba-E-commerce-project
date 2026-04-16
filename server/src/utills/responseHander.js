
//! res,statusCode,message,data ->
//*  ai gola jakana successResponse function use kola hova tar thaka asva
const successResponse = (res, statusCode, message, data = {}) => {
    res.status(statusCode).send({
        success: true,
        message: message,
        data: data
    })
}

//! res,statusCode,message,error ->
//*  ai gola jakana successResponse function use kola hova tar thaka asva
const errorResponse = (res, statusCode, message, error = null) => {
    console.log(error);
    res.status(statusCode).send({
        success: false,
        message: message,
        error: error ? error.message : null
    })

}

module.exports = {
    successResponse,
    errorResponse
}