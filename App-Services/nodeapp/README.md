# Azure App Service Infra Test App

This app is designed to test Azure App Service infrastructure setup with Node.js 22 runtime.

## What It Does

- Logs all HTTP requests
- Returns server info, headers, request method & URL
- Ideal for load testing or verifying deployment flow

## Deployment Command

```bash
az webapp deployment source config-zip \
  --resource-group <your-group> \
  --name <your-app-name> \
  --src nodeapp.zip


---

## ✅ What’s Included

| File         | Purpose                                      |
|--------------|----------------------------------------------|
| `server.js`  | HTTP server that logs and echoes metadata    |
| `package.json` | Defines node version and start command     |
| `README.md`  | Documentation for deployment/test purposes   |
| `nodeapp.zip`| Zipped project ready for Azure deployment    |

---

## ⏭️ Next Steps


