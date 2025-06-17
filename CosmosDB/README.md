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