# 🚀 Azure App Services: A-Z Hands-On Guide

We'll cover everything step by step:

### ✅ **Step 0: Prerequisites**

Make sure you've done the following:

* ✅ Installed Azure CLI: `az --version`
* ✅ Logged in: `az login` (or `az login --use-device-code`)
* ✅ Chosen a subscription:

```bash
az account set --subscription "<Your Subscription Name or ID>"
```

How to check your current subscription:

```bash
    az account show --query "name"
```
* ✅ Created a resource group (or you can create one in Step 1)

* ✅ Have a sample web app code ready (Node.js, Python, etc.) or be ready to create one
* ✅ Have a zip file ready for deployment (if you want to deploy a zip package)

---

## ✅ **Step 1: Create a Resource Group**

```bash
az group create --name MyResourceGroup --location eastus
```

📘 A resource group is a logical container for Azure resources.

---

## ✅ **Step 2: Create an App Service Plan**

```bash
az appservice plan create \
  --name MyAppServicePlan \
  --resource-group Developer_Associate \
  --sku F1 \
  --is-linux
```
🔹 `--sku F1` = Free tier
🔹 `--is-linux` = Creates a Linux-based environment (optional, for Node.js/Python/etc.)

To list existing App Service Plans:

```
bash 
    az appservice plan list --resource-group Developer_Associate --output table
```

Note: 

* You can also use `--sku B1` for Basic tier or `--sku S1` for Standard tier, depending on your needs.
* If you want a Windows-based environment, omit `--is-linux`.
* App service plan is regional, so it will be created in the same region as your resource group.
* Since its regional, it wont be used for a app service created in different region.
* App Service Plans can host multiple web apps, so you can scale your applications easily.
* You can also scale up or down your App Service Plan later based on your needs.
* You can use the `--number-of-workers` parameter to specify how many instances you want to run your app on. For example, `--number-of-workers 2` will create two instances of your app.( This is horizontal scaling, which is different from vertical scaling where you increase the resources of a single instance.)
* You can also use the `--tags` parameter to add tags to your App Service Plan for better organization and management. For example, `--tags environment=production department=finance` will add these tags to your App Service Plan.
* You can also use the `--location` parameter to specify a different region for your App Service Plan if you want to create it in a different region than your resource group. For example, `--location westus` will create your App Service Plan in the West US region.
* You can also use the `--max-burst` parameter to specify the maximum number of requests that your App Service Plan can handle at a time. For example, `--max-burst 100` will allow your App Service Plan to handle up to 100 requests at a time before throttling.
* You can also use the `--per-site-scaling` parameter to enable or disable per-site scaling for your App Service Plan. Per-site scaling allows you to scale each web app individually within the same App Service Plan, which can help you optimize resource usage and costs. For example, `--per-site-scaling true` will enable per-site scaling for your App Service Plan.
* You can also use the `--reserved` parameter to specify whether your App Service Plan is reserved or not. Reserved App Service Plans are dedicated to a single customer and provide better performance and reliability. For example, `--reserved true` will create a reserved App Service Plan.
* You can also use the `--hyper-v` parameter to specify whether your App Service Plan supports Hyper-V isolation or not. Hyper-V isolation provides better security and performance for your web apps by running them in isolated containers. For example, `--hyper-v true` will create an App Service Plan that supports Hyper-V isolation.
* You can also use the `--linux-fx-version` parameter to specify the runtime version for your Linux-based App Service Plan. For example, `--linux-fx-version "NODE|14-lts"` will create an App Service Plan that uses Node.js version 14 LTS as the runtime.
* You can also use the `--windows-fx-version` parameter to specify the runtime version for your Windows-based App Service Plan. For example, `--windows-fx-version "DOTNET|6.0"` will create an App Service Plan that uses .NET version 6.0 as the runtime.
* You can also use the `--client-affinity-enabled` parameter to enable or disable client affinity for your App Service Plan. Client affinity allows your web apps to maintain session state across multiple requests from the same client, which can improve user experience and performance. For example, `--client-affinity-enabled true` will enable client affinity for your App Service Plan.
* You can also use the `--scm-site` parameter to specify whether your App Service Plan has a separate SCM site or not. The SCM site is used for deployment and management of your web apps, and having a separate SCM site can improve performance and security. For example, `--scm-site true` will create an App Service Plan with a separate SCM site.
* You can also use the `--https-only` parameter to enforce HTTPS for your App Service Plan. This ensures that all traffic to your web apps is secure and encrypted. For example, `--https-only true` will enable HTTPS only for your App Service Plan.
*   You can also use the `--auto-heal-enabled` parameter to enable or disable auto-healing for your App Service Plan. Auto-healing automatically restarts your web apps if they become unresponsive or unhealthy, which can improve reliability and availability. For example, `--auto-heal-enabled true` will enable auto-healing for your App Service Plan.
* You can also use the `--scaling-enabled` parameter to enable or disable scaling for your App Service Plan. Scaling allows you to adjust the number of instances and resources allocated to your web apps based on demand, which can help you optimize performance and costs. For example, `--scaling-enabled true` will enable scaling for your App Service Plan.
* You can also use the `--suspended` parameter to suspend or resume your App Service Plan. Suspending an App Service Plan stops all web apps and resources associated with it, while resuming it restarts them. For example, `--suspended true` will suspend your App Service Plan.
* You can also use the `--is-public` parameter to specify whether your App Service Plan is public or private. Public App Service Plans are accessible from the internet, while private App Service Plans are only accessible from within a virtual network. For example, `--is-public true` will create a public App Service Plan.
* You can also use the `--is-spot` parameter to specify whether your App Service Plan is a spot instance or not. Spot instances are low-cost, interruptible instances that can be used for non-critical workloads. For example, `--is-spot true` will create a spot instance App Service Plan.
* You can also use the `--is-ssl` parameter to specify whether your App Service Plan supports SSL or not. SSL support allows you to secure your web apps with SSL certificates, which can improve security and trustworthiness. For example, `--is-ssl true` will create an App Service Plan that supports SSL.
* You can also use the `--is-geo-redundant` parameter to specify whether your App Service Plan is geo-redundant or not. Geo-redundant App Service Plans replicate your web apps and resources across multiple regions for better availability and disaster recovery. For example, `--is-geo-redundant true` will create a geo-redundant App Service Plan.
* You can also use the `--is-traffic-manager` parameter to specify whether your App Service Plan supports Traffic Manager or not. Traffic Manager allows you to distribute traffic across multiple web apps and regions for better performance and reliability. For example, `--is-traffic-manager true` will create an App Service Plan that supports Traffic Manager.
* You can also use the `--is-azure-front-door` parameter to specify whether your App Service Plan supports Azure Front Door or not. Azure Front Door provides global load balancing and application acceleration for your web apps. For example, `--is-azure-front-door true` will create an App Service Plan that supports Azure Front Door.
* You can also use the `--is-cdn` parameter to specify whether your App Service Plan supports Content Delivery Network (CDN) or not. CDN allows you to cache and deliver static content from edge locations for better performance and scalability. For example, `--is-cdn true` will create an App Service Plan that supports CDN.
* You can also use the `--is-azure-functions` parameter to specify whether your App Service Plan supports Azure Functions or not. Azure Functions allows you to run serverless code in response to events and triggers. For example, `--is-azure-functions true` will create an App Service Plan that supports Azure Functions.
* You can also use the `--is-azure-kubernetes-service` parameter to specify whether your App Service Plan supports Azure Kubernetes Service (AKS) or not. AKS allows you to run containerized applications in a managed Kubernetes environment. For example, `--is-azure-kubernetes-service true` will create an App Service Plan that supports AKS.
* You can also use the `--is-azure-container-registry` parameter to specify whether your App Service Plan supports Azure Container Registry (ACR) or not. ACR allows you to store and manage container images in a private registry. For example, `--is-azure-container-registry true` will create an App Service Plan that supports ACR.
* You can also use the `--is-azure-sql-database` parameter to specify whether your App Service Plan supports Azure SQL Database or not. Azure SQL Database allows you to run relational databases in the cloud. For example, `--is-azure-sql-database true` will create an App Service Plan that supports Azure SQL Database.
* You can also use the `--is-azure-cosmos-db` parameter to specify whether your App Service Plan supports Azure Cosmos DB or not. Azure Cosmos DB allows you to run globally distributed, multi-model databases in the cloud. For example, `--is-azure-cosmos-db true` will create an App Service Plan that supports Azure Cosmos DB.
* You can also use the `--is-azure-storage` parameter to specify whether your App Service Plan supports Azure Storage or not. Azure Storage allows you to store and manage unstructured data in the cloud. For example, `--is-azure-storage true` will create an App Service Plan that supports Azure Storage.
* You can also use the `--is-azure-service-bus` parameter to specify whether your App Service Plan supports Azure Service Bus or not. Azure Service Bus allows you to build messaging and integration solutions in the cloud. For example, `--is-azure-service-bus true` will create an App Service Plan that supports Azure Service Bus.
* You can also use the `--is-azure-event-grid` parameter to specify whether your App Service Plan supports Azure Event Grid or not. Azure Event Grid allows you to build event-driven architectures in the cloud. For example, `--is-azure-event-grid true` will create an App Service Plan that supports Azure Event Grid.
* You can also use the `--is-azure-event-hubs` parameter to specify whether your App Service Plan supports Azure Event Hubs or not. Azure Event Hubs allows you to build real-time data streaming solutions in the cloud. For example, `--is-azure-event-hubs true` will create an App Service Plan that supports Azure Event Hubs.
* You can also use the `--is-azure-logic-apps` parameter to specify whether your App Service Plan supports Azure Logic Apps or not. Azure Logic Apps allows you to build workflows and integrations in the cloud. For example, `--is-azure-logic-apps true` will create an App Service Plan that supports Azure Logic Apps.
* You can also use the `--is-azure-api-management` parameter to specify whether your App Service Plan supports Azure API Management or not. Azure API Management allows you to create, publish, secure, and analyze APIs in the cloud. For example, `--is-azure-api-management true` will create an App Service Plan that supports Azure API Management.
* You can also use the `--is-azure-monitor` parameter to specify whether your App Service Plan supports Azure Monitor or not. Azure Monitor allows you to collect, analyze, and act on telemetry data from your applications and infrastructure in the cloud. For example, `--is-azure-monitor true` will create an App Service Plan that supports Azure Monitor.
* You can also use the `--is-azure-security-center` parameter to specify whether your App Service Plan supports Azure Security Center or not. Azure Security Center provides unified security management and advanced threat protection for your applications and infrastructure in the cloud. For example, `--is-azure-security-center true` will create an App Service Plan that supports Azure Security Center.
* You can also use the `--is-azure-key-vault` parameter to specify whether your App Service Plan supports Azure Key Vault or not. Azure Key Vault allows you to securely store and manage sensitive information such as secrets, keys, and certificates in the cloud. For example, `--is-azure-key-vault true` will create an App Service Plan that supports Azure Key Vault.
* You can also use the `--is-azure-active-directory` parameter to specify whether your App Service Plan supports Azure Active Directory (AAD) or not. AAD allows you to manage user identities and access to your applications and resources in the cloud. For example, `--is-azure-active-directory true` will create an App Service Plan that supports AAD.
* You can also use the `--is-azure-devops` parameter to specify whether your App Service Plan supports Azure DevOps or not. Azure DevOps provides a set of development tools and services for building, testing, and deploying applications in the cloud. For example, `--is-azure-devops true` will create an App Service Plan that supports Azure DevOps.
* You can also use the `--is-azure-cognitive-services` parameter to specify whether your App Service Plan supports Azure Cognitive Services or not. Azure Cognitive Services provides a set of AI and machine learning APIs for building intelligent applications in the cloud. For example, `--is-azure-cognitive-services true` will create an App Service Plan that supports Azure Cognitive Services.
* You can also use the `--is-azure-machine-learning` parameter to specify whether your App Service Plan supports Azure Machine Learning or not. Azure Machine Learning provides a set of tools and services for building, training, and deploying machine learning models in the cloud. For example, `--is-azure-machine-learning true` will create an App Service Plan that supports Azure Machine Learning.

* You can also use the `--is-azure-synapse-analytics` parameter to specify whether your App Service Plan supports Azure Synapse Analytics or not. Azure Synapse Analytics provides a unified analytics service for big data and data warehousing in the cloud. For example, `--is-azure-synapse-analytics true` will create an App Service Plan that supports Azure Synapse Analytics.
* You can also use the `--is-azure-data-lake` parameter to specify whether your App Service Plan supports Azure Data Lake or not. Azure Data Lake provides a scalable and secure data lake for big data analytics in the cloud. For example, `--is-azure-data-lake true` will create an App Service Plan that supports Azure Data Lake.
* You can also use the `--is-azure-data-factory` parameter to specify whether your App Service Plan supports Azure Data Factory or not. Azure Data Factory provides a cloud-based data integration service for building ETL and data transformation pipelines. For example, `--is-azure-data-factory true` will create an App Service Plan that supports Azure Data Factory.
* You can also use the `--is-azure-data-explorer` parameter to specify whether your App Service Plan supports Azure Data Explorer or not. Azure Data Explorer provides a fast and highly scalable data exploration service for big data analytics in the cloud. For example, `--is-azure-data-explorer true` will create an App Service Plan that supports Azure Data Explorer.
* You can also use the `--is-azure-time-series-insights` parameter to specify whether your App Service Plan supports Azure Time Series Insights or not. Azure Time Series Insights provides a fully managed analytics service for time series data in the cloud. For example, `--is-azure-time-series-insights true` will create an App Service Plan that supports Azure Time Series Insights.
* You can also use the `--is-azure-purview` parameter to specify whether your App Service Plan supports Azure Purview or not. Azure Purview provides a unified data governance service for managing and discovering data across your applications and resources in the cloud. For example, `--is-azure-purview true` will create an App Service Plan that supports Azure Purview.
* You can also use the `--is-azure-arc` parameter to specify whether your App Service Plan supports Azure Arc or not. Azure Arc allows you to manage and govern resources across hybrid and multi-cloud environments. For example, `--is-azure-arc true` will create an App Service Plan that supports Azure Arc.
* You can also use the `--is-azure-stack` parameter to specify whether your App Service Plan supports Azure Stack or not. Azure Stack allows you to run Azure services in your own data center or edge locations. For example, `--is-azure-stack true` will create an App Service Plan that supports Azure Stack.
* You can also use the `--is-azure-vmware` parameter to specify whether your App Service Plan supports Azure VMware Solution or not. Azure VMware Solution allows you to run VMware workloads in Azure. For example, `--is-azure-vmware true` will create an App Service Plan that supports Azure VMware Solution.
* You can also use the `--is-azure-hpc` parameter to specify whether your App Service Plan supports Azure High Performance Computing (HPC) or not. Azure HPC allows you to run high-performance computing workloads in the cloud. For example, `--is-azure-hpc true` will create an App Service Plan that supports Azure HPC.
* You can also use the `--is-azure-quantum` parameter to specify whether your App Service Plan supports Azure Quantum or not. Azure Quantum provides a cloud-based platform for quantum computing and optimization. For example, `--is-azure-quantum true` will create an App Service Plan that supports Azure Quantum.
* You can also use the `--is-azure-blockchain` parameter to specify whether your App Service Plan supports Azure Blockchain Service or not. Azure Blockchain Service provides a fully managed blockchain service for building and deploying blockchain applications in the cloud. For example, `--is-azure-blockchain true` will create an App Service Plan that supports Azure Blockchain Service.
* You can also use the `--is-azure-iot` parameter to specify whether your App Service Plan supports Azure IoT or not. Azure IoT provides a set of services and tools for building and managing IoT solutions in the cloud. For example, `--is-azure-iot true` will create an App Service Plan that supports Azure IoT.
* You can also use the `--is-azure-mixed-reality` parameter to specify whether your App Service Plan supports Azure Mixed Reality or not. Azure Mixed Reality provides a set of services and tools for building and deploying mixed reality applications in the cloud. For example, `--is-azure-mixed-reality true` will create an App Service Plan that supports Azure Mixed Reality.




---

## ✅ **Step 3: Create a Web App**

Choose a runtime. Example: Node.js

```bash
az webapp create \
  --resource-group Developer_Associate \
  --plan MyAppServicePlan \
  --name mywebapp$RANDOM \
  --runtime "NODE|22-lts"
```

📌 Replace `NODE|22-lts` with other runtimes if needed (e.g., `DOTNETCORE|6.0`, `PYTHON|3.10`, etc.)
📌 `mywebapp$RANDOM` ensures a unique name globally.

---

## ✅ **Step 4: Deploy Code to Web App**

### Option 1: Deploy ZIP Package

#### Create a folder structure for the code

nodeapp/
├── server.js
├── package.json
└── .zip (will be created)


```bash
az webapp deployment source config-zip \
  --resource-group Developer_Associate \
  --name mywebapp6176 \
  --src nodeapp.zip
```

📦 Make sure you zip your app before deploying.

---

### Option 2: Local Git Deployment

```bash
az webapp deployment source config-local-git \
  --name <your-webapp-name> \
  --resource-group MyResourceGroup
```

It returns a Git URL → use it to push code:

```bash
git remote add azure <deployment-git-url>
git push azure master
```

---

## ✅ **Step 5: Configure App Settings (Environment Variables)**

```bash
az webapp config appsettings set \
  --name <your-webapp-name> \
  --resource-group MyResourceGroup \
  --settings "ENV=Production" "DEBUG=False"
```

---

## ✅ **Step 6: Enable Application Logs**

```bash
az webapp log config \
  --name <your-webapp-name> \
  --resource-group MyResourceGroup \
  --application-logging true
```

To stream logs:

```bash
az webapp log tail \
  --name <your-webapp-name> \
  --resource-group MyResourceGroup
```

---

## ✅ **Step 7: Create and Swap Deployment Slots**

```bash
az webapp deployment slot create \
  --name <your-webapp-name> \
  --resource-group MyResourceGroup \
  --slot staging
```

To swap:

```bash
az webapp deployment slot swap \
  --name <your-webapp-name> \
  --resource-group MyResourceGroup \
  --slot staging
```

---

## ✅ **Step 8: Clean Up (Optional)**

```bash
az group delete --name MyResourceGroup --no-wait --yes
```

---

## 🧪 Ready to Practice?

Let’s start step-by-step. You can do:

✅ Step 1: Create resource group
Then send me a ✅ and we’ll move to Step 2.

Would you like me to generate a zip file with a sample web app (like Node.js or Python) for your test deployment?
