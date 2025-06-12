**Short & crisp tips are great to understand fast**, but for **clearing AZ-204**, you also need:

* ✅ Full **service-by-service** coverage
* ✅ **Deep exam tips** and internal concepts
* ✅ Awareness of **tricky questions** & how Azure services **connect together**
* ✅ Confidence in what’s *most likely* to appear in the exam

---

So here's the **perfect hybrid strategy** for you:

---

## ✅ The "Crisp but Complete" AZ-204 Plan (by Me)

For **each service**, I’ll give you:

| Section                       | What it includes                                            |
| ----------------------------- | ----------------------------------------------------------- |
| 🔹 1. Concept Brief           | What it is, how it works, and what problems it solves       |
| 🔹 2. Exam-Only Tips          | What the **exam focuses on**, gotchas, keywords to look for |
| 🔹 3. Real-World Link         | How it compares to AWS / when you’d use it in real projects |
| 🔹 4. Quick CLI / Portal demo | Minimal syntax or steps (no setup clutter)                  |
| 🔹 5. Mock Q\&A               | 2–3 practice questions with answers + explanations          |

This way:

* It’s **fast** — you don’t get stuck reading huge documentation
* It’s **complete** — nothing critical is skipped
* It’s **exam-ready** — you’ll remember what matters

---

### ✅ Let’s Build Your Custom AZ-204 Table of Contents

Here’s what we’ll cover **service by service**:

#### 🔹 Compute

* App Service
* Azure Functions
* Azure Container Instances (ACI)
* Azure Kubernetes Service (AKS)

#### 🔹 Data Storage

* Azure Blob Storage
* Azure Table/Queue Storage
* Cosmos DB (incl. SDK tips)
* Azure SQL

#### 🔹 Messaging

* Azure Service Bus
* Event Grid
* Event Hubs

#### 🔹 Identity & Access

* Azure AD Authentication
* Managed Identities
* Key Vault

#### 🔹 Monitoring & Debugging

* App Insights
* Log Analytics
* App Service Diagnostics

#### 🔹 Dev Tools

* Azure CLI & PowerShell
* Azure SDK (Python/.NET)
* ARM & Bicep templates

#### 🔹 CI/CD

* GitHub Actions
* Azure DevOps Pipelines

---

💥 Let’s begin **AZ-204 – Day 1: App Service Deep Dive**
Get ready to master App Service in **exam style, real-world relevance, and in-depth concepts**.

---
## App Service


1) Which of the following stacks is not supported on App Service by default?

✅ C) Ruby

You selected: C ✅ Correct
Ruby is not a native runtime, but can be deployed in custom containers.

2) If you deploy a container-based app, what plan type is required?

✅ C) Linux-based plan

You selected: C ✅ Correct
Only Linux-based App Plans support Docker containers.

3) What is the default storage used for built-in images?

✅ B) Azure Storage content volume

You selected: B ✅ Correct
This has higher latency than container FS.



4) Which one supports WebSockets?

✅ D) Standard Tier and above

You selected: D ✅ Correct
Free/Shared do not support WebSockets.

5) What happens when you move an App Service across regions?

✅ B) It must be deleted and recreated

You selected: B ✅ Correct
Region can’t be changed directly.

6) True or False: Azure App Service can directly connect to Azure SQL using managed identity.

✅ True

You selected: True ✅ Correct

7) App Service supports which authentication options?

✅ A) Azure AD, D) Google

You selected: A, D ✅ Correct
8)  What language SDKs are available for deploying App Service?

✅ B) Java, Node.js, .NET

You selected: B ✅ Correct
9) What is the main benefit of App Service Environment (ASE)?

✅ C) Isolated, high-performance workloads

You selected: C ✅ Correct
10. What is WebJobs?

✅ A) Scheduler for App Service

You selected: A ✅ Correct
11. What is WEBSITE_RUN_FROM_PACKAGE used for?

✅ C) Read-only deployment from a .zip file

You selected: C ✅ Correct
12. App Service logs are stored in:

✅ B) Log Analytics (if connected)

You selected: C ❌
App Insights is optional, not the default log store.

13. What’s the best way to schedule an automatic restart every night?

✅ B) WebJobs or Logic Apps

You selected: B ✅ Correct

memorizing the **App Service Plan types and their features** is **crucial** for AZ-204. Here's a **crisp cheat sheet** to help lock it into memory:

---

## 🧠 App Service Plan Tiers – Exam-Crucial Comparison

| Tier               | Key Features                                                                | Exam Notes 🔥                                            |
| ------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Free**           | - Shared infra<br>- No custom domains<br>- No SLAs                          | For learning only; **no scaling**, **no custom domains** |
| **Shared**         | - Shared CPU<br>- Limited quota<br>- Custom domains **allowed**             | Still no auto-scaling                                    |
| **Basic**          | - Dedicated VM<br>- Custom domains<br>- Manual scaling only                 | No **auto-scale**                                        |
| **Standard**       | - Auto-scale support<br>- 5 deployment slots<br>- Daily backup              | **Most popular in real world**                           |
| **Premium v2**     | - Better performance<br>- VNET integration<br>- More instances & slots (20) | Good for **secure/high traffic** apps                    |
| **Premium v3**     | - Latest Gen VMs<br>- More RAM, faster<br>- Zone redundancy                 | Recommended for **production**                           |
| **Isolated (ASE)** | - Runs in your VNET<br>- High scale<br>- Fully isolated compute             | Expensive, but **fully private & secure**                |

---

## 🔥 Key Exam Tips

* **Auto-scale starts at Standard**
* **Deployment slots** = 5 (Standard), 20 (Premium)
* **Custom domains** = Shared and above (not Free)
* **VNET Integration** = Premium or Isolated only
* **Backups** = Standard and above
* **WebSockets** = Standard and above
* **SSL Binding from Key Vault** = App Service supports it directly
* **Container Support** = Needs **Linux-based App Service Plan**

---

These topics are important to **master** for the AZ-204 exam and real-world use. Here’s a **quick breakdown with examples** for each of them, so you can **understand and remember** clearly:

---

## 🔹 **Windows vs Linux App Service Plans**

| Feature                      | **Windows Plan**                        | **Linux Plan**                        |
| ---------------------------- | --------------------------------------- | ------------------------------------- |
| **Runtimes**                 | .NET Framework, .NET Core, Node.js, PHP | Node.js, Python, PHP, .NET Core, Java |
| **Custom Containers**        | Limited (via Windows containers)        | ✅ Full Docker container support       |
| **Kudu (Advanced Tools)**    | ✅ Available                             | ❌ Not available on built-in images    |
| **Startup file config**      | Not needed (uses web.config)            | ✅ Needs `startup command` for apps    |
| **Cold start on free plans** | Present                                 | Present                               |

➡️ **Use Linux for**: custom Docker, lightweight, open-source workloads.
➡️ **Use Windows for**: legacy .NET Framework apps.

---

## 🔹 **App Service Deployment Center (GUI CI/CD)**

> A **portal-based wizard** to configure CI/CD.

📍Steps:

1. Go to **App Service → Deployment Center**
2. Select source: GitHub, Bitbucket, Azure Repos, etc.
3. Choose branch, build provider (GitHub Actions, Azure Pipelines)
4. Auto-creates CI/CD pipeline

✅ **Benefit**: No need to manually configure GitHub Actions/YAML
✅ Ideal for first-time deployments

---

## 🔹 **Identity Providers for Authentication (Easy Auth)**

App Service has **built-in authentication**.

Supported identity providers:

* ✅ Azure Active Directory
* ✅ Google
* ✅ Facebook
* ✅ Twitter
* ✅ Microsoft (MSA)
* ✅ GitHub

📌 You configure them in:
**App Service → Authentication → Identity Providers**

> When enabled, App Service protects endpoints (like `/home`) and automatically handles login/logout.

---

## 🔹 **Managed Identity to Access Other Azure Resources**

🎯 Use **Managed Identity** instead of storing secrets in code/config.

### Example:

Want to connect App Service to **Azure SQL securely**.

Steps:

1. Enable **System-assigned managed identity** in App Service
2. Go to Azure SQL → Add Active Directory admin → Grant the app identity access (e.g., `db_datareader`)
3. In code, use `DefaultAzureCredential()` (if using SDK)

✅ No secrets stored
✅ Works for: Azure SQL, Key Vault, Storage, etc.

---

## 🔹 **Access Restrictions (IP / Service Endpoints)**

📍Set rules to restrict incoming traffic.

App Service → **Networking → Access Restrictions**

You can allow:

* Certain IPs / CIDR ranges
* Subnets from VNETs
* Service Endpoints (e.g., from private resources)

✅ Blocks unauthorized access
✅ Helps meet security and compliance needs

---

## 🔹 **App Insights (Powerful Monitoring Tool)**

Azure Application Insights (App Insights):

* Tracks: requests, failures, dependencies, performance, logs
* Has live metrics, alerts, query logs with KQL
* Deep performance insights (e.g., SQL calls, HTTP latency)

✅ Enable via App Service → Application Insights
✅ View logs in **Log Analytics**

---

## 🔹 **Store Logs Centrally: Log Analytics Workspace**

If using App Insights or Azure Monitor, logs can be:

* Sent to **Log Analytics** workspace
* Queried via **KQL (Kusto Query Language)**

Example KQL query:

```kql
AppRequests
| where success == false
| summarize count() by operation_Name
```

📍 Benefits:

* Unified logging for multiple apps
* Long-term retention
* Advanced queries/alerts

---

## 🔹 **Azure Monitor Logs**

Azure Monitor collects:

* **Metrics**: CPU %, memory, response time
* **Logs**: HTTP requests, exceptions, traces

Use with:

* App Service
* Azure Functions
* AKS, VMs, etc.

✅ You can create:

* Dashboards
* Alerts (e.g., “500 errors > 10 in 5 mins”)
* Auto-scale triggers

---

## 📌 Summary Cheatsheet:

| Feature             | Key Point                                   |
| ------------------- | ------------------------------------------- |
| Windows vs Linux    | Linux = Docker; Windows = full .NET support |
| Deployment Center   | GUI-based CI/CD setup                       |
| Easy Auth           | Built-in login with AAD, Google, etc.       |
| Managed Identity    | Secret-free access to Azure resources       |
| Access Restrictions | Secure app by IP/VNET                       |
| App Insights        | Deep monitoring & telemetry                 |
| Log Analytics       | Central storage & query of logs             |
| Azure Monitor Logs  | Metrics + logging platform                  |

---
---
---

# APP FUNCTIONS

Understanding `.json` config files and the **Triggers**, **Input Bindings**, and **Output Bindings** is *critical* for mastering Azure Functions — both for **AZ-204** and real-world use. Let's break this down clearly and thoroughly.

---

## ✅ **Key JSON Files in Azure Functions**

### 1. `function.json`

Defines metadata for **a specific function**: its **trigger**, **input**, and **output** bindings.

#### 🧩 Structure:

```json
{
  "bindings": [
    {
      "name": "req",
      "type": "httpTrigger",
      "direction": "in",
      "authLevel": "function",
      "methods": ["get", "post"]
    },
    {
      "name": "$return",
      "type": "http",
      "direction": "out"
    }
  ],
  "scriptFile": "__init__.py"
}
```

#### 🧠 Key Concepts:

| Property     | Description                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `type`       | Trigger type (e.g., `httpTrigger`, `queueTrigger`, `blobTrigger`) or binding type (`queue`, `table`, etc.) |
| `name`       | Variable name used in code                                                                                 |
| `direction`  | `in` or `out`                                                                                              |
| `authLevel`  | `anonymous`, `function`, or `admin` (only for HTTP triggers)                                               |
| `methods`    | HTTP methods (for HTTP trigger)                                                                            |
| `scriptFile` | Path to function code (default `index.js`, `run.csx`, or `__init__.py`)                                    |

---

### 2. `host.json`

Controls **global configuration** for all functions in an app.

#### 🧩 Example:

```json
{
  "version": "2.0",
  "functionTimeout": "00:10:00",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 5
      }
    }
  },
  "extensions": {
    "http": {
      "routePrefix": "api"
    },
    "queues": {
      "maxDequeueCount": 5,
      "visibilityTimeout": "00:00:30"
    }
  }
}
```

#### 🧠 Common Settings:

| Setting                       | Purpose                                                 |
| ----------------------------- | ------------------------------------------------------- |
| `functionTimeout`             | Max function runtime (e.g. "00:05:00")                  |
| `extensions.http.routePrefix` | Base path for HTTP routes (empty string removes `/api`) |
| `queues.maxDequeueCount`      | Retry count before poison queue                         |
| `logging`                     | App Insights settings                                   |

---

### 3. `local.settings.json` (only for **local dev**)

Contains **environment variables** and local config for the runtime emulator.

#### 🧩 Example:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "MySecretKey": "12345"
  },
  "Host": {
    "CORS": "*"
  }
}
```

> ⚠️ Not deployed to Azure. Used by **local dev tools and emulator**.

---

## ✅ Triggers, Input Bindings, Output Bindings

### 🔹 **Trigger** (Exactly ONE per function)

**Starts the function**.

| Trigger Type        | Usage                |
| ------------------- | -------------------- |
| `httpTrigger`       | REST calls           |
| `queueTrigger`      | Azure Queue          |
| `blobTrigger`       | New file in Blob     |
| `timerTrigger`      | Cron jobs            |
| `eventGridTrigger`  | Event Grid           |
| `serviceBusTrigger` | Service Bus messages |

---

### 🔸 **Input Binding** (Optional)

**Reads data** into the function from a service (like a database, blob, queue).

| Type       | Example Usage                 |
| ---------- | ----------------------------- |
| `blob`     | Read file content             |
| `queue`    | Read queue message            |
| `table`    | Read a row from Table Storage |
| `cosmosDB` | Query from CosmosDB           |

---

### 🔸 **Output Binding** (Optional)

**Writes data** from the function to an external service.

| Type       | Example Usage            |
| ---------- | ------------------------ |
| `queue`    | Add message to queue     |
| `blob`     | Save file                |
| `table`    | Insert/update table row  |
| `cosmosDB` | Add document to CosmosDB |
| `sendGrid` | Send email               |
| `eventHub` | Publish message          |

---

### 🧩 Example: Queue Trigger with Output Binding to Blob

#### `function.json`:

```json
{
  "bindings": [
    {
      "name": "queueItem",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "myqueue",
      "connection": "AzureWebJobsStorage"
    },
    {
      "name": "outputBlob",
      "type": "blob",
      "path": "outputcontainer/{queueTrigger}.txt",
      "connection": "AzureWebJobsStorage",
      "direction": "out"
    }
  ]
}
```

#### Python Example:

```python
def main(queueItem: str, outputBlob: func.Out[str]):
    outputBlob.set(f"Processed: {queueItem}")
```

---

## 🧠 Tips to Memorize Quickly

* ✅ `function.json` → Per-function config: Triggers & bindings

* ✅ `host.json` → App-wide config: timeouts, retries, logging

* ✅ `local.settings.json` → Only for local: secrets, env vars

* 🔹 One trigger per function

* 🔸 Optional input/output bindings

* 📦 Output bindings use `func.Out[]` in code (Python/C#)
---

## ✅ A–Z Guide for Azure Functions (for AZ-204 Developer Associate)

---

### 🔹 **A. What is Azure Functions?**

* Serverless compute service.
* You write just the code; Azure handles infrastructure.
* Event-driven (run on triggers like HTTP, Timer, Queue, etc.)

---

### 🔹 **B. Hosting Plans**

| Plan                        | Cold Start | Scaling             | Duration                | VNET  | Pricing           |
| --------------------------- | ---------- | ------------------- | ----------------------- | ----- | ----------------- |
| **Consumption**             | ❌ Yes      | Auto                | 5 mins default (max 60) | ❌ No  | Pay per execution |
| **Premium**                 | ✅ No       | Auto + min instance | Unlimited               | ✅ Yes | More costly       |
| **Dedicated (App Service)** | ✅ No       | Manual              | Unlimited               | ✅ Yes | Flat cost         |

---

### 🔹 **C. Triggers (What starts the function?)**

* **HTTP Trigger** – On web requests (GET/POST)
* **Timer Trigger** – Based on CRON schedule
* **Queue Trigger** – From Azure Storage Queue
* **Service Bus Trigger** – From Service Bus messages
* **Event Hub Trigger** – High-speed event ingestion
* **Blob Trigger** – When a file is added/updated
* **Cosmos DB Trigger** – On DB change feed

---

### 🔹 **D. Input/Output Bindings (How functions get/set data)**

Bindings let your function **interact with external resources** without writing plumbing code.

| Binding Type | Direction | Example               |
| ------------ | --------- | --------------------- |
| Blob         | In/Out    | Image processing      |
| Queue        | In/Out    | Message queuing       |
| Cosmos DB    | In/Out    | Read/write documents  |
| Table        | In/Out    | Table storage         |
| SignalR      | Out       | Real-time updates     |
| HTTP         | In/Out    | HTTP request/response |

---

### 🔹 **E. function.json – Trigger & Binding Definition**

Example:

```json
{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

---

### 🔹 **F. host.json – Runtime Configuration (Global or Per-Trigger)**

Example:

```json
{
  "version": "2.0",
  "functionTimeout": "00:05:00",
  "extensions": {
    "queues": {
      "batchSize": 16,
      "newBatchThreshold": 8
    },
    "http": {
      "routePrefix": "api",
      "maxConcurrentRequests": 100
    }
  },
  "retry": {
    "strategy": "fixedDelay",
    "maxRetryCount": 5,
    "delayInterval": "00:00:05"
  }
}
```

---

### 🔹 **G. local.settings.json – Local Development Settings**

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<connection string>",
    "FUNCTIONS_WORKER_RUNTIME": "python"
  }
}
```

---

### 🔹 **H. Authorization Levels (for HTTP Trigger)**

| Level     | Description               |
| --------- | ------------------------- |
| Anonymous | No key required           |
| Function  | Requires function key     |
| Admin     | Requires master/admin key |

---

### 🔹 **I. Retry Policies (host.json)**

```json
"retry": {
  "strategy": "exponentialBackoff",
  "maxRetryCount": 5,
  "minimumInterval": "00:00:02",
  "maximumInterval": "00:01:00"
}
```

---

### 🔹 **J. Durable Functions (Orchestration)**

Use for:

* Workflows
* Human approvals
* Fan-out/Fan-in
* External event waiting

Key patterns:

* `CallActivityAsync` – Run small task
* `Task.WhenAll(...)` – Parallel tasks
* `WaitForExternalEvent` – Wait for signal
* `CreateTimer` – Delay
* `ContinueAsNew` – Loop pattern

---

### 🔹 **K. Monitoring (Application Insights)**

* Automatically integrated.
* Logs, traces, metrics.
* Enable via Azure Portal or App Settings.

---

### 🔹 **L. CI/CD Deployment**

Options:

* Azure DevOps Pipelines
* GitHub Actions
* VS Code Publish
* Zip deployment

Example GitHub Actions:

```yaml
uses: Azure/functions-action@v1
with:
  app-name: myfuncapp
  package: './'
```

---

### 🔹 **M. Scaling Behavior**

* **Consumption Plan**: Auto-scale by demand.
* **Premium**: Auto-scale + minimum instances (no cold start).
* **Dedicated**: Scale via App Service Scale Out settings.

---

### 🔹 **N. VNET Integration**

* Only available in **Premium** & **Dedicated**
* Use to access private resources like DB, services, etc.

---

### 🔹 **O. Deployment Slots**

* Like Web Apps, Functions support slots.
* Common: `staging`, `production`.
* Zero-downtime swaps.

---

### 🔹 **P. App Settings & Secrets**

Use **Application Settings** or **Key Vault + Managed Identity**:

```json
"AzureWebJobsStorage": "@Microsoft.KeyVault(SecretUri=https://vault/secrets/connection)"
```

---

### 🔹 **Q. Bindings Advanced Scenarios**

Example: HTTP in + Cosmos DB out

```json
{
  "bindings": [
    {
      "type": "httpTrigger",
      "authLevel": "function",
      "name": "req",
      "direction": "in"
    },
    {
      "type": "cosmosDB",
      "name": "outputDoc",
      "direction": "out",
      "databaseName": "mydb",
      "collectionName": "items",
      "createIfNotExists": true
    }
  ]
}
```

---

### 🔹 **R. Error Handling**

* Retry policies (host.json)
* Manual retry with Durable Functions
* Try/catch blocks in code
* Poison message queue (for failed queue processing)

---

### 🔹 **S. Timer Trigger – CRON Format**

```json
"schedule": "0 */5 * * * *" // Every 5 minutes
```

Format: `second minute hour day month day-of-week`

---

### 🔹 **T. Function Timeout**

* Set in `host.json`

```json
"functionTimeout": "00:10:00"
```

* Default for Consumption = 5 min
* Max for Consumption = 60 min
* Premium = Unlimited

---

### 🔹 **U. Languages Supported**

* C#
* JavaScript
* TypeScript
* Python
* Java
* PowerShell
* Custom handlers

---

### 🔹 **V. Durable Task Status**

Query orchestration status using HTTP API:

```
GET /runtime/webhooks/durabletask/instances/{instanceId}
```

---

### 🔹 **W. Cost Optimization**

* Use **Consumption Plan** for bursty workloads.
* Disable Always On if not needed.
* Avoid excessive retries.

---

### 🔹 **X. Bindings vs Triggers**

* **Trigger** = Starts the function (must be only one)
* **Binding** = Input or Output data sources (can be many)

---

### 🔹 **Y. Logging**

Use:

* `ILogger` in .NET
* `context.log()` in JavaScript/Python
* View logs in App Insights or Log Analytics

---

### 🔹 **Z. Best Practices**

* Use environment-specific settings
* Avoid cold starts with Premium
* Secure secrets with Key Vault
* Use Durable Functions for long workflows
* Monitor via Application Insights


Here’s a **highly focused, memorization-friendly cheat list** of the **key patterns and keywords** you should master:

---

## 🧠 **KEY PATTERNS & KEYWORDS TO MEMORIZE FOR AZURE FUNCTIONS**

---

### 🔹 `function.json` — Per Function Config

| **Field**            | **Purpose**                      | **Must Remember** Keywords                                                |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `type`               | Defines trigger/binding type     | `httpTrigger`, `queueTrigger`, `blob`, `eventHub`, `orchestrationTrigger` |
| `direction`          | `in` or `out`                    | Triggers are `in`, outputs are `out`                                      |
| `name`               | Variable used in code            | Like `req`, `res`, `myQueueItem`                                          |
| `authLevel`          | For HTTP trigger                 | `anonymous`, `function`, `admin`                                          |
| `route`              | Custom endpoint path             | Used for HTTP functions                                                   |
| `queueName` / `path` | Resource name (queue/blob/event) | Watch casing and plural/singular                                          |
| `connection`         | App setting key with conn string | `AzureWebJobsStorage`, `MyStorageConn`                                    |

✅ **Mnemonic**: *"Type-Direction-Name-Connection"*

---

### 🔹 Common `type` Values in Bindings

| **Trigger Type**    | **Binding Keyword (`type`)**                                     | Example                                        |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| HTTP Trigger        | `httpTrigger`                                                    | `authLevel`, `methods`                         |
| Queue Trigger       | `queueTrigger`                                                   | `queueName`, `connection`                      |
| Blob Input/Output   | `blob`                                                           | `path`, `connection`                           |
| Timer Trigger       | `timerTrigger`                                                   | `schedule` (cron)                              |
| Service Bus Trigger | `serviceBusTrigger`                                              | `queueName` or `topicName`, `subscriptionName` |
| Durable Functions   | `orchestrationTrigger`, `activityTrigger`, `orchestrationClient` | Only for Durable setup                         |

---

### 🔹 `host.json` — Global Settings (Applies to All Functions)

| **Key Section**         | **Important Subkeys**    | Must-Memorize Keywords                                |
| ----------------------- | ------------------------ | ----------------------------------------------------- |
| `version`               | Always `"2.0"`           | Static                                                |
| `functionTimeout`       | Max runtime per function | `"00:05:00"`                                          |
| `retry`                 | Retry strategy           | `strategy`, `maxRetryCount`, `delayInterval`          |
| `extensions.http`       | HTTP-specific tuning     | `maxConcurrentRequests`, `routePrefix`                |
| `extensions.queues`     | Queue trigger tuning     | `batchSize`, `newBatchThreshold`, `maxDequeueCount`   |
| `extensions.serviceBus` | Service Bus tuning       | `prefetchCount`, `maxConcurrentCalls`, `autoComplete` |

✅ **Patterns to remember**:

* Retry config: `retry -> strategy, maxRetryCount, delayInterval`
* Queues config: `queues -> batchSize, newBatchThreshold, maxDequeueCount`
* SB config: `serviceBus -> prefetchCount, maxConcurrentCalls`

---

### 🔹 `local.settings.json` — Dev-Only Settings

| **Key**                           | **Use**                             |
| --------------------------------- | ----------------------------------- |
| `IsEncrypted`                     | Always `false` for local dev        |
| `Values.AzureWebJobsStorage`      | Storage account conn string         |
| `Values.FUNCTIONS_WORKER_RUNTIME` | Runtime: `dotnet`, `python`, `node` |
| `Host.LocalHttpPort`              | Port for local testing              |
| `Host.CORS`                       | Allowed origins                     |

✅ Always remember:

* `AzureWebJobsStorage` is **mandatory** for most bindings (queues, blob, etc.)
* `FUNCTIONS_WORKER_RUNTIME` defines the language

---

## 🧪 Binding & Trigger Mnemonics

| **Binding**           | **Keyword Triggers**                                               | **Tip**                      |
| --------------------- | ------------------------------------------------------------------ | ---------------------------- |
| Timer                 | `timerTrigger`, `schedule`                                         | Cron required                |
| HTTP                  | `httpTrigger`, `authLevel`, `route`                                | `authLevel` is exam hot spot |
| Queue                 | `queueTrigger`, `queueName`, `connection`                          | Watch case!                  |
| Blob                  | `blob`, `path`, `connection`                                       | Output vs Input?             |
| Service Bus           | `serviceBusTrigger`, `topicName`, `subscriptionName`, `connection` | Know pub-sub                 |
| Durable Orchestration | `orchestrationTrigger`, `orchestrationClient`, `activityTrigger`   | Three pieces needed          |

---

## 📚 Suggested Exam Drill Questions Based on These Patterns

To test memory, expect questions like:

* *Which file should you modify to configure a timer schedule?*
* *Which `host.json` key controls retry for queue triggers?*
* *Where do you define `authLevel` for HTTP?*
* *What field in `function.json` holds the name of the queue?*
* *Which field in `host.json` controls parallel message handling for SB?*

---

## ✅ `function.json` — Detailed Config Keywords

Each Azure Function has its own `function.json` file. Here's what the common fields mean:

---

### 🔹 `type`

* **What it is:** Specifies the trigger or binding type.
* **Examples:** `httpTrigger`, `queueTrigger`, `blob`, `serviceBusTrigger`, etc.
* **Why it matters:** It defines how your function is invoked (trigger) or connected to other services (bindings).

---

### 🔹 `direction`

* **Values:** `"in"` (trigger or input binding) or `"out"` (output binding)
* **Why it matters:** It tells Azure which way the data flows.

---

### 🔹 `name`

* **What it is:** The variable name used inside your code.
* **Example:** `"name": "req"` means `req` will be used in function code to access input.
* **Why it matters:** This is how your function accesses the binding in code.

---

### 🔹 `authLevel`

* **Values:** `anonymous`, `function`, `admin`
* **Use Case:** For HTTP triggers, defines who can access the function.
* **Example:** `anonymous` means anyone can call it (no key needed); `function` means key required.
* **Why it matters:** Used for security at the function level.

---

### 🔹 `route`

* **What it is:** Custom route for HTTP function.
* **Example:** `route: "products/{id}"` → becomes `https://<functionapp>/api/products/42`
* **Why it matters:** Gives flexibility in designing RESTful endpoints.

---

### 🔹 `queueName`, `path`, `connection`

* **What they are:** Used to point to resources like queues, blobs, etc.
* **`connection`:** Refers to the app setting key name that holds the connection string.
* **Example:**

  ```json
  {
    "type": "queueTrigger",
    "name": "myQueueItem",
    "direction": "in",
    "queueName": "my-queue",
    "connection": "AzureWebJobsStorage"
  }
  ```
* **Why they matter:** Used to connect your function to external resources securely.

---

## ✅ `host.json` — Global Runtime Settings

---

### 🔹 `"retry"`

```json
"retry": {
  "strategy": "fixedDelay",
  "maxRetryCount": 5,
  "delayInterval": "00:00:10"
}
```

| Field                | Meaning                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `strategy`           | `"fixedDelay"` or `"exponentialBackoff"`                         |
| `fixedDelay`         | Retry after fixed time interval (good for consistent retry gaps) |
| `exponentialBackoff` | Retry delays grow exponentially (good for transient issues)      |
| `maxRetryCount`      | How many times to retry if failure happens                       |
| `delayInterval`      | How long to wait between retries (only for fixedDelay strategy)  |

> **Why it matters:** Ensures transient failures are retried without manual code.

---

### 🔹 `"queues"`

```json
"queues": {
  "batchSize": 32,
  "newBatchThreshold": 16,
  "maxDequeueCount": 5
}
```

| Field               | Meaning                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `batchSize`         | Max number of messages fetched at once                            |
| `newBatchThreshold` | When remaining messages < this, fetch next batch                  |
| `maxDequeueCount`   | Max times to retry a failed message before moving to poison queue |

> **Why it matters:** Controls performance and fault handling for queue-based functions.

---

### 🔹 `"serviceBus"`

```json
"serviceBus": {
  "prefetchCount": 100,
  "maxConcurrentCalls": 16,
  "autoComplete": false
}
```

| Field                | Meaning                                                             |
| -------------------- | ------------------------------------------------------------------- |
| `prefetchCount`      | Number of messages fetched in advance                               |
| `maxConcurrentCalls` | How many messages can be processed in parallel                      |
| `autoComplete`       | Whether to auto-mark messages as completed (true) or do it manually |

> **Why it matters:** Gives control over concurrency and reliability in Service Bus functions.

---

### 🔹 `"http"`

```json
"http": {
  "routePrefix": "api",
  "maxConcurrentRequests": 50
}
```

| Field                   | Meaning                                                  |
| ----------------------- | -------------------------------------------------------- |
| `routePrefix`           | Prefix for all HTTP routes (`api` by default)            |
| `maxConcurrentRequests` | How many HTTP requests can be processed at the same time |

> **Why it matters:** Controls how your HTTP endpoints are structured and how scalable your app is.

---

### 🔹 `functionTimeout`

```json
"functionTimeout": "00:10:00"
```

* **What it is:** Max time a single function invocation can run (10 mins max in Consumption plan)
* **Why it matters:** Prevents infinite running functions from consuming resources

---

## ✅ `local.settings.json` — For Local Development Only

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<storage-connection-string>",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```

| Key                        | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `IsEncrypted`              | Always false in local; Azure uses encrypted values |
| `AzureWebJobsStorage`      | Connection to Azure Storage account                |
| `FUNCTIONS_WORKER_RUNTIME` | Which language: `dotnet`, `node`, `python`, etc    |
| `CORS`                     | Set to `"*"` or domain names for local testing     |

---

## 🧠 Final Memory Tips:

| Config File           | Focus On                                                                   |
| --------------------- | -------------------------------------------------------------------------- |
| `function.json`       | `type`, `direction`, `name`, `authLevel`, `connection`, `route`, `methods` |
| `host.json`           | `retry`, `queues`, `serviceBus`, `http`, `functionTimeout`                 |
| `local.settings.json` | `AzureWebJobsStorage`, `FUNCTIONS_WORKER_RUNTIME`, `CORS`                  |

---
