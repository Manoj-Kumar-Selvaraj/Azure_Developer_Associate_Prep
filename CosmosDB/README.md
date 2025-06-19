---

## ✅ **PHASE 1: INTRO TO COSMOS DB – MASTER THE BASICS**

---

### 🔹 What is Azure Cosmos DB?

Azure Cosmos DB is a **NoSQL database** from Microsoft that is:

* **Globally distributed** (you can replicate data across regions)
* **Fully managed** (you don’t manage servers)
* **Multi-model** (supports document, key-value, graph, and column-family data)
* **Low-latency** (millisecond-level response times)

👉 Think of it like a **modern, cloud-native alternative to MongoDB or Firebase Firestore**, but backed by Azure.

---

### 🔹 Why use Cosmos DB?

| Feature                    | Benefit                                             |
| -------------------------- | --------------------------------------------------- |
| 🚀 **Global distribution** | Run your database close to users worldwide          |
| ⚖️ **Scalability**         | Automatically scale throughput (RUs)                |
| 💥 **Multi-model support** | Use SQL-like, MongoDB, Gremlin, Cassandra, or Table |
| ⏱ **Low latency**          | <10 ms read/write latency (99th percentile)         |
| 🛡 **Guaranteed SLAs**     | 99.999% availability, consistency, throughput       |

---

### 🔹 Core Terminology You MUST Know

| Term                  | Description                         | Real-World Example                  |
| --------------------- | ----------------------------------- | ----------------------------------- |
| **Account**           | Entry point for Cosmos DB in Azure  | Like your Cosmos DB "cloud gateway" |
| **Database**          | Logical container for data          | Like a folder                       |
| **Container**         | Stores JSON documents               | Like a NoSQL table                  |
| **Item (Document)**   | Actual JSON data                    | Like a row                          |
| **Partition Key**     | Field used to distribute data       | `"region": "India"`                 |
| **Request Unit (RU)** | Measures performance/capacity       | Like cost per request               |
| **Consistency Level** | Tradeoff between speed vs. accuracy | Strong, Eventual, Session, etc.     |

---

### 🧠 How Cosmos DB Differs from SQL (Relational DB)

| Feature        | Cosmos DB                        | Traditional RDBMS |
| -------------- | -------------------------------- | ----------------- |
| Schema         | **Schema-less**                  | Fixed schema      |
| Data           | JSON documents                   | Tables/rows       |
| Query          | SQL-like, but NoSQL              | Full SQL          |
| Scaling        | Horizontally (partitioning)      | Mostly vertical   |
| Indexing       | Automatic                        | Manual/Partial    |
| Global Support | Native                           | Needs setup       |
| Use Case       | Web apps, IoT, mobile, analytics | ERP, banking apps |

---

### 🔹 Supported APIs (Choose Based on Use Case)

| API               | Description                        | When to Use                                |
| ----------------- | ---------------------------------- | ------------------------------------------ |
| ✅ **Core (SQL)**  | JSON + SQL-like query language     | General purpose (what we will learn first) |
| **MongoDB API**   | Behaves like MongoDB               | You want Mongo queries but on Azure        |
| **Gremlin API**   | Graph-based queries                | Social networks, relationships             |
| **Cassandra API** | Column-family NoSQL                | Analytics, time-series                     |
| **Table API**     | Key-value like Azure Table Storage | Simple key-value workloads                 |

We’ll **focus on Core (SQL)** API, as it's:

* Best for beginners
* Exam-relevant (AZ-204, DP-420)
* Most flexible and powerful

---


## ✅ PHASE 3: Querying JSON Data in Cosmos DB (Core SQL API)

---

### 🧠 Quick Recap: Cosmos DB Query Language

* Cosmos DB uses **SQL-like syntax** to query **JSON documents**.
* The structure is similar to SQL, but it's designed for **document-based data**, not relational tables.
* You write queries like:

```sql
SELECT * FROM c WHERE c.city = 'Chennai'
```

Here, `c` is just an **alias** for each document in the container.

---

### 🔹 1. Basic SELECT Queries

#### Select all documents:

```sql
SELECT * FROM c
```

#### Select specific fields:

```sql
SELECT c.name, c.city FROM c
```

#### Use WHERE clause:

```sql
SELECT * FROM c WHERE c.age > 30
```

#### Combine conditions:

```sql
SELECT * FROM c 
WHERE c.city = 'Chennai' AND c.age >= 30
```

---

### 🔹 2. Filtering with Functions

#### `IS_DEFINED()` — check if a field exists:

```sql
SELECT * FROM c WHERE IS_DEFINED(c.hobby)
```

#### `STARTSWITH()` — string match:

```sql
SELECT * FROM c WHERE STARTSWITH(c.name, 'M')
```

#### `CONTAINS()` — partial match:

```sql
SELECT * FROM c WHERE CONTAINS(c.city, 'nai')
```

---

### 🔹 3. Sorting & Pagination

#### ORDER BY:

```sql
SELECT * FROM c ORDER BY c.age DESC
```

#### LIMIT results:

```sql
SELECT TOP 2 * FROM c
```

> ⚠️ Cosmos DB doesn't use `LIMIT` — use `TOP` instead.

---

### 🔹 4. Aggregation

#### COUNT:

```sql
SELECT VALUE COUNT(1) FROM c
```

#### AVG:

```sql
SELECT VALUE AVG(c.age) FROM c
```

> ✅ `VALUE` is used to return a **scalar** (single value) instead of an object.

---

### 🔹 5. Querying Arrays

Let’s say this document is stored:

```json
{
  "id": "10",
  "name": "Vijay",
  "skills": ["Azure", "Python", "SQL"]
}
```

#### Check if "Python" exists in skills:

```sql
SELECT * FROM c WHERE ARRAY_CONTAINS(c.skills, 'Python')
```

---

### 🔹 6. Querying Nested JSON

Suppose this document exists:

```json
{
  "id": "20",
  "name": "Neha",
  "address": {
    "city": "Bangalore",
    "pincode": 560001
  }
}
```

#### Query nested field:

```sql
SELECT c.name, c.address.city FROM c WHERE c.address.city = 'Bangalore'
```

---

### 🔹 7. JOIN (Self-Join on Arrays)

Let’s say you have:

```json
{
  "id": "30",
  "name": "Deepak",
  "projects": [
    { "title": "Migration", "status": "Completed" },
    { "title": "Security", "status": "In Progress" }
  ]
}
```

#### Flatten the array:

```sql
SELECT c.name, p.title, p.status 
FROM c JOIN p IN c.projects
```

This joins each array item with the parent document.

---

### 🧪 Practice Questions (Try in Portal)

1. Select all people from Chennai over age 25

   ```sql
   SELECT * FROM c WHERE c.city = 'Chennai' AND c.age > 25
   ```

2. Count how many documents have a "hobby" field

   ```sql
   SELECT VALUE COUNT(1) FROM c WHERE IS_DEFINED(c.hobby)
   ```

3. Get name of people whose name starts with "D"

   ```sql
   SELECT c.name FROM c WHERE STARTSWITH(c.name, 'D')
   ```

4. List names of people who know "Azure"

   ```sql
   SELECT c.name FROM c WHERE ARRAY_CONTAINS(c.skills, 'Azure')
   ```

---

### ✅ Summary of Phase 3

| ✅ You Now Know                           |
| ---------------------------------------- |
| How to write Cosmos DB SQL queries       |
| How to filter, sort, and aggregate data  |
| How to query arrays and nested documents |
| How to flatten arrays using JOIN         |
| Real-world querying techniques for NoSQL |

---

### 📌 Bonus: Tip for AZ-204 Exam

* Cosmos DB **doesn't support full JOINs across containers**, only **within a document**
* **Use `VALUE`** when you want a scalar (like `COUNT`, `AVG`, etc.)

---

## ✅ PHASE 4: Partitioning & Scaling in Cosmos DB

---

### 🔹 What is Partitioning?

Partitioning allows Cosmos DB to **scale horizontally** by distributing data across multiple **physical partitions**.

> Think of it like splitting a large warehouse into small rooms, each holding a part of your data.

---

### 🔹 Key Concepts

| Term                   | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| **Logical Partition**  | All documents that share the same partition key value                |
| **Physical Partition** | Internal storage unit managed by Cosmos DB                           |
| **Partition Key**      | The field you choose (like `/city` or `/userId`) to divide your data |
| **Partition Range**    | Cosmos DB routes requests based on this key                          |

---

### 📌 Why Partition Key Matters

Your **partition key** affects:

* Performance ⚡️
* Cost 💰
* Scalability ⬆️
* Query speed 🔍

---

### 🔍 Example

#### Example 1: Good Partitioning

```json
{
  "id": "1",
  "city": "Chennai",
  "name": "Manoj"
}
```

Partition key: `/city`

✅ If you have users from 100 cities → data gets distributed.

#### Example 2: Bad Partitioning

```json
{
  "id": "1",
  "type": "fixed"
}
```

Partition key: `/type` (only 1–2 values)

❌ All data goes to one partition → **hot partition**, poor performance.

---

### 📏 How to Choose a Good Partition Key

| Good Key                 | Bad Key                                |
| ------------------------ | -------------------------------------- |
| `/userId`, `/customerId` | `/country` (if all data is from India) |
| `/deviceId`              | `/status` (only "open", "closed")      |
| `/orderId`               | `/type` (only a few values)            |

✅ Choose a field that:

* Has high **cardinality** (many unique values)
* Is **used in queries**
* **Balances** data evenly

---

### 🔹 What are Request Units (RUs)?

Every operation (read, write, query) in Cosmos DB **consumes RUs**.

| Operation                  | Avg RU      |
| -------------------------- | ----------- |
| Read a 1 KB item           | \~1 RU      |
| Write a 1 KB item          | \~5 RUs     |
| Complex query with filters | 10–100+ RUs |

> 💡 RU is like **money** in Cosmos DB — you “spend” it per operation.

---

### ⚖️ Throughput Modes

| Mode                       | Description                                       |
| -------------------------- | ------------------------------------------------- |
| **Provisioned throughput** | You specify RU/s (e.g., 400 RU/s)                 |
| **Autoscale**              | Scales between 10–100× of base RU/s automatically |

#### Example:

* You set Autoscale with max = 1000 RU/s
* Cosmos auto-scales between 100–1000 RU/s depending on usage

---

### ⚠️ RU Troubleshooting Tips

| Problem                    | Fix                                  |
| -------------------------- | ------------------------------------ |
| High RU consumption        | Check large documents, use filters   |
| Query scans all partitions | Always filter by **partition key**   |
| RU spikes during peak      | Use **autoscale mode**               |
| “429 Too Many Requests”    | Increase RU/s or reduce request rate |

---

### 🔧 Monitoring RU Usage

Go to your Cosmos DB account > **Insights** > **Requests and Capacity**:

* Monitor **Consumed RU/s**
* View throttling (429 errors)
* Set **alerts** if needed

---

### ✅ Summary of Phase 4

| ✅ You Now Understand                       |
| ------------------------------------------ |
| What partitioning is and why it’s critical |
| How to choose a proper partition key       |
| What RU/s are and how they impact cost     |
| How to scale manually or using autoscale   |
| How to fix high RU or hot partition issues |

---

### 💡 Best Practice Cheatsheet

| Task                 | Tip                                                 |
| -------------------- | --------------------------------------------------- |
| Design partition key | Use high-cardinality field, avoid skew              |
| Optimize queries     | Always use partition key in WHERE clause            |
| Control cost         | Monitor RU/s, use autoscale, minimize large queries |
| Avoid hot partitions | Don't use keys with few values (e.g., `status`)     |

---

Excellent, Manoj 👨‍💻 — let’s begin **2.1.1: Perform operations using SDK in Azure Cosmos DB** — very exam-relevant and practical.

---

## ✅ 2.1.1 – **Perform Operations on Containers and Items Using SDK**

### 📌 Goal:

Understand how to **interact with Cosmos DB** using the **official SDKs** (mostly Python, .NET, JavaScript) to create databases, containers, and perform CRUD operations on items.

---

### 🚀 What You Should Know

#### 🔹 Cosmos DB Structure Hierarchy:

* **Account** → **Database** → **Container** → **Item**
* Partition key is **critical** for performance and scalability.

---

### 💻 Key SDK Operations (Python/Node/.NET-like for exam)

#### ✅ Create Database

```python
database = client.create_database_if_not_exists(id="ProductDB")
```

#### ✅ Create Container

```python
container = database.create_container_if_not_exists(
    id="Products",
    partition_key=PartitionKey(path="/category")
)
```

#### ✅ Insert (Create) Item

```python
container.create_item({
    "id": "item1",
    "name": "iPhone",
    "category": "electronics"
})
```

#### ✅ Read Item

```python
item = container.read_item(item="item1", partition_key="electronics")
```

#### ✅ Replace Item (Update)

```python
item["price"] = 1000
container.replace_item(item=item, body=item)
```

#### ✅ Delete Item

```python
container.delete_item(item="item1", partition_key="electronics")
```

---

### ⚠️ Exam-Worthy Concepts

| Concept                                     | Tip                                                 |
| ------------------------------------------- | --------------------------------------------------- |
| **Partition key**                           | Mandatory when reading, updating, deleting          |
| **Upsert**                                  | Combines create & update: `container.upsert_item()` |
| **Throughput**                              | Can be provisioned at DB or Container level         |
| **Item ID must be unique within partition** | Yes                                                 |
| **Consistency**                             | Defined at account or request level                 |

---

### 🧪 Real-World Scenario Exam Tip:

> You want to update an item, but it fails because you didn’t provide the partition key.
> ✅ This is a **common trap in exam** – Cosmos DB always needs the partition key to identify an item.

---

### 🤯 Bonus Edge:

* You can use **LINQ** in .NET or **SQL-style queries** in SDK:

```python
items = list(container.query_items(
    query="SELECT * FROM c WHERE c.category='electronics'",
    enable_cross_partition_query=True
))
```

---

let’s break it down **visually and practically** to truly understand **Cosmos DB consistency levels (2.1.2)**.

---

## 🚀 What Is Consistency in Cosmos DB?

When you write data to Cosmos DB and **read it back**, do you want:

* The **latest update immediately**?
* Or is it okay if it's a **slightly older version**, but faster?

This is **Consistency**: the **accuracy of data when read** from different places.

---

## 🔁 Imagine a Scenario

You have a **global Cosmos DB**:

* 📝 User writes in **India**
* 📖 User reads in **US**

> **Question**: Should the US user **wait until India finishes writing**?
> Or is it okay to show them a **slightly old value**?

---

## 🧪 5 Levels of Consistency — with Real-Life Examples

| Consistency Level     | Think of It Like...      | What It Means                                                        |
| --------------------- | ------------------------ | -------------------------------------------------------------------- |
| **Strong**            | Google Docs live editing | All users see the **latest data instantly** everywhere.              |
| **Bounded Staleness** | Email delay: 5 min max   | Users may see data that’s **only 5 mins/100 ops old**.               |
| **Session**           | Your browser cache       | **You always see your own latest changes**, even if others don’t.    |
| **Consistent Prefix** | YouTube video buffering  | You may see **older data**, but it's in **correct order**.           |
| **Eventual**          | Gossip or WhatsApp group | Everyone will see the update **eventually**, but no order guarantee. |

---

## 🔥 Summary Table (Just Memorize This!)

| Level                 | See Latest? | Order? | Fastest?  | Cost?       |
| --------------------- | ----------- | ------ | --------- | ----------- |
| **Strong**            | ✅ Always    | ✅ Yes  | ❌ Slowest | 💰 Highest  |
| **Bounded Staleness** | ⚠️ Mostly   | ✅ Yes  | ❌ Slower  | 💰 High     |
| **Session**           | ✅ For self  | ✅ Yes  | ✅ Fast    | ✅ Efficient |
| **Consistent Prefix** | ❌ No        | ✅ Yes  | ✅ Fast    | ✅ Efficient |
| **Eventual**          | ❌ No        | ❌ No   | ✅ Fastest | ✅ Cheapest  |

---

## 💡 Which One to Use When?

| Use Case                      | Use Level             |
| ----------------------------- | --------------------- |
| Banking App / Inventory       | **Strong**            |
| Shopping Cart / Profile Data  | **Session**           |
| Order History / Logs          | **Consistent Prefix** |
| IoT Telemetry / Social Feeds  | **Eventual**          |
| Tolerant to 5min/100ops delay | **Bounded Staleness** |

---

## 🧠 For the Exam — Tips to Remember

1. **Strong**: Most consistent, least performant (use only when required).
2. **Eventual**: Least consistent, best performance (good for telemetry).
3. **Session**: Most used in real-world apps — good balance.
4. **Prefix vs Eventual**: Prefix = correct order, Eventual = no order.
5. **Bounded** = "almost strong" with guaranteed lag (e.g., 5 mins).

---

## ✅ 2.1.3 – **Implement Change Feed** in Azure Cosmos DB

---

### 🔹 What Is Change Feed?

> **Change Feed** in Cosmos DB is like a **stream of changes** (inserts & updates) happening to your data — in the order they occurred.

It's like having a **CCTV log** of everything that changed in your database.

---

### 💡 Key Concepts

| Feature            | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| **What it tracks** | **Insert** and **Update** operations (not deletes).                                |
| **Order**          | Guaranteed order by **partition key**.                                             |
| **Read model**     | You read changes like a **queue** using SDK or Azure Functions.                    |
| **Retention**      | Infinite retention (by default) with newer SDKs.                                   |
| **Scale**          | Automatically scales with your container.                                          |
| **Offset**         | Supports **resuming** from last read using a continuation token (for checkpoints). |
| **Query Type**     | Cannot use SQL queries; you must consume changes using **pull or push** models.    |

---

### ✅ Common Use Cases

| Use Case                 | Why Change Feed?                        |
| ------------------------ | --------------------------------------- |
| Real-time analytics      | Track live order data or events         |
| Auditing & compliance    | Keep track of all updates               |
| Sync with another system | Automatically forward changes           |
| Materialized views       | Update summary or reporting collections |

---

### 🔁 Two Ways to Use Change Feed

| Method         | Description                               | Example                           |
| -------------- | ----------------------------------------- | --------------------------------- |
| **Pull Model** | You manually read from the feed using SDK | Python, .NET SDK polling          |
| **Push Model** | Azure Functions auto-triggered by changes | Cosmos DB trigger in Function App |

---

### 📘 Code Example (Python SDK – Pull)

```python
container = database.get_container_client("orders")
for change in container.read_change_feed():
    print(change)
```

---

### ⚠️ Exam Tips

| Concept              | Exam Trick                                      |
| -------------------- | ----------------------------------------------- |
| Deletes?             | ❌ Not captured by Change Feed                   |
| Updates?             | ✅ Yes (treated as insert + update)              |
| Partition key?       | ✅ Order preserved **within** partition key only |
| Time-window queries? | ❌ Not supported – reads are sequential          |
| Resume reading?      | ✅ Yes using checkpoint token (lease container)  |

---

### 💡 Real-World Example

> You're building a fraud detection system that needs to **react to new financial transactions in real time**.
> Change Feed can trigger alerts, or feed events into a pipeline instantly.

---

Excellent attempt, Manoj! Let's go through each answer with **detailed explanations** and follow it up with a **🔥Change Feed Master Cheat Sheet**.

---

### ✅ **Results & Detailed Explanations**

| Q  | Your Answer | ✅ / ❌ | Correct Answer                                          | Explanation                                                                                                          |
| -- | ----------- | ----- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1  | **a**       | ✅     | a) Insert and Update only                               | Cosmos DB Change Feed captures only inserts and updates (not deletes). Deletes are **not** included.                 |
| 2  | **c**       | ✅     | c) Use Cosmos DB Change Feed trigger in Azure Functions | This is the most efficient **push model**. You get real-time processing without polling.                             |
| 3  | **c**       | ✅     | c) Order is guaranteed by partition key                 | Change Feed guarantees **per-partition key ordering** only. Globally, order is not guaranteed.                       |
| 4  | **b**       | ✅     | b) `read_change_feed()`                                 | In the **Python SDK**, this is the method used to pull changes manually.                                             |
| 5  | **a**       | ❌     | **b**) Use checkpoints or lease containers              | While idempotent writes help, you **must** store checkpoints (using lease containers) to **resume** after a failure. |
| 6  | **d**       | ✅     | d) Indefinite                                           | In newer SDKs and Azure portal, **infinite retention** is the default unless explicitly configured otherwise.        |
| 7  | **c**       | ✅     | c) Deletion tracking                                    | Change Feed **does not** capture deletes. You’ll need soft deletes or other workarounds.                             |
| 8  | **d**       | ✅     | d) Azure Functions with Lease Containers                | Azure Functions + Lease containers enable **horizontal scaling** and coordinated change processing.                  |
| 9  | **b**       | ❌     | **c**) Change Feed                                      | Materialized views are maintained by consuming changes (insert/update) via **Change Feed**, not stored procedures.   |
| 10 | **d**       | ✅     | d) It guarantees processing only once                   | **False** — Change Feed can result in **at-least-once delivery**, so idempotent logic is needed.                     |

---

### 🎯 **Final Score: 8 / 10**

Very strong performance — just missed two nuanced areas:

* Checkpointing with lease containers
* Change Feed vs stored procedures for materialized views

---

## 🧠 Change Feed – Master Cheat Sheet

| 🔑 Concept                   | 🧩 Details                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| **Tracks**                   | Insert + Update operations (❌ no deletes)                                           |
| **Ordering**                 | Guaranteed **within partition key** only                                            |
| **Models**                   | Pull (SDKs), Push (Azure Functions)                                                 |
| **Retention**                | **Indefinite** (latest SDKs)                                                        |
| **Resume after failure**     | Use **checkpoints** with **lease containers**                                       |
| **Scaling**                  | Azure Functions + Lease container supports auto-scaling                             |
| **Best use cases**           | Real-time dashboards, audit logs, syncing to other systems, event-driven processing |
| **Azure Functions Trigger**  | `CosmosDBTrigger` — automatically reacts to DB changes                              |
| **SDK Pull Method (Python)** | `container.read_change_feed()`                                                      |
| **Not suitable for**         | Delete tracking, queries on feed, time-window queries                               |
| **At-least-once delivery**   | Must write **idempotent processing logic**                                          |

---