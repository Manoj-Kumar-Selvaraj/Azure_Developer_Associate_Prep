---

## 🔁 **AzCopy**

### 📌 What It Is:

A **command-line tool** used to **copy files** between:

* On-prem → Azure Blob / Azure Files
* Azure Blob ↔ Azure Blob
* Azure File ↔ Azure File

### ✅ Key Use Cases:

* Upload/download **large datasets**
* Migrate files to **Blob Storage** or **Azure Files**
* **Backup** scenarios
* Works on **Linux, Windows, macOS**

### 💡 Highlights:

* High-speed **multi-threaded uploads**
* No file system integration — just copying
* One-way sync
* Can be used in **CI/CD or scripts**

### 🧠 Remember for AZ-204:

* Use `azcopy copy` for file transfers
* Can use SAS tokens for auth
* Does **not maintain file permissions or NTFS ACLs**

---

## 🔄 **Azure File Sync**

### 📌 What It Is:

A **cloud service** that allows you to **sync on-prem file servers** with **Azure File shares**.

### ✅ Key Use Cases:

* **Hybrid file server** solution
* Keep **on-prem** and **cloud file shares** in sync
* Access cloud files via **Windows File Explorer** with caching

### 💡 Highlights:

* Two-way sync
* Uses **Sync Agent** on your Windows Server
* Supports **tiering** (hot data on-prem, cold in cloud)
* Maintains **NTFS ACLs, timestamps, attributes**

### 🧠 Remember for AZ-204:

* Ideal for **enterprise or branch office** hybrid file systems
* Not a CLI tool — requires Azure File Sync **agent**
* Needs **Storage Sync Service**, **Registered Server**, and **Sync Group**

---

## 🆚 Summary Table

| Feature                    | AzCopy                             | Azure File Sync                   |
| -------------------------- | ---------------------------------- | --------------------------------- |
| Tool Type                  | CLI tool                           | Cloud service + Agent             |
| Sync Direction             | One-way                            | Two-way (on-prem ↔ Azure)         |
| Use Case                   | Fast file copy, migration          | Hybrid file server + sync         |
| Maintains NTFS Permissions | ❌ No                               | ✅ Yes                             |
| Scheduling Support         | ✅ Script it (cron, Task Scheduler) | ✅ Native cloud sync               |
| OS Support                 | All OS                             | Windows Server only               |
| Setup Complexity           | Very easy                          | Medium (agent + cloud setup)      |
| Performance                | Very fast                          | Moderate (depends on sync config) |

---

## 🤔 When to Use What?

| Scenario                           | Tool                |
| ---------------------------------- | ------------------- |
| Migrate files to Blob              | **AzCopy**          |
| Regular backup to Azure File       | **AzCopy**          |
| Sync on-prem file share with Azure | **Azure File Sync** |
| Replace on-prem file server        | **Azure File Sync** |
| One-time upload of logs            | **AzCopy**          |

---

* You are developing an Azure Function App that needs to log detailed execution information for troubleshooting purposes. Which of the following methods should you use to implement logging in your Azure Function?
    * Your answer is correct
        Configure Application Insights and use the TelemetryClient to send custom events and log messages.

        Explanation
            Configuring Application Insights and using the TelemetryClient to send custom events and log messages is the correct method to implement logging in your Azure Function. Application Insights provides a centralized platform for monitoring and logging, allowing you to track detailed execution information, analyze performance, and troubleshoot issues effectively.

* Go into Azure Monitor. Go into Alerts. Select the Subscription scope. Select the Create or Update Container Registry signal. Add the action group that emails you. Give it a name and click save.

* Custom Handlers -- feature of Azure functions allow you to use a runtime not currently supported natively by Azure

* Which of the following statements describes the type of data that can be retrieved using Microsoft Graph?
    * All of the data contained in Microsoft 365, including documents, calendar, email, Teams, and people.

* The API Management Gateway includes a powerful feature called Policies. What is the main function of policies?
    * Policies allow you to modify the behavior of the API using configuration instead of code. A policy can change both the inbound request and the outbound response.

* You have a Lifecycle Storage policy that moves blobs from hot storage to cool storage if they have not been modified in 30 days. You realize that there is a frequently accessed file that is in cool storage due to this policy, and you'd like to save money by moving it back to hot storage. So you manually move this file back to hot storage. Will this solve your problem?
Your answer is correct
No, the blob will be automatically moved back to cool storage the next day

Overall explanation
Moving the blob from cool to hot does not modify it's modification date, and so it will be moved back to cool storage the next time lifecycle management runs. You need to either modify the rule to be based on last access date, or modify the file when moving it back so that the modification date is updated. Refer to Microsoft Doc: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-lifecycle-management-concepts?tabs=azure-portal

---


TrackEvent

Explanation
The TrackEvent method is the correct choice for sending custom events to Application Insights. This method allows you to track specific business events, such as user interactions like completing a purchase. It is ideal for capturing important business metrics and monitoring user behavior.
TrackException

Explanation
The TrackException method is used to track exceptions and errors in Application Insights. It is designed to capture information about application crashes, unexpected errors, and exceptions that occur during runtime, rather than tracking specific business events like user interactions.
TrackTrace

Explanation
The TrackTrace method is used to send diagnostic trace messages to Application Insights. It is typically used for logging information related to application behavior and errors, rather than tracking specific business events like user interactions.
TrackMetric

Explanation
The TrackMetric method is used to track numerical data and metrics in Application Insights. It is more suitable for monitoring performance metrics, resource usage, and other quantitative data, rather than tracking specific business events like user interactions.

--- 

* A SAS token can be created for both publicly accessible and private blobs in Azure Storage. The access permissions granted by the SAS token determine who can access the blob, not the public accessibility of the blob itself.

---

## 🔁 **Azure Blob Storage Redundancy Options (Replication Types)**

Here's a breakdown of all redundancy options available in Azure Blob Storage:

| **Option**  | **Full Name**                          | **Copy Scope**                                | **Description**                                                                                                                     |
| ----------- | -------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **LRS**     | Locally Redundant Storage              | 🟩 Single datacenter                          | 3 copies within a single **Azure datacenter** in the region. Cheapest and lowest redundancy.                                        |
| **ZRS**     | Zone-Redundant Storage                 | 🟦 Multiple availability zones in same region | 3 copies across **Availability Zones (AZs)** within the same region. High availability and better fault tolerance.                  |
| **GRS**     | Geo-Redundant Storage                  | 🌍 Across 2 regions                           | 3 copies in the primary region (LRS) + 3 **asynchronous geo-replicated** copies in a **paired region**.                             |
| **GZRS**    | Geo-Zone-Redundant Storage             | 🌐 ZRS + GRS                                  | Combines **ZRS** in the primary region + **GRS** to a secondary region. Ideal for both high availability and geo-disaster recovery. |
| **RA-GRS**  | Read-Access Geo-Redundant Storage      | 🌍 GRS + read access                          | Same as **GRS**, but **read access** is allowed on the **secondary** region endpoint.                                               |
| **RA-GZRS** | Read-Access Geo-Zone-Redundant Storage | 🌐 GZRS + read access                         | Same as **GZRS**, but allows **read** from the secondary region.                                                                    |

---

### ✅ **Summary by Use Case**

| **Use Case**                             | **Recommended Option**   |
| ---------------------------------------- | ------------------------ |
| Cost-effective, basic redundancy         | **LRS**                  |
| Protection against datacenter failure    | **ZRS**                  |
| Disaster recovery across regions         | **GRS**                  |
| High availability + regional DR          | **GZRS**                 |
| Cross-region read access (read replicas) | **RA-GRS** / **RA-GZRS** |

---

### ✅ **Change Redundancy Setting**

You can set this at **storage account creation**, or change it later (some transitions are allowed):

```bash
az storage account update \
  --name mystorageaccount \
  --resource-group myrg \
  --sku Standard_GRS  # or LRS, ZRS, GZRS, etc.
```

---

| Option  | Total Copies | Scope              |
| ------- | ------------ | ------------------ |
| LRS     | 3            | Single datacenter  |
| ZRS     | 3            | Multi-AZ, 1 region |
| GRS     | 6            | 2 regions          |
| RA-GRS  | 6            | 2 regions + read   |
| GZRS    | 6            | ZRS + geo          |
| RA-GZRS | 6            | ZRS + geo + read   |

---

In **Azure Service Bus**, **"At-most-once" delivery** refers to one of the **delivery guarantees** offered for messages — and it's **crucial** to understand this when designing reliable messaging systems.

---

## 📦 What is **At-most-once Delivery**?

**Definition**:

> A message is **delivered zero or one time**, meaning:

* **No duplicates**, but
* There’s a risk the message **might be lost** if a failure happens before it's processed.

---

## ✅ When Does Azure Service Bus Use "At-most-once"?

You get **at-most-once delivery** when you:

### 🔹 Use **ReceiveAndDelete** mode

```python
receiver = servicebus_client.get_queue_receiver(queue_name="myqueue", receive_mode=ServiceBusReceiveMode.RECEIVE_AND_DELETE)
```

* As soon as the message is delivered to the receiver, it’s **deleted from the queue immediately**.
* If your app crashes or fails before completing processing, the message is **gone**.
* Ideal when **occasional loss is acceptable**, and **processing is fast and reliable**.

---

## 🔄 Comparison of Delivery Modes

| **Delivery Mode** | **Guarantee**             | **Duplicate Risk** | **Message Loss Risk**                 |
| ----------------- | ------------------------- | ------------------ | ------------------------------------- |
| **At-most-once**  | Zero or one delivery      | ❌ No duplicates    | ✅ Possible                            |
| **At-least-once** | One or more deliveries    | ✅ Possible         | ❌ No loss                             |
| **Exactly-once**  | One and only one delivery | ❌ No duplicates    | ❌ No loss *(via deduplication logic)* |

---

## 💡 Key Notes

* **ReceiveAndDelete mode = At-most-once**
* **PeekLock mode = At-least-once** (you must manually complete the message after processing)
* For critical apps, **prefer PeekLock** to avoid losing messages.

---

## 📍 Real-World Use Case for At-most-once

| **Use Case**                         | **Why At-most-once?**                  |
| ------------------------------------ | -------------------------------------- |
| Logging non-critical events          | Small message loss is acceptable       |
| Metrics collection (fire and forget) | You value performance over reliability |
| High-throughput, low-value messages  | Better performance, lower cost         |

---

What container image formats does Azure Container Registry support?  -- Docker images, OCI images, OCI artifacts, Helm charts

---

You have an Azure Container Instance with the DNS label "mycontainer". What is the public Fully-Qualified Domain Name (FQDN) for that instance?  -- mycontainer.(azureregion).azurecontainer.io

---

What type of storage container is specifically used to collect log and metric data from various Azure Resources so that it can be analyzed in Azure Monitor?  -- Log Analytics Workspace

---

Which feature within Azure collects all of the logs from various resources into a central dashboard, where you can run queries, view graphs, and create alerts on certain events?  -- Azure Monitor

---
 
inout mode in Azure Function bindings -- 	Read and modify same resource, used rrely and mostly with table data.

---

Which library allows you to develop and test Azure Functions locally before deploying into Azure? -- Core Tools, cross-platform on Windows, macOS and Linux

---

What is it that makes a caching system like Redis Cache faster than a traditional data store like Azure SQL Database? -- Stores data in memory

---

ChatGPT said:
ARR Affinity in Azure App Service refers to Application Request Routing Affinity, a feature that helps maintain session stickiness (also known as sticky sessions).

---

The lease container component serves as a storage mechanism to manage state across multiple change feed consumers.

---

You have blobs in Azure Blob storage. The blobs store pictures.

You need to record the location and weather condition information from when the pictures were taken. You must ensure you can use up to 2,000 characters when recording the information.

What should you do?

Select only one answer.

Append a suffix to the blob name by using the location and weather. Add a delimiter between them.

Use metadata headers defined with a POST request.

Use metadata headers defined with a PUT request.
This answer is correct.

Create one container for each location. Inside each container, define the blob name as the weather type and a random suffix.

EXPLANATION:

This item tests the candidate's knowledge about structuring data for blob storage.

Metadata is the proper way to define this kind of data, allowing independent modification and supporting up to 8 KB in total size. The HTTP verb to define metadata is a PUT, and this is the correct format to define metadata values. The maximum size of a blob name is 1,024 characters. Also, this is not an optimal approach because metadata can be obtained and set independently, maintaining the same file name. Metadata is the proper way to define this kind of data, allowing independent modification and supporting up to 8 KB in total size. But the HTTP verb to define metadata is a PUT, not POST. The combination of locations and weather types can be potentially unlimited, and container names are limited to 63 characters.

---

You need to implement an Azure Storage lifecycle policy for append blobs.

Which rule action should you use?

Select only one answer.

delete
This answer is correct.

enableAutoTierToHotFromCool

tierToArchive

tierToCool
This answer is incorrect.

Explanation:

This item tests the candidate’s knowledge of configuring Azure Storage lifecycle policy for blobs, which is an essential part of developing solutions for blob storage.

The delete rule action supports both block blobs and append blobs. The enableAutoTierToHotFromCool, tierToArchive, and tierToCool rule actions only supports block blobs.


## 🌡️ Background: Azure Blob Storage Tiers

Azure Blob Storage supports **three access tiers**:

| Tier        | Best for                           | Cost Model                                        |
| ----------- | ---------------------------------- | ------------------------------------------------- |
| **Hot**     | Frequently accessed data           | High storage, low access                          |
| **Cool**    | Infrequently accessed data         | Lower storage, higher access                      |
| **Archive** | Rarely accessed, long-term storage | Very low storage, expensive access (and delayed!) |

---

## 🛠️ Lifecycle Management Rules

Azure allows **automatic tiering** of blobs using **lifecycle management policies**, based on conditions like last modified time or creation time.

Here’s what each setting means:

---

### 🔁 `enableAutoTierToHotFromCool`

* **What it does**:
  Enables **automatic movement from Cool to Hot tier** when the blob becomes **frequently accessed again**.

* **Use Case**:
  You want blobs in Cool tier to **move back to Hot** if users start accessing them often.

* **Type**: **Built-in behavior**, not tied to time-based lifecycle rules.

* **How it works**:
  Azure **monitors access patterns** and upgrades blobs automatically if this flag is enabled.

* **Command or ARM setting**:

  ```json
  "enableAutoTierToHotFromCool": true
  ```

---

### ❄️ `tierToCool`

* **What it does**:
  Moves a blob from **Hot to Cool tier** after it hasn't been accessed for **X days**.

* **Use Case**:
  Helps you save cost by moving less-used data to a cheaper tier.

* **Condition**:
  You can specify `daysAfterModificationGreaterThan` (e.g., 30 days)

* **Example Rule**:

  ```json
  {
    "tierToCool": {
      "daysAfterModificationGreaterThan": 30
    }
  }
  ```

---

### 📦 `tierToArchive`

* **What it does**:
  Moves a blob to **Archive tier** after not being modified for **X days**.

* **Use Case**:
  Ideal for long-term retention of rarely accessed data.

* **Condition**:
  Usually used after data is **in Cool tier for a while**.

* **Example Rule**:

  ```json
  {
    "tierToArchive": {
      "daysAfterModificationGreaterThan": 90
    }
  }
  ```

---

## 🔁 Example Full Lifecycle Rule

```json
{
  "rules": [
    {
      "name": "auto-tiering-rule",
      "enabled": true,
      "definition": {
        "filters": {
          "blobTypes": ["blockBlob"],
          "prefixMatch": ["logs/"]
        },
        "actions": {
          "baseBlob": {
            "tierToCool": {
              "daysAfterModificationGreaterThan": 30
            },
            "tierToArchive": {
              "daysAfterModificationGreaterThan": 90
            }
          }
        }
      }
    }
  ]
}
```

In this example:

* Blobs under the `logs/` folder
* Move to **Cool** if not modified for 30 days
* Move to **Archive** if not modified for 90 days

---

## ✅ Summary Table

| Setting                       | Direction          | Purpose                              |
| ----------------------------- | ------------------ | ------------------------------------ |
| `enableAutoTierToHotFromCool` | Cool ➜ Hot (auto)  | Optimize for rising access frequency |
| `tierToCool`                  | Hot ➜ Cool         | Save costs on infrequently used data |
| `tierToArchive`               | Cool/Hot ➜ Archive | Long-term cold storage               |

---
You need to rehydrate a blob stored in the Archive tier by changing the access tier.

Which destination blob should you use?

Select only one answer.

A blob in the Archive tier in the same region.

A blob in the Archive tier in a different region.

A blob in the Cool tier in a different region.

A blob in the Cool tier in the same region.
This answer is correct.

---

You need to rehydrate a blob stored in the Archive tier by changing the access tier.

Which destination blob should you use?

Select only one answer.

A blob in the Archive tier in the same region.

A blob in the Archive tier in a different region.

A blob in the Cool tier in a different region.

A blob in the Cool tier in the same region.
This answer is correct.

This item tests the candidate’s knowledge of selecting the appropriate consistency level for operations in Azure Cosmos DB. The Consistent Prefix consistency level ensures that updates made as a batch within a transaction are returned consistently with the transaction in which they were committed. Write operations within a transaction of multiple documents are always visible together. The Bounded Staleness consistency level is used to manage the lag of data between any two regions based on an updated version of an item or the time intervals between read and write. The Session consistency level is used to ensure that within a single client session, reads are guaranteed to honor the read-your-writes and write-follows-reads guarantees. The Eventual consistency level is used when no ordering guarantee is required.

---

A company implements an Azure Cosmos DB account named Account1 to store product details.

You need to write a parameterized SQL query to get items from the Products container based on category and price as parameters.

Which SQL query should you write?

Select only one answer.

SELECT * FROM Products p WHERE p.category = @Category AND p.price = @Price
This answer is correct.

SELECT * FROM Account1 a WHERE a.category = @Category AND a.price = @Price

SELECT * FROM Account1.Products p WHERE p.category = @Category AND p.price = @Price

EXPLANATION:

SELECT * FROM Products p WHERE p.category = 'Category' AND p.price = 'Price'
This item tests the candidate’s knowledge of performing operations on containers and items by using the SDK. Azure Cosmos DB supports SQL queries with parameters expressed by the @ notation. When writing SQL queries based on parameters, we need to mention the name of the container in the Azure Cosmos DB account. We do not use [accountname].[containername] or just [accountname] in the SQL query. Including the parameter name in single quotes is not the correct format.


Example Pseudocode:

query = "SELECT * FROM Products p WHERE p.category = @Category AND p.price = @Price"
params = [
    {"name": "@Category", "value": "Electronics"},
    {"name": "@Price", "value": 999.99}
]
items = container.query_items(query=query, parameters=params)

---

A company uses Azure API Management to expose some of its services.

Each developer consuming APIs must use a single key to obtain access to various APIs without requiring approval from the API publisher.

You need to recommend a solution.

Which solution should you recommend?

Select only one answer.

Define a subscription with all APIs scope.

Define a subscription with product scope.
This answer is correct.

Restrict access based on caller IPs.
This answer is incorrect.

Restrict APIs based on client certificate.

Explantion:

This item tests the candidate's knowledge of Azure API Management subscriptions.

When creating a product, several APIs can be added to the product and a subscription can be associated with it. Access should not be granted to all APIs. Developer access should be granted regardless of the caller IP. A client certificate would require a policy to validate the certificate and specific logic to map the client to specific APIs.

---

You create an Azure Service Bus topic with a default message time to live of 10 minutes.

You need to send messages to this topic with a time to live of 15 minutes. The solution must not affect other applications that are using the topic.

What should you recommend?

Select only one answer.

Change the topic’s default time to live to 15 minutes.

Change the specific message’s time to live to 15 minutes.
This answer is incorrect.

Create a new topic with a default time to live of 15 minutes. Send the messages to this topic.
This answer is correct.

Update the time to live for the queue containing the topic.

Explanation:

This question tests the candidate's knowledge of Azure Service Bus message expiration.

To avoid affecting existing applications, the time to live of the existing topic must not be changed. A new topic needs to be created. Changing the topic's default time to live will affect other applications. A message-level time to live cannot be higher than the topic's time to live. To avoid affecting existing applications, the time to live of the existing topic or queue must not be changed.

---

You have an Azure Service Bus queue.

You need to ensure a publisher can send messages into a topic and multiple subscribers can become eligible to consume the messages.

Which message routing pattern should you use?

Select only one answer.

simple request/reply

multicast request/reply
This answer is correct.

multiplexing

multiplexed request/reply
This answer is incorrect.

Explanation:

This item tests the candidate’s knowledge of message routing in Azure Service Bus, which is part of developing message-based solutions.

A publisher can send a message into a topic and multiple subscribers can become eligible to consume the message. A publisher can send a message into a queue and expect a reply from the message consumer, but multiple subscribers cannot consume the message. This session feature enables multiplexing of streams of related messages through a single queue but cannot be consumed by multiple subscribers. This session feature enables multiplexed replies, allowing several publishers to share a reply queue, but a message cannot be consumed by multiple subscribers.

---

You have an application that requires message queuing.

You need to recommend a solution that meets the following requirements:

automatic duplicate message detection.
ability to send 2 MB messages.
Which message queuing solution should you recommend?

Select only one answer.

Azure Service Bus Premium tier
This answer is correct.

Azure Service Bus Standard tier

Azure Storage queues with locally redundant storage (LRS)

Azure Storage queues with zone-redundant storage (ZRS)
This item tests the candidate's knowledge of Azure Service Bus.

Explanation: 

Service Bus detects duplicate messages. The Premium tier is required to send messages larger than 256 KB. Although Service Bus detects duplicate messages, the Standard tier only supports messages that are up to 256 KB in size. Azure Storage queues do not support duplicate message detection. Azure Storage queues do not support duplicate message detection.

---

A company is using Azure API Management to expose their APIs to external partners. The company wants to ensure that the APIs are accessible only to users authenticated with OAuth 2.0, and that usage quotas are enforced to prevent abuse.

You need to configure the API Management instance to meet the security and usage requirements.

Which two actions should you perform?

Select all answers that apply.

Configure a validate-jwt policy to authenticate incoming requests.
This answer is correct.

Deploy an Azure Application Gateway in front of the API Management instance.

Implement IP filtering by defining access restriction policies.

Set up a rate limit by key policy to enforce call quotas.
This answer is correct.

Explanation:

Configuring a validate-jwt policy is necessary to authenticate users with OAuth 2.0. Setting up a rate limit by key policy helps enforce usage quotas. IP filtering does not address the authentication and quota requirements. Deploying an Azure Application Gateway is not required for these specific needs.

---

