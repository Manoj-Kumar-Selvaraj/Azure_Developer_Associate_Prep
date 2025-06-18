
---

## ✅ **Azure Container Apps Free Tier Overview**

| Feature                      | Free Tier Details                                            |
| ---------------------------- | ------------------------------------------------------------ |
| **Requests**                 | 180,000 vCPU-seconds + 360,000 GiB-seconds/month FREE        |
| **Always-on container**      | Not ideal — scale to zero preferred                          |
| **ACR (Container Registry)** | Yes, can use Free Tier of ACR or public Docker Hub           |
| **Log Analytics**            | Free up to a limited quota (then tiny cost, but can disable) |
| **KEDA-based scaling**       | ✅ Supported                                                  |
| **No App Plan required**     | ✅ No App Service Plan billing                                |
| **Max scale**                | Still allowed to scale out (pay-as-you-go after free)        |

> ✅ You can **run small jobs and services** for free, especially if you scale to 0 and avoid long runtimes.

---

## 🛠️ STEP-BY-STEP: Hands-On with Azure Container Apps (Free Tier)

Let’s deploy a container app using Azure CLI (or Portal). You’ll understand:

* Ingress types
* Revisions
* Scaling rules
* Logs

---

### ✅ STEP 1: Prerequisites

```bash
az extension add --name containerapp
az provider register --namespace Microsoft.App
az provider register --namespace Microsoft.OperationalInsights
```

---

### ✅ STEP 2: Create Resource Group + Environment

```bash
az group create --name my-aca-rg --location eastus

az containerapp env create \
  --name my-aca-env \
  --resource-group my-aca-rg \
  --location eastus
```

---

### ✅ STEP 3: Deploy a Public Container App (Hello World)

```bash
az containerapp create \
  --name hello-world-app \
  --resource-group Developer_Associate \
  --environment my-aca-env \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 80 \
  --ingress external \
  --query configuration.ingress.fqdn
```

This gives you a public FQDN to test in your browser!

---

### ✅ STEP 4: Add Autoscaling Based on Concurrent HTTP

```bash
az containerapp update \
  --name hello-world-app \
  --resource-group Developer_Associate \
  --min-replicas 0 \
  --max-replicas 5 \
  --scale-rule-name http-rule \
  --scale-rule-http-concurrency 20

```

---

### ✅ STEP 5: Set Secrets (Optional)

```bash
az containerapp secret set \
  --name hello-world-app \
  --resource-group Developer_Associate \
  --secrets mysecret=SuperSecretValue
```

This secret is stored inside your Container App config but not directly exposed unless you reference it.

So in your YAML or env vars, reference via `secretRef`.

---

## ✅ Step-by-Step: Using `secretRef` in Azure Container Apps

### 🧠 Why use `secretRef`?

If you have credentials like DB passwords, API keys, or tokens — **you don’t want them hardcoded** into your app.
Instead, you store them as **secrets** in ACA, and access them securely via environment variables using `secretRef`.

---

## 👣 Step 1: Create a Secret

Let’s say you want to store a database password.

```bash
az containerapp secret set \
  --name hello-world-app \
  --resource-group my-aca-rg \
  --secrets DB_PASSWORD=MySecret123!
```

This secret is stored **inside your Container App** config but not directly exposed unless you reference it.

---

## 👣 Step 2: Reference the Secret in an Environment Variable

There are **2 ways** to reference the secret: using **Azure CLI** or **YAML**.

---

### ✅ Option A: Using Azure CLI

```bash
az containerapp update \
  --name hello-world-app \
  --resource-group my-aca-rg \
  --set-env-vars DB_PASSWORD=secretref:mysecret
```

This tells ACA:

> "Create an environment variable `DB_PASSWORD` whose value comes from the secret named `DB_PASSWORD`."

---

### ✅ Option B: Using YAML (Advanced / Reusable)

```yaml
configuration:
  secrets:
    - name: DB_PASSWORD
      value: MySecret123!
  environmentVariables:
    - name: DB_PASSWORD
      secretRef: DB_PASSWORD
```

You can deploy this YAML using:

```bash
az containerapp create --resource-group my-aca-rg --name hello-world-app --yaml app.yaml
```

---

## 🧪 Step 3: Inside the Container

Once deployed, your app can access it like:

```python
import os
password = os.getenv("DB_PASSWORD")
```

Or in shell:

```bash
echo $DB_PASSWORD
```

---

## 🔒 Benefits for Security

| Risky Approach         | Secure with `secretRef` |
| ---------------------- | ----------------------- |
| Hardcode in image      | ❌                       |
| Pass in plain-text env | ❌                       |
| Use `secretRef`        | ✅ Hidden, encrypted     |

---

## ✍️ Exam Notes

* `--secrets` is the CLI command to **store**
* `secretref:` is how you **reference** it in env vars
* App code **does not change** — just reads env vars as usual
* If you remove or rename the secret → app fails to start (good to know)

---

### ✅ STEP 6: View Logs (Log Analytics enabled by default)

```bash
az containerapp logs show \
  --name hello-world-app \
  --resource-group my-aca-rg
```

---
az acr create \
  --resource-group Developer_Associate \
  --name myDevACRRegistry \
  --sku Basic

az acr login --name mydevacrregistry

az acr build \
  --registry mydevacrregistry \
  --image flasksecret:v1 .

  az acr update \
  --name mydevacrregistry \
  --admin-enabled true

az acr credential show \
  --name mydevacrregistry

  az containerapp registry set \
  --name hello-world-app \
  --resource-group Developer_Associate \
  --server mydevacrregistry.azurecr.io \
  --username mydevacrregistry \
  --password 



az containerapp update \
  --name hello-world-app \
  --resource-group Developer_Associate \
  --image mydevacrregistry.azurecr.io/flasksecret:v1 \
  --set-env-vars DB_PASSWORD=secretref:mysecret

### ✅ STEP 7: Clean Up (To stay in Free Tier)

```bash
az group delete --name my-aca-rg --yes --no-wait
```

---

## 🔍 After Hands-On: What You’ll Understand

| Concept          | Covered in this lab?     |
| ---------------- | ------------------------ |
| Public Ingress   | ✅                        |
| Scale to 0       | ✅                        |
| Revision updates | (Optional in next steps) |
| Secrets & config | ✅                        |
| Log monitoring   | ✅                        |
| KEDA scaling     | ✅                        |
| Pricing behavior | ✅ (no cost under limits) |

---

Awesome. Here's a set of **20 hand-crafted, very hard-level AZ-204 exam-style questions** focusing specifically on **Azure Container Apps** — testing secrets, scaling, revisions, ingress, identity, and deployment strategies.

---

## ✅ **Azure Container Apps — 20 Hard Questions**

### **1.**

You have deployed a container app that needs to scale based on queue messages in Azure Storage Queue. What must be configured?

a) Azure Monitor alerts
b) `minReplicas` > 0
c) KEDA scaling rule with `queueLength`
d) Traffic splitting rules

---

### **2.**

Your container app must access an Azure Key Vault. What is the **most secure and scalable** approach?

a) Use a secretRef with the key vault URL
b) Enable Managed Identity and grant access to Key Vault
c) Pass Key Vault credentials as environment variables
d) Store Key Vault credentials in App Settings

---

### **3.**

A container app is deployed in `single` revision mode. What happens when you push a new deployment?

a) Both revisions receive traffic
b) Old revision is deleted automatically
c) New revision becomes active, old is deactivated
d) Manual intervention is needed for traffic shift

---

### **4.**

You want to split traffic 70/30 between two app revisions. What revision mode must be used?

a) Single
b) Multiple
c) TrafficSplit
d) Canary

---

### **5.**

Which **two** of the following scale triggers are supported out-of-the-box by Azure Container Apps?

a) Azure Service Bus
b) Azure DevOps Pipelines
c) Blob Storage triggers
d) HTTP concurrency

---

### **6.**

You have this environment variable: `DB_PASSWORD=secretref:dbsecret`. What must exist before applying this config?

a) A secure variable group
b) A Key Vault reference
c) A container app secret named `dbsecret`
d) A custom domain binding

---

### **7.**

Which of the following is NOT a valid use case for Azure Container Apps?

a) Background processing job with scale-to-zero
b) A high-throughput video transcoding service requiring GPU
c) An event-driven microservice handling webhooks
d) A public HTTP API using .NET and Python services

---

### **8.**

You want your container app to pull images from a **private Azure Container Registry (ACR)**. What is required?

a) Enabling "Always pull" in ingress
b) Granting the container app a managed identity with ACR pull permissions
c) Making ACR public
d) Creating a public endpoint on the container app environment

---

### **9.**

Which of the following statements about **revisions** is TRUE?

a) Each revision runs in its own VNet
b) A revision can’t be rolled back after deployment
c) You can split traffic between revisions only in `multiple` mode
d) Revisions automatically expire every 7 days

---

### **10.**

How do you configure autoscaling in container apps?

a) Through Azure Monitor scaling rules
b) Through containerapp.yaml file using KEDA triggers
c) By adjusting App Service Plan
d) By enabling autoscale in Azure DevOps pipeline

---

### **11.**

Which scaling parameter lets you avoid excessive cold starts?

a) `maxReplicas`
b) `pollingInterval`
c) `minReplicas`
d) `cooldownPeriod`

---

### **12.**

You see this in your YAML:

```yaml
scale:
  minReplicas: 0
  maxReplicas: 10
  rules:
    - name: http-scaler
      http:
        metadata:
          concurrentRequests: "100"
```

What happens if 500 concurrent HTTP requests hit?

a) It scales to 5 replicas
b) It serves all from 1 instance
c) It scales up to max 10 replicas based on load
d) It rejects requests after 100

---

### **13.**

To **completely isolate networking** of your container apps and make them private:

a) Use an internal ingress
b) Deploy to a VNet-enabled managed environment
c) Use Private Endpoints
d) Disable HTTPS

---

### **14.**

How does Azure Container Apps differ from Azure Kubernetes Service?

a) Supports persistent volumes
b) Does not require managing nodes or clusters
c) Provides kubeconfig access
d) Requires Helm for deployment

---

### **15.**

Which file is used to declare a full container app infrastructure including secrets, env, scale, etc.?

a) `deployment.json`
b) `docker-compose.yml`
c) `containerapp.yaml`
d) `azuredeploy.json`

---

### **16.**

Which command lists all revisions of a Container App?

a) `az containerapp revision list`
b) `az containerapp show-revisions`
c) `az containerapp deployment history`
d) `az containerapp traffic split`

---

### **17.**

What happens when you reach `maxReplicas` and demand increases?

a) New instances are auto-created
b) Container app throttles traffic
c) Azure will switch to fallback region
d) You’re billed double the price

---

### **18.**

If you want to deploy a multi-container pod with dependencies, which service fits better?

a) Azure Container Instances
b) Azure Container Apps
c) Azure Kubernetes Service
d) App Service

---

### **19.**

Which component enables **event-driven scaling** in Azure Container Apps?

a) Azure Functions Runtime
b) Dapr
c) KEDA
d) Envoy

---

### **20.**

What is the benefit of using `managedEnvironmentId`?

a) It controls billing
b) It defines logging retention
c) It groups container apps into a shared runtime
d) It enables load balancing between Azure regions

---

| Q  | Your Ans  | Correct       | Explanation                                                                                             |
| -- | --------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| 1  | **c** ✅   | ✅             | KEDA can scale based on Azure Storage Queue length using queue-length triggers.                         |
| 2  | **b** ✅   | ✅             | Best practice: Use **Managed Identity** to access Key Vault without hardcoded secrets.                  |
| 3  | **b** ❌   | ✅ is **c**    | In `single` revision mode, old revisions become **inactive**, not deleted.                              |
| 4  | **b** ✅   | ✅             | Only **multiple** revision mode supports traffic splitting.                                             |
| 5  | **c,d** ❌ | ✅ is **a, d** | Supported: **Service Bus**, HTTP. Blob Storage is **not** directly supported.                           |
| 6  | **c** ✅   | ✅             | `secretref:mysecret` only works if `mysecret` was already defined via CLI or YAML.                      |
| 7  | **b** ✅   | ✅             | GPU workloads are not suitable for Azure Container Apps — use AKS instead.                              |
| 8  | **b** ✅   | ✅             | Best method is to assign a **Managed Identity** to the Container App and grant ACR access.              |
| 9  | **c** ✅   | ✅             | You can only split traffic when revision mode is **multiple**.                                          |
| 10 | **b** ✅   | ✅             | Scaling is defined in the YAML file using **KEDA-based triggers**.                                      |
| 11 | **d** ❌   | ✅ is **c**    | `minReplicas` prevents cold starts. `cooldownPeriod` controls scale down time.                          |
| 12 | **a** ❌   | ✅ is **c**    | With 500 requests and 100 concurrency limit, app will scale up to max 10 replicas.                      |
| 13 | **a** ❌   | ✅ is **b**    | Ingress = public/private access. For full **VNet isolation**, use VNet-enabled **Managed Environment**. |
| 14 | **b** ✅   | ✅             | Azure Container Apps are serverless; you don’t manage nodes/clusters like in AKS.                       |
| 15 | **c** ✅   | ✅             | `containerapp.yaml` is the official infra-as-code format for full container app definition.             |
| 16 | **a** ✅   | ✅             | Use `az containerapp revision list` to view all revisions.                                              |
| 17 | **b** ✅   | ✅             | Once `maxReplicas` is reached, new traffic may be throttled or rejected.                                |
| 18 | **c** ✅   | ✅             | Only **AKS** supports multi-container pods with tight coupling (e.g., sidecars).                        |
| 19 | **c** ✅   | ✅             | **KEDA** (Kubernetes Event-driven Autoscaler) is the key component here.                                |
| 20 | **c** ✅   | ✅             | The `managedEnvironmentId` groups apps together and provides shared infra (scale rules, logging, etc).  |

| Concept                | Key Point                                                                |
| ---------------------- | ------------------------------------------------------------------------ |
| Revisions              | `single` mode deactivates old revision, doesn’t delete.                  |
| Scale triggers         | HTTP + Service Bus = supported. Blob is **not** directly supported.      |
| Cold Start Avoidance   | Use `minReplicas` to avoid it, not `cooldownPeriod`.                     |
| Private Container Apps | Requires **VNet-enabled managed environment**, not just private ingress. |
| Autoscaling Load       | App will scale **up to maxReplicas**, not fixed jumps.                   |

| Ingress Type          | Description                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------- |
| **External (Public)** | Default. App is accessible publicly via HTTPS (with an auto-generated FQDN).                  |
| **Internal**          | App is **only accessible inside the VNet** or environment. No public endpoint.                |
| **Disabled**          | App cannot receive **any HTTP traffic**. Useful for background services, event handlers, etc. |
