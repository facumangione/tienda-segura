const express = require("express");
// Sin CSRF a propósito: API JSON de solo lectura (GET), sin cookies ni sesión.
// nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
const app = express();

const total = (precio, cant, desc) =>
  precio * cant * (1 - desc);

app.get("/total", (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(p, c, 0) });
});

app.get("/calcular", (req, res) => {
  const resultado = Number(req.query.a) + Number(req.query.b);
  res.json({ resultado });
});

// Solo levanta el servidor con "node app.js", no cuando el test importa el módulo
if (require.main === module) {
  app.listen(3000, () => console.log("Escuchando en http://localhost:3000"));
}

module.exports = { app, total };
