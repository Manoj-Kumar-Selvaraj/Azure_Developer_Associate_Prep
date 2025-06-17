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
