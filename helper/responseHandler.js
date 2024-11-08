exports.responseHandler = (res, status = 200, data = null, message = '', success = true) => {
  console.log(`🚀 ~ status: ${status}, data: ${JSON.stringify(data)}, message: ${message}, success: ${success}`);
  return res.status(status).json({
    success: success,
    data: data,
    message: message
  });
};
