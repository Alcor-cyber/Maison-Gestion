const { neon } = require("@neondatabase/serverless");

const STATE_RECORD_ID = "primary";

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  try {
    if (!process.env.DATABASE_URL) {
      sendJson(response, 500, {
        ok: false,
        error: "DATABASE_URL est manquante.",
      });
      return;
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS house_state (
        id TEXT PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    if (request.method === "GET") {
      const records = await sql`
        SELECT payload, updated_at
        FROM house_state
        WHERE id = ${STATE_RECORD_ID}
        LIMIT 1
      `;

      const record = records[0];
      sendJson(response, 200, {
        ok: true,
        state: record ? record.payload : null,
        updatedAt: record ? record.updated_at : null,
      });
      return;
    }

    if (request.method === "POST") {
      const body =
        typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
      const nextState = body.state;
      const updatedAt = body.updatedAt || new Date().toISOString();

      if (!nextState || typeof nextState !== "object" || Array.isArray(nextState)) {
        sendJson(response, 400, {
          ok: false,
          error: "Le format de l'etat est invalide.",
        });
        return;
      }

      await sql`
        INSERT INTO house_state (id, payload, updated_at)
        VALUES (${STATE_RECORD_ID}, ${JSON.stringify(nextState)}::jsonb, ${updatedAt})
        ON CONFLICT (id)
        DO UPDATE SET
          payload = EXCLUDED.payload,
          updated_at = EXCLUDED.updated_at
      `;

      sendJson(response, 200, {
        ok: true,
        updatedAt,
      });
      return;
    }

    response.setHeader("Allow", "GET, POST");
    sendJson(response, 405, {
      ok: false,
      error: "Methode non autorisee.",
    });
  } catch (error) {
    console.error("State API error:", error);
    sendJson(response, 500, {
      ok: false,
      error: "Impossible de synchroniser les donnees.",
    });
  }
};
