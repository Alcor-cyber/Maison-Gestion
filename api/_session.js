const crypto = require("crypto");

const HOUSE_SESSION_COOKIE = "house_session";
const HOUSE_PASSWORD_ENV = "HOUSE_APP_PASSWORD";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

function getHousePassword() {
  return process.env[HOUSE_PASSWORD_ENV] || "";
}

function isSessionProtectionEnabled() {
  return Boolean(getHousePassword());
}

function parseCookies(headerValue) {
  return String(headerValue || "")
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce((cookies, entry) => {
      const separatorIndex = entry.indexOf("=");
      if (separatorIndex === -1) {
        return cookies;
      }

      const name = entry.slice(0, separatorIndex).trim();
      const value = entry.slice(separatorIndex + 1).trim();
      cookies[name] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function createSessionToken(password) {
  return crypto
    .createHmac("sha256", password)
    .update("maison-gestion-session")
    .digest("hex");
}

function hasValidHouseSession(request) {
  if (!isSessionProtectionEnabled()) {
    return true;
  }

  const cookies = parseCookies(request.headers.cookie || "");
  return cookies[HOUSE_SESSION_COOKIE] === createSessionToken(getHousePassword());
}

function comparePasswords(inputPassword, configuredPassword) {
  const left = Buffer.from(String(inputPassword || ""));
  const right = Buffer.from(String(configuredPassword || ""));

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function setHouseSession(response) {
  const password = getHousePassword();
  const token = createSessionToken(password);
  response.setHeader(
    "Set-Cookie",
    `${HOUSE_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${SESSION_DURATION_SECONDS}`
  );
}

function clearHouseSession(response) {
  response.setHeader(
    "Set-Cookie",
    `${HOUSE_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`
  );
}

module.exports = {
  clearHouseSession,
  comparePasswords,
  getHousePassword,
  hasValidHouseSession,
  isSessionProtectionEnabled,
  setHouseSession,
};
