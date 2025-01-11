const userAgentInfo = require("express-useragent");
const ipinfo = require("ipinfo");
const LoginHistory = require("../models/userLoginHistory.js");
const getLogger = require("./consoleLoggerUtils.js");

async function LogLoginAttempt(user, username, success, req) {
  try {
    //const userAgentInfo = useragent.parse(req.headers["user-agent"]);
    //const geolocation = require("geolocation-utils");

    const ipData = await ipinfo(req.ip);
    await LoginHistory.create({
      user: user._id,
      username,
      success,
      ip: req.ip, // Retrieve IP address from the request
      userAgent: req.headers["user-agent"], // Retrieve User-Agent from the request headers
      deviceType: userAgentInfo.device_type,
      deviceModel: userAgentInfo.device_model,
      deviceOS: userAgentInfo.os,
      browser: userAgentInfo.browser,
      country: ipData.country,
      city: ipData.city,
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      sessionID: req.sessionID,
      sessionDuration:
        req.session && req.session.cookie
          ? req.session.cookie.originalMaxAge
          : null,
    });
  } catch (error) {
    getLogger("Error logging login attempt:", "red")(error);
  }
}
async function LogEmployeeAccessLoginAttempt(user, username, success, req) {
  try {
    //const userAgentInfo = useragent.parse(req.headers["user-agent"]);
    //const geolocation = require("geolocation-utils");

    const ipData = await ipinfo(req.ip);
    await emplyeeAccessloginHistoryModel.create({
      user: user._id,
      username,
      success,
      ip: req.ip, // Retrieve IP address from the request
      userAgent: req.headers["user-agent"], // Retrieve User-Agent from the request headers
      deviceType: userAgentInfo.device_type,
      deviceModel: userAgentInfo.device_model,
      deviceOS: userAgentInfo.os,
      browser: userAgentInfo.browser,
      country: ipData.country,
      city: ipData.city,
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      sessionID: req.sessionID,
      sessionDuration:
        req.session && req.session.cookie
          ? req.session.cookie.originalMaxAge
          : null,
    });
  } catch (error) {
    console.error("Error logging login attempt:", error);
  }
}

module.exports = { LogLoginAttempt, LogEmployeeAccessLoginAttempt };
