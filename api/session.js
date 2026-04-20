const {
  clearHouseSession,
  comparePasswords,
  getHousePassword,
  hasValidHouseSession,
  isSessionProtectionEnabled,
  setHouseSession,
} = require("./_session");

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  if (request.method === "GET") {
    sendJson(response, 200, {
      ok: true,
      protected: isSessionProtectionEnabled(),
      authenticated: hasValidHouseSession(request),
    });
    return;
  }

  if (request.method === "POST") {
    if (!isSessionProtectionEnabled()) {
      sendJson(response, 200, {
        ok: true,
        protected: false,
        authenticated: true,
      });
      return;
    }

    const body =
      typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    const password = body.password || "";
    const configuredPassword = getHousePassword();

    if (!comparePasswords(password, configuredPassword)) {
      sendJson(response, 401, {
        ok: false,
        error: "Mot de passe maison incorrect.",
      });
      return;
    }

    setHouseSession(response);
    sendJson(response, 200, {
      ok: true,
      protected: true,
      authenticated: true,
    });
    return;
  }

  if (request.method === "DELETE") {
    clearHouseSession(response);
    sendJson(response, 200, {
      ok: true,
      protected: isSessionProtectionEnabled(),
      authenticated: false,
    });
    return;
  }

  response.setHeader("Allow", "GET, POST, DELETE");
  sendJson(response, 405, {
    ok: false,
    error: "Methode non autorisee.",
  });
};
