
---

## 🔹 1. What is an Azure Storage Account?

An **Azure Storage Account** is a container that gives you access to Azure Storage services:

* **Blob Storage** (for unstructured data like images, videos)
* **File Storage** (for shared files via SMB)
* **Queue Storage** (for message queuing between components)
* **Table Storage** (for NoSQL key-value data)
* **Disk Storage** (for virtual machine disks)

---

## 🔹 2. Storage Account Types

| Type                    | Use Case                                                  |
| ----------------------- | --------------------------------------------------------- |
| **General Purpose v2**  | Default. Supports all features (Blob, Queue, Table, Disk) |
| **General Purpose v1**  | Legacy. Lower cost, fewer features                        |
| **Blob Storage**        | Optimized for blob storage only                           |
| **Premium Performance** | For high IOPS (mainly for Disks, Files)                   |

---

## 🔹 3. Performance Tiers

| Tier         | Description                                  |
| ------------ | -------------------------------------------- |
| **Standard** | Backed by HDD. Cost-effective.               |
| **Premium**  | Backed by SSD. High throughput & low latency |

---

## 🔹 4. Access Tiers (Blob only)

| Tier        | Use Case                            |
| ----------- | ----------------------------------- |
| **Hot**     | Frequent access data                |
| **Cool**    | Infrequent access, stored ≥ 30 days |
| **Archive** | Rare access, stored ≥ 180 days      |

---

## 🔹 5. Redundancy Options

| Redundancy                          | Description                    |
| ----------------------------------- | ------------------------------ |
| **LRS** – Locally redundant storage | 3 copies in same region        |
| **ZRS** – Zone redundant storage    | Across AZs in same region      |
| **GRS** – Geo-redundant storage     | Secondary region backup        |
| **RA-GRS** – Read-access GRS        | GRS + read access to secondary |

GRS replicates data asynchronously to a paired region
---

## 🔹 6. Blob Storage Deep Dive

**Blob types**:

* **Block blobs** – for files (images, logs, backups)
* **Append blobs** – for logs (only append allowed)
* **Page blobs** – for VHDs and disks (read/write random access)

### Blob URL structure:

```
https://<storageaccount>.blob.core.windows.net/<container>/<blobname>
```

---

## 🔹 7. Security Features

* **Shared Access Signatures (SAS)** – Delegated access to resources
* **Azure AD Authentication** – RBAC-based access control
* **Storage Account Keys** – Full admin-level access (primary & secondary)
* **Encryption** – Data encrypted at rest (Microsoft-managed or customer-managed keys)

---

## 🔐 Azure Storage Security & Access Control

Azure offers **multiple ways to secure and access** your storage:

---

### ✅ 1. **Shared Key Authorization (Account Keys)**

* Every storage account has **two 512-bit access keys**
* Using either key gives **full access** to all resources (blobs, files, queues, tables)
* Used in **code, apps, or tools like AzCopy**

**🔺 Risk:** If leaked, it’s like handing out a master password

---

### ✅ 2. **Shared Access Signature (SAS)**

SAS provides **fine-grained, time-limited access** to storage resources.

#### 🔸 Types of SAS:

| Type                    | Scope                               | Use Case Example                       |
| ----------------------- | ----------------------------------- | -------------------------------------- |
| **User Delegation SAS** | Per-user (uses Azure AD)            | Access granted to a signed-in user     |
| **Service SAS**         | Specific service (blob, file, etc.) | Grant access to a file for 1 hour      |
| **Account SAS**         | Whole account                       | Grant full read access to all services |

#### ⚙️ With SAS, you can control:

* **Permissions** (read, write, delete, list, etc.)
* **Start/expiry time**
* **IP range restrictions**
* **Protocols** (HTTPS only)

**🧠 Exam Tip:** Always prefer SAS over Account Key in production for security.

---

### ✅ 3. **Azure RBAC (Role-Based Access Control)**

* Uses **Azure AD identities** to control access to storage resources
* Supports **resource-level roles** like:

  * **Storage Blob Data Reader**
  * **Storage Blob Data Contributor**
* Works well for **serverless apps** or users authenticated via Azure AD

---

### ✅ 4. **Firewall & Virtual Network Rules**

* You can **restrict access** to your storage account from:

  * **Specific IP ranges**
  * **Virtual Networks (VNets)**
* Block access from public internet entirely if needed

---

### ✅ 5. **Private Endpoint**

* Maps your storage account to a **private IP** in your VNet
* Bypasses public internet — ensures **100% private access**

---

## 🧠 Security Best Practices for AZ-204:

| Situation                      | Recommended Access Method     |
| ------------------------------ | ----------------------------- |
| Web/mobile app uploads blob    | SAS Token (via backend)       |
| Azure Function writing to blob | Azure RBAC + Managed Identity |
| Admin connecting from on-prem  | Account Key (short-term use)  |
| Enterprise app (long-term)     | Private Endpoint + RBAC       |

---


## 🔹 8. Monitoring and Diagnostics

* **Azure Monitor**
* **Metrics** (Request Count, Success Rate, Egress/Ingress, Latency)
* **Diagnostic Logs** (Access logs, latency, errors)
* **Soft delete** and **Versioning** for blobs

---

## 🔹 9. Developer Features (AZ-204 Focus)

* Use **Azure SDKs** for .NET, Python, Node.js
* Use **Azure.Storage.Blobs** package in .NET
* Upload/Download blobs
* Generate SAS tokens in code
* Set blob metadata & properties
* Async operations for file handling
* Use **QueueClient** for inserting and reading messages

---

## 🔹 10. ARM/Bicep & Terraform Support

Define storage account as Infrastructure-as-Code:

```bicep
resource stg 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: 'mystorageacct'
  location: 'eastus'
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}
```

---

## 🔹 11. Common Developer Use Cases

* Host static websites on Blob storage
* Upload large files in chunks
* Store logs and diagnostics (append blobs)
* Use Queue storage to decouple components
* Use Tables for structured NoSQL data
* Connect via REST API or SDKs

---

🔹 What is Rehydration in Azure Blob Storage?
When you store a blob in the Archive tier, the blob becomes offline — you cannot read or modify it until it’s moved back to an online tier (Hot or Cool).
This process is called rehydration.

---

Great! Let’s move on to the **next major Azure Storage topic**:

---

## 🔄 **Azure Blob Lifecycle Management**

This is a powerful and exam-relevant feature — also extremely useful in real-world cost optimization.

---

## 🧠 What is Lifecycle Management?

> **Automatically move or delete blobs** based on **rules you define** (age, access, etc.)

This helps you:

* Reduce storage **costs**
* Retain data only as long as needed
* Clean up old or unused blobs

---

## 🔁 Example Scenarios

| Scenario                              | Action                                       |
| ------------------------------------- | -------------------------------------------- |
| Delete blobs 30 days after upload     | `if blob age > 30 days → delete`             |
| Move logs to cool tier after 7 days   | `if blob age > 7 days → move to cool`        |
| Archive blobs not accessed in 90 days | `if last access > 90 days → move to archive` |

---

## 🧩 Storage Tiers Refresher

| Tier        | Use Case                         | Cost Model                                                |
| ----------- | -------------------------------- | --------------------------------------------------------- |
| **Hot**     | Frequently accessed data         | High storage, low access cost                             |
| **Cool**    | Infrequently accessed (30+ days) | Lower storage, higher access                              |
| **Archive** | Rarely accessed (180+ days)      | Very cheap storage, expensive access (rehydration needed) |

---

## ⚙️ How to Use Lifecycle Management

1. Go to your **Storage Account** in Azure Portal
2. Navigate to **"Lifecycle management"**
3. Click **“+ Add a rule”**
4. Define:

   * **Filters** (by blob name prefix, container, tag)
   * **Conditions** (e.g., age > 30 days)
   * **Action** (move to cool/archive, delete)

---

## 🧪 Sample Rule (XML-style logic)

```json
{
  "rules": [
    {
      "name": "move-logs-to-cool",
      "enabled": true,
      "type": "Lifecycle",
      "definition": {
        "filters": {
          "blobTypes": ["blockBlob"],
          "prefixMatch": ["logs/"]
        },
        "actions": {
          "baseBlob": {
            "tierToCool": {
              "daysAfterModificationGreaterThan": 7
            },
            "delete": {
              "daysAfterModificationGreaterThan": 30
            }
          }
        }
      }
    }
  ]
}
```

---

## 🎯 Benefits

✅ **Cost-efficient**: Automatically archives or deletes unused data
✅ **Set and forget**: Runs in the background
✅ **Customizable**: Target specific containers, files, or blob types

---

## 📌 Notes for the AZ-204 Exam

| Topic                     | Key Points                                             |
| ------------------------- | ------------------------------------------------------ |
| Lifecycle policy triggers | Based on **modification date** or **last access date** |
| Applicable blob types     | Only **Block Blobs** (not Append/Page blobs)           |
| Tiers you can move to     | Hot → Cool → Archive                                   |
| Rehydration required?     | Yes, if you move data from **Archive → Cool/Hot**      |
| Supported tool?           | Can define via **Portal, Azure CLI, ARM, or Bicep**    |

---
