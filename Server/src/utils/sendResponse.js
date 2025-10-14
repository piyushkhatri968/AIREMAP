export const sendResponse = (res, statusCode, status, message, data) => {
  res.status(statusCode).json({ success: status, message: message, data });
};
