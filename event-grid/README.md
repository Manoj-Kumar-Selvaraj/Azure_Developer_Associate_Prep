
---

## ✅ **1. What is Azure Event Grid?**

> Azure Event Grid is a **fully managed event routing service** that enables you to build **event-based** (pub/sub) applications.

* **Event producers** → send events
* **Event Grid** → routes events
* **Event handlers/subscribers** → respond to events

Think of it as:
📤 Producer → 🚏 Event Grid → 📥 Subscriber

---

## ✅ **2. Event Grid Core Concepts**

| Term                   | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Event**              | A lightweight notification that something happened (e.g., blob created)        |
| **Event Source**       | Where the event originated (e.g., Blob Storage, Resource Group)                |
| **Event Handler**      | Who receives the event (e.g., Azure Function, Logic App, Webhook, Service Bus) |
| **Event Subscription** | A route between source and handler                                             |
| **Topic**              | A channel to publish custom events (used in custom scenarios)                  |

---

## ✅ **3. Built-in vs Custom Topics**

| Type               | Description                                           |
| ------------------ | ----------------------------------------------------- |
| **System Topics**  | For Azure services (Blob, Resource Group, etc)        |
| **Custom Topics**  | For your own apps to publish custom events            |
| **Partner Topics** | From third-party services (e.g., Auth0, GitHub, etc.) |

> ❗ You **cannot create system topics manually** — Azure creates them when events are enabled on services.

---

## ✅ **4. Event Schema**

Event Grid events follow a **specific schema**:

```json
{
  "id": "string",
  "eventType": "Microsoft.Storage.BlobCreated",
  "subject": "/blobServices/default/containers/testcontainer/blobs/file.txt",
  "eventTime": "2021-01-01T00:00:00Z",
  "data": {
    "url": "https://.../file.txt"
  },
  "dataVersion": "1.0"
}
```

📌 `eventType` and `subject` are commonly filtered on in subscriptions.

---

## ✅ **5. Supported Event Handlers (Subscribers)**

| Handler Type      | Notes                                 |
| ----------------- | ------------------------------------- |
| Azure Functions   | Most common use case                  |
| Logic Apps        | Low-code workflows                    |
| Webhooks          | Must be reachable and return HTTP 2xx |
| Azure Event Hubs  | For large scale analytics             |
| Azure Service Bus | For queue/topic-based decoupling      |
| Storage Queue     | Simple message queue                  |

---

## ✅ **6. Event Filtering**

You can apply filters **to route only specific events**.

| Filter Type          | Example                                               |
| -------------------- | ----------------------------------------------------- |
| **Prefix/Suffix**    | Only process `.jpg` or blobs starting with `/images/` |
| **Subject Filters**  | Match specific container names or event paths         |
| **Advanced Filters** | Filter on data like size, eventType, custom metadata  |

---

## ✅ **7. Event Delivery & Retry**

* **Push model**: Event Grid pushes events to the subscriber.
* **Retries with exponential backoff** if subscriber fails (up to 24 hours).
* Supports **dead-lettering** for failed events.

---

## ✅ **8. Use Cases**

* Send notification when a new blob is created.
* Trigger an Azure Function when a resource group changes.
* Integrate third-party apps via Webhooks.

---

## 🧠 AZ-204 Exam Cheat Sheet

| Scenario                                  | Key Point                              |
| ----------------------------------------- | -------------------------------------- |
| Reacting to blob creation                 | Use **System Topic** with Blob Storage |
| Want to filter only `.jpg` files          | Use **subject suffix filter**          |
| Custom app emits events                   | Use **Custom Topics**                  |
| Retry failed event deliveries             | ✅ Yes, with **24-hour retry**          |
| Multiple handlers for same event          | ✅ Yes, Event Grid supports fan-out     |
| Third-party event producer (e.g., GitHub) | Use **Partner Topic**                  |

---

## ✅ Bonus: Creating Event Grid Subscriptions via CLI

**System Topic Example:**

```bash
az eventgrid event-subscription create \
  --name mySub \
  --source-resource-id /subscriptions/xxx/resourceGroups/rg/providers/Microsoft.Storage/storageAccounts/myblob \
  --endpoint https://myfunction.azurewebsites.net/api/handler
```

**Custom Topic Example:**

```bash
az eventgrid topic create --name mytopic --resource-group myrg --location eastus
az eventgrid event-subscription create \
  --name mySub \
  --topic-name mytopic \
  --resource-group myrg \
  --endpoint https://mywebhook/handler
```

---

### ✅ Correct Answers and Explanations

| Q# | Your Ans | Correct | Explanation                                                                                                                                                                                                             |
| -- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | b        | ✅ c     | **Correct Answer: c** – Event Grid System Topic is created automatically for Blob Storage and you can connect it to an Azure Function. Option b is invalid since Event Hub is for telemetry pipelines, not blob events. |
| 2  | ✅ b      | ✅ b     | **Correct Answer: b** – Use **Subject Suffix Filter** like `.png` to receive only `.png` blob events.                                                                                                                   |
| 3  | ✅ d      | ✅ d     | **Correct Answer: d** – Azure API Management **cannot** be a direct Event Grid subscriber.                                                                                                                              |
| 4  | ✅ b      | ✅ b     | **Correct Answer: b** – Event Grid retries for **24 hours** with **exponential backoff** if event delivery fails.                                                                                                       |
| 5  | ✅ c      | ✅ c     | **Correct Answer: c** – You must create a **Custom Topic** and **publish events** using your code/app.                                                                                                                  |
| 6  | ✅ c      | ✅ c     | **Correct Answer: c** – Use **dead-letter destination** (Storage Blob) to capture failed deliveries.                                                                                                                    |
| 7  | ✅ c      | ✅ c     | **Correct Answer: c** – You can create **multiple Event Subscriptions** for fan-out (1 event to many handlers).                                                                                                         |
| 8  | ❌ d      | ❌ a     | **Correct Answer: a** – Event Grid uses **CloudEvents v1.0 schema** by default.                                                                                                                                         |
| 9  | ✅ c      | ✅ c     | **Correct Answer: c** – Custom topics are used to **define your own schema** and send events from **your apps**.                                                                                                        |
| 10 | ✅ b      | ✅ b     | **Correct Answer: b** – To match specific container paths like `/images/`, use **subject filter**.                                                                                                                      |

---

### 🧾 Score: **9 out of 10** 🎯

Excellent! Just missed Q8 (CloudEvents schema).

---

### 🧠 Cheat Sheet: Memorize Event Grid Fast

| Feature            | Key Point                                                      |
| ------------------ | -------------------------------------------------------------- |
| **Event Sources**  | System Topics (Azure services), Custom Topics (your apps)      |
| **Handlers**       | Azure Function, Logic App, Webhook, Event Hub, Service Bus     |
| **Schema**         | Default: CloudEvents v1.0                                      |
| **Fan-out**        | Supported via multiple event subscriptions                     |
| **Filtering**      | Subject prefix/suffix, Event Type, Advanced Filters            |
| **Retry Policy**   | 24 hours with exponential backoff                              |
| **Dead Lettering** | Store failed events in Blob Storage                            |
| **Custom Topics**  | Define your own events and publish from app via HTTP POST      |
| **Security**       | Use SAS token for webhook, managed identity for other services |

---