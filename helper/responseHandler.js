exports.responseHandler = (res, status = 200, data = null, message = '', success = true) => {
  const response = {
    success,
    data,
    message,
  }
  console.log('Response ==> ',response)
  return res.status(status).json({
    success: success,
    data: data,
    message: message
  });
};
