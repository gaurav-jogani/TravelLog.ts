// const { requestFailure } = require('../services/commonService');
// const { doPostRequest } = require('../services/httpService');
// exports.singupMiddleWare = async (req, res, next) => {

//     const { token } = req.body;

//     if (!token) {
//         return requestFailure(res, 'Please provide Re-Captcha token.');
//     }

//     let tokenRes = await doPostRequest('https://www.google.com/recaptcha/api/siteverify', `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`, { "Content-Type": "application/x-www-form-urlencoded" });

//     if (!tokenRes.success) return requestFailure(res, 'Re-Captcha token has expired. Please verify again.');

//     next();
// }