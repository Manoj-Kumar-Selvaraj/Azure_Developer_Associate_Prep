const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  const meta = {
    hostname: os.hostname(),
    platform: os.platform(),
    method: req.method,
    url: req.url,
    headers: req.headers
  };

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    message: "App Service Infra Test Successful",
    serverMeta: meta
  }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
