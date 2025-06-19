---

## 🧠 **AZ-204 Section 1.1 Memorization Cheatsheet**

### For:

* **1.1.1 – Create and Manage Container Images**
* **1.1.2 – Publish Image to ACR**
* **1.1.3 – Run Containers in Azure Container Instances (ACI)**

---

### 🔹 **1.1.1 – Create & Manage Container Images**

| 🔑 Point              | 🧠 Memorize This                                                 |
| --------------------- | ---------------------------------------------------------------- |
| `Dockerfile`          | Instructions like `FROM`, `RUN`, `CMD`, `ENTRYPOINT`, `COPY`     |
| `CMD` vs `ENTRYPOINT` | `CMD` can be overridden at runtime. `ENTRYPOINT` runs regardless |
| Image creation        | `docker build -t <image>:<tag> .`                                |
| Image listing         | `docker images`                                                  |
| Image export          | Use `docker save` and `docker load` for offline portability      |
| Tagging image         | `docker tag <image> <acr>.azurecr.io/<image>:<tag>`              |

---

### 🔹 **1.1.2 – Publish an Image to ACR**

| 🔑 Point      | 🧠 Memorize This                                                            |
| ------------- | --------------------------------------------------------------------------- |
| Create ACR    | `az acr create --name <acr> --resource-group <rg> --sku Basic`              |
| Login to ACR  | `az acr login --name <acr>`                                                 |
| Tag image     | `docker tag local-image <acr>.azurecr.io/image:tag`                         |
| Push image    | `docker push <acr>.azurecr.io/image:tag`                                    |
| Admin access  | Turn on via `az acr update --name <acr> --admin-enabled true` if needed     |
| Pull from ACR | ACI/Apps must have permission or use `--registry-username` and `--password` |

---

### 🔹 **1.1.3 – Run Containers in ACI**

| 🔑 Point       | 🧠 Memorize This                                                        |
| -------------- | ----------------------------------------------------------------------- |
| Create ACI     | `az container create --name myapp --image myacr.azurecr.io/myimage:tag` |
| Add public DNS | Use `--dns-name-label` to expose via FQDN                               |
| Logs & status  | `az container logs`, `az container show`                                |
| No scaling     | ACI doesn't support autoscaling (Container Apps does)                   |
| VNET support   | ACI supports VNET injection (use `--subnet`)                            |
| Secrets        | Use environment variables or Key Vault integration                      |
| Ideal for      | Short-lived, stateless containers; batch jobs, quick demos              |

---

### 📌 **Absolute Musts to Lock In**

* `CMD` vs `ENTRYPOINT` – commonly tested
* `docker tag` + `docker push` to ACR – practical steps
* ACI is **stateless**, **non-orchestrated**, **no autoscale**
* Use `--dns-name-label` in ACI for public access
* Grant ACR access or get 401 errors
* Know when to pick **ACI** vs. **AKS** vs. **App Service** vs. **Container Apps**


---

## ✅ 1. What Are Azure Container Apps?

Azure Container Apps (ACA) is a **fully managed serverless container service** built on Kubernetes and KEDA, designed for:

* Microservices
* Background workers
* Event-driven apps
* Public APIs

💡 It **removes the need to manage infrastructure or orchestrators (like Kubernetes)**.

---

## ✅ 2. Key Features of Container Apps

| Feature                   | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| **Serverless scaling**    | Built-in **KEDA autoscaling**, scales from **0 to N** based on triggers |
| **Multiple revisions**    | Supports **traffic-splitting** and versioning of deployments            |
| **Ingress options**       | Public, internal, or disabled (e.g., for background workers)            |
| **Environment variables** | Plain values or secrets (from ACA or Key Vault)                         |
| **Secure networking**     | VNet integration allows access to internal services like databases      |
| **Dapr support**          | Service discovery, pub/sub, observability for microservices             |
| **CI/CD support**         | Supports GitHub Actions, Azure DevOps, Docker CI/CD                     |

---

## ✅ 3. Azure Container Apps Environment

Before deploying apps, you **must create a Container Apps Environment**:

### Two types:

1. **Public Environment**

   * Apps can be accessed over the internet
2. **Internal Environment (VNet-Integrated)**

   * Apps are only accessible within the same VNet

```bash
az containerapp env create \
  --name my-env \
  --resource-group my-rg \
  --location eastus
```

---

## ✅ 4. Ingress Configuration

Controls how traffic reaches your app:

| Setting             | Meaning                            |
| ------------------- | ---------------------------------- |
| `ingress: external` | App is exposed on public IP        |
| `ingress: internal` | App is only accessible in the VNet |
| `ingress: disabled` | App has **no network endpoint**    |

Specify `targetPort` to tell ACA what port your container listens on:

```yaml
ingress:
  external: true
  targetPort: 8080
```

---

## ✅ 5. Revisions and Traffic Splitting

Each deployment creates a **new revision** (version).
Revisions can be **split by traffic** or use just the latest.

| Revision Mode | Description                             |
| ------------- | --------------------------------------- |
| `single`      | Replaces the old revision completely    |
| `multiple`    | Keeps old ones active (for A/B testing) |

**Traffic splitting example:**

```bash
az containerapp revision set-mode \
  --name my-app \
  --resource-group my-rg \
  --mode multiple

az containerapp revision traffic set \
  --name my-app \
  --resource-group my-rg \
  --revision-weight rev1=70 rev2=30
```

---

## ✅ 6. Autoscaling with KEDA

KEDA (Kubernetes Event-Driven Autoscaler) enables scale rules based on:

* HTTP traffic
* Queue length
* CPU utilization
* Azure Service Bus
* Custom metrics

**Default scaling range:** 0 to 10 replicas

Example scale rule:

```yaml
scale:
  minReplicas: 0
  maxReplicas: 20
  rules:
    - name: http-rule
      http:
        concurrentRequests: 50
```

---

## ✅ 7. Background Jobs and No Ingress Apps

Use ACA without ingress to create:

* Workers
* Consumers
* Batch jobs

Set:

```yaml
ingress: false
```

This allows ACA to run as a **background service** (e.g., process messages from a queue).

---

## ✅ 8. Environment Variables & Secrets

You can set:

* Regular environment variables
* Secrets (encrypted)
* Key Vault-backed secrets

Set secrets with CLI:

```bash
az containerapp secret set \
  --name my-app \
  --resource-group my-rg \
  --secrets mySecret=value123
```

Reference in the app like:

```yaml
env:
  - name: DB_PASSWORD
    secretRef: mySecret
```

---

## ✅ 9. Dapr Integration (Optional)

Dapr adds:

* **Pub/Sub** messaging
* **Service invocation**
* **State store support**
* **Secret management**

Useful for microservice-based architecture:

```yaml
dapr:
  enabled: true
  appId: my-app
```

---

## ✅ 10. Networking and VNet Integration

Use **internal environment** if:

* App should not be accessible publicly
* App must talk to services in a private subnet

You must:

* Use a **VNet-integrated Container App Environment**
* Configure **private DNS**, subnet delegation, and NSGs

---

## ✅ 11. Deployment Options

You can deploy Container Apps using:

* Azure CLI
* YAML or Bicep
* Azure Portal
* GitHub Actions or Azure DevOps

### Example CLI:

```bash
az containerapp create \
  --name myapp \
  --resource-group myrg \
  --image myregistry.azurecr.io/app:v1 \
  --environment my-env \
  --ingress external \
  --target-port 8080
```

---

## ✅ 12. Logging and Monitoring

* Built-in integration with **Azure Monitor** and **Log Analytics**
* Container logs available via `az containerapp logs show`
* Can enable Dapr tracing and OpenTelemetry

---

## ✅ 13. Real-World Use Cases

* Expose public APIs (with autoscaling)
* Background workers that process queues
* Event-driven microservices (Service Bus / Event Grid)
* Low-cost API endpoints for front-end apps

---

## 📌 Summary Table for Your Notes

| Concept     | Key Point                                                   |
| ----------- | ----------------------------------------------------------- |
| Environment | Must be created first, can be public or private             |
| Ingress     | `external`, `internal`, or `false` for background jobs      |
| Scaling     | KEDA-based, rules for HTTP, queues, CPU, etc.               |
| Revisions   | `single` (overwrite) or `multiple` (traffic split possible) |
| Secrets     | App secrets or Key Vault integration                        |
| VNet        | Only possible with **internal** environment                 |
| Dapr        | Optional – useful for microservice architecture             |

---

#QUESTIONS

1.1.1 Create and manage container images

---

### **1. d) Azure Container Apps ✅**

✔️ **Correct** – It supports autoscaling, blue/green deployments (via revisions and traffic splitting), and container-based apps.

---

### **2. b) Azure Container Instances ✅**

✔️ **Correct** – Perfect use case: short-lived container with no orchestration or scaling needs.

---

### **3. d) Azure Logic Apps ❌**

❌ **Incorrect** – The right answer is: **a) Azure Functions**.

> Reason: **Input/output bindings** are a specific feature of Azure Functions, not Logic Apps. Logic Apps use connectors and workflows, but don’t support the same "binding" model.

---

### **4. c) CMD ✅**

✔️ **Correct** – `CMD` sets the default runtime instruction **but can be overridden** by command-line input in `docker run`.

---

### **5. b) Push the image to Azure Container Registry ✅**

✔️ **Correct** – Azure Container Apps pulls images from registries. So before deploying, image must be available in ACR or Docker Hub.

---

### **6. b) ACR Admin mode is disabled and ACI lacks permission ✅**

✔️ **Correct** – ACI must authenticate with ACR (via admin mode or Azure AD). Otherwise, image pulls will fail with `401`.

---

### **7. c) Swap versions with zero downtime ✅**

✔️ **Correct** – Deployment slots let you perform **zero-downtime swaps** between staging and production.

---

### **8. c) Azure Container Instances ✅**

✔️ **Correct** – ACI is **not ideal** for long-running or stateful apps. It’s designed for short-lived, stateless workloads.

---

### **9. c) Use Azure Key Vault with managed identity ✅**

✔️ **Correct** – This is the **best practice**. Don’t bake secrets into your container. Use Key Vault + Managed Identity to securely retrieve them at runtime.

---

### **10. b) App Service Plan (Premium) + Deployment Slots + Autoscale rules ✅**

✔️ **Correct** – This combo gives autoscaling and slot support for blue/green deployments. Matches the scenario.

---

### **11. c) Azure Container Instances ✅**

✔️ **Correct** – ACI supports VNET integration, letting you run containers **privately** and access internal resources.

---

### **12. c) Azure Kubernetes Service ✅**

✔️ **Correct** – AKS is designed for **complex, orchestrated, multi-container apps** with full Kubernetes power.

---

### **13. c) Supports Docker images from ACR or Docker Hub ✅**

✔️ **Correct** – Azure App Service (for containers) can pull from public or private registries (ACR/Docker Hub).

---

### **14. b) Azure Kubernetes Service ❌**

❌ **Incorrect** – Correct answer is **c) Azure Container Apps**

> Reason: Azure Container Apps supports **Dapr**, autoscaling, revisions, and microservice scenarios — all **without needing to manage AKS**.
> AKS is powerful, but not required **just to use Dapr or microservices** unless you explicitly need full orchestration control.

But wait... you selected **14.b**, but I listed 14.b as **AKS** — not Container Apps. So actually this answer is incorrect.

**UPDATE:** You **did** select b, which is **incorrect**.

---

### **15. c) az acr create ✅**

✔️ **Correct** – This is the official CLI command to create an Azure Container Registry.

---

Awesome! You’re taking the **right approach** by simulating tough exam-level questions. Let’s review your answers now:

---

## ✅ Your Answers

`1.a, 2.b, 3.b, 4.c, 5.d, 6.c, 7.a, 8.c, 9.c, 10.c, 11.c, 12.b`

---

## 🧠 Score Summary

| Result                                | Count |
| ------------------------------------- | ----- |
| ✅ Correct                             | 10    |
| ❌ Incorrect                           | 2     |
| 🔁 Needs Clarification (slightly off) | 0     |

**🟢 Final Score: 10/12 → \~83% Accuracy**
Excellent! These were **tough, scenario-based questions**. Let’s explain each:

---

### **1. a) You did not expose port 80 ✅**

✔️ Correct. Containers need explicit port exposure using `--ports`. Otherwise, the app won’t respond externally.

---

### **2. b) Hosting a small API server that runs 24x7 ✅**

✔️ Correct. ACI is **not cost-effective for always-on services**. It’s designed for **ephemeral, short-lived, or burst workloads**.

---

### **3. b) Use `--subnet` and deploy to VNet ✅**

✔️ Correct. VNet support allows private networking. No public IP or NSG is needed *if* subnet integration is used.

---

### **4. c) `az container create --image acr.azurecr.io/web:1.0 --assign-identity --registry-username --registry-password` ❌**

❌ Incorrect. If using `--assign-identity`, you **don’t need** username/password.

✔️ Correct answer: **d)** `--assign-identity --secrets key=value`

> If the identity has AcrPull role, it’ll authenticate automatically. Optionally, secrets can be mounted using `--secrets`.

---

### **5. d) ARM template or YAML ✅**

✔️ Correct. ACI supports multi-container groups defined in ARM templates or YAML. Docker Compose is **not supported directly**.

---

### **6. c) Cannot scale horizontally ✅**

✔️ Correct. ACI doesn’t natively support horizontal scaling like AKS or App Service. You'd need to deploy multiple instances manually.

---

### **7. a) Containers automatically restart on failure ❌**

❌ Incorrect. ACI **does NOT restart containers** automatically unless it's a crash during startup. It’s more like a **one-shot execution** model.

✔️ Correct: **c) Containers stop after execution if it's a non-daemon process**

---

### **8. c) `--dns-name-label` ✅**

✔️ Correct. This parameter gives your container a publicly accessible FQDN like:
`mycontainer.westus.azurecontainer.io`

---

### **9. c) System-assigned managed identity ✅**

✔️ Correct. To securely access Azure Key Vault, ACI must have a managed identity with `Key Vault Secrets User` role.

---

### **10. c) Assign AcrPull role to ACI identity ✅**

✔️ Correct. If ACI uses a managed identity, assigning `AcrPull` on the ACR is enough. No need for admin access or service principal.

---

### **11. c) Nightly image-processing job ✅**

✔️ Correct. ACI is **perfect for infrequent, short-lived, compute-heavy tasks** triggered by Logic Apps or Azure Functions.

---

### **12. b) `az container logs` ✅**

✔️ Correct. ACI logs are accessed via CLI:

```bash
az container logs --name mycontainer --resource-group myrg
```

---

## 🔑 Key Takeaways to Memorize for the Exam

| Concept             | Key Point                                                             |
| ------------------- | --------------------------------------------------------------------- |
| 🔒 ACR Auth         | Use **managed identity + AcrPull role** – avoid admin access          |
| 🌐 DNS/FQDN         | Use `--dns-name-label` to assign a public FQDN                        |
| 📦 ACI vs AKS       | ACI = on-demand, short-lived; AKS = scalable, long-running            |
| 🔐 Key Vault Access | Needs **managed identity** + proper RBAC                              |
| 🔄 Restart          | ACI **does not auto-restart** unless specified; it's like a batch job |

---

Great — let’s move on to the next topic in the AZ-204 syllabus:

---

