---

## 🧩 FULL GUIDE: **Microsoft Graph API for User Data Access**

---

### 🟦 **1. What is Microsoft Graph?**

> Microsoft Graph is a **unified REST API** that lets apps access **Microsoft 365 services**, especially **Microsoft Entra ID (Azure AD)**.

* **Base URL:**

  ```
  https://graph.microsoft.com
  ```

* **Main purpose:**
  Interact with **users, groups, devices, mail, calendar, OneDrive**, etc.

---

### 🟩 **2. Key Use Cases (Focused on User Data)**

| Task                          | Endpoint                                |
| ----------------------------- | --------------------------------------- |
| Get current user profile      | `GET /me`                               |
| Get another user (admin only) | `GET /users/{user-id}`                  |
| Get signed-in user’s photo    | `GET /me/photo/$value`                  |
| Get user’s group membership   | `GET /me/memberOf`                      |
| Get user email messages       | `GET /me/messages`                      |
| Get list of all users         | `GET /users` *(application permission)* |

---

### 🟨 **3. Types of Permissions**

There are two types of permissions you assign to your app in Microsoft Entra:

| Type            | App Acts As          | Used When                    | Example Scenario                       |
| --------------- | -------------------- | ---------------------------- | -------------------------------------- |
| **Delegated**   | A **signed-in user** | Interactive apps             | Web app fetching **current user info** |
| **Application** | The **app itself**   | Background services, daemons | Scheduled app pulling **all users**    |

✅ For signed-in user data (`/me`), use **delegated**
✅ For pulling data about **all users**, use **application**

---

### 🛡️ **4. Permissions Examples**

| Microsoft Graph Permission | Type      | What It Allows                               |
| -------------------------- | --------- | -------------------------------------------- |
| `User.Read`                | Delegated | Read **signed-in** user’s profile            |
| `User.ReadBasic.All`       | Both      | Read basic profile of all users in directory |
| `User.Read.All`            | Both      | Read full profile of all users               |
| `GroupMember.Read.All`     | Both      | Read all group memberships                   |
| `Mail.Read`                | Delegated | Read user’s email                            |

---

### 🟧 **5. Authentication: How the App Gets a Token**

To call Graph, your app must **authenticate with Microsoft Entra ID** and get an **access token**.

🔐 Basic Flow:

1. User logs into app
2. App sends login to Entra ID
3. Entra ID returns a **JWT access token**
4. App adds `Authorization: Bearer <token>` header when calling Graph

---

### 🛠️ **6. Try it Without Coding – Graph Explorer**

You can test any Graph API here:

🌐 **[Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)**

Login with your Microsoft account and try:

```http
GET https://graph.microsoft.com/v1.0/me
```

---

### 🟪 **7. App Registration Steps (Portal)**

To use Graph in your app:

1. Go to **Microsoft Entra ID > App registrations**
2. Click **New registration**
3. Set redirect URI if web app
4. After registration:

   * Go to **API Permissions**
   * Click **+ Add a permission**
   * Choose **Microsoft Graph**
   * Add permissions (like `User.Read`, `Mail.Read`, etc.)
5. If app uses application permissions, click **“Grant admin consent”**

---

### 🟫 **8. Making the API Call**

**Example with `curl`:**

```bash
curl -H "Authorization: Bearer <access_token>" \
     https://graph.microsoft.com/v1.0/me
```

---

### 🟨 **9. Important Scenarios for Exams and Real Life**

| Scenario                                 | Required Setup                     |
| ---------------------------------------- | ---------------------------------- |
| Web app shows current user's profile     | Delegated + `User.Read`            |
| Background app reads all users in tenant | Application + `User.Read.All`      |
| App lists user's groups in portal        | Delegated + `GroupMember.Read.All` |
| Send email as user                       | Delegated + `Mail.Send`            |
| Get calendar events                      | Delegated + `Calendars.Read`       |

---

### 🧩 10. Common Pitfalls to Watch Out For

| Mistake                                 | Fix                                                 |
| --------------------------------------- | --------------------------------------------------- |
| Using `/me` with application permission | `/me` only works with **delegated** permissions     |
| Not granting admin consent              | App won't get access to directory-wide data         |
| Missing required scope in token         | Graph returns `403 Forbidden`                       |
| Confusing app roles with Graph roles    | App roles are for **your app**, not Microsoft Graph |

---

## ✅ TL;DR – You Should Now Understand:

* ✅ What Microsoft Graph is
* ✅ When to use it
* ✅ How to authenticate and call it
* ✅ When to use delegated vs. application permissions
* ✅ Common endpoints for signed-in user info

---

## 🧩 FULL GUIDE: **Azure APIM Policy Structure & Usage**

---

### 🧱 1. **What is a Policy in APIM?**

> A **policy** is a declarative XML-based instruction set that lets you control:

* Request and response behavior
* Authentication & authorization
* Routing & transformations
* Error handling, throttling, caching, and more

You can apply policies:

* At **Product** level
* At **API** level
* At **Operation** (endpoint) level
* In **Inbound**, **Backend**, **Outbound**, and **On-error** stages

---

## 🧭 2. **Policy Structure Overview**

### 🔽 XML Format:

```xml
<policies>
  <inbound>
    <!-- Modify or validate the incoming request -->
  </inbound>
  <backend>
    <!-- Optional: Modify the backend request -->
  </backend>
  <outbound>
    <!-- Modify the response before sending to client -->
  </outbound>
  <on-error>
    <!-- Handle any errors in the pipeline -->
  </on-error>
</policies>
```

---

### 🔄 Processing Flow:

```text
Client Request
   ↓
[INBOUND policies]       --> Modify headers, tokens, validate input
   ↓
[BACKEND policies]       --> Customize backend call (optional)
   ↓
Call Backend API
   ↓
[OUTBOUND policies]      --> Modify response, add headers
   ↓
Response to Client
```

---

## 🔧 3. **Common Policy Examples**

| Stage        | Example Policy                | Use Case                                |
| ------------ | ----------------------------- | --------------------------------------- |
| **Inbound**  | `validate-jwt`                | Validate OAuth2 token                   |
|              | `rate-limit-by-key`           | Enforce usage limits                    |
|              | `check-header`                | Reject missing/invalid headers          |
|              | `rewrite-uri`                 | Re-route paths (e.g., `/v1/` to `/v2/`) |
| **Backend**  | `set-backend-service`         | Dynamically change backend URL          |
| **Outbound** | `set-header`, `remove-header` | Modify response headers                 |
|              | `set-body`                    | Replace response body                   |
| **On-error** | `return-response`             | Custom error message                    |

---

## 🧪 4. **Hands-On Examples**

---

### ✅ A. Add a Rate Limit Policy

```xml
<inbound>
  <base />
  <rate-limit-by-key calls="10" renewal-period="60" counter-key="@(context.Subscription.Id)" />
</inbound>
```

💡 **Allows only 10 calls per minute per subscription.**

---

### ✅ B. Validate a JWT Token (OAuth2)

```xml
<inbound>
  <validate-jwt header-name="Authorization" require-expiration-time="true" require-scheme="Bearer">
    <openid-config url="https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration" />
    <audiences>
      <audience>api://your-client-id</audience>
    </audiences>
  </validate-jwt>
</inbound>
```

💡 Validates the incoming `Authorization` bearer token using Microsoft Entra ID.

---

### ✅ C. Rewrite URI

```xml
<inbound>
  <rewrite-uri template="/new-path" />
</inbound>
```

💡 If the client sends `/old-path`, APIM redirects it to `/new-path`.

---

### ✅ D. Add Response Header (Outbound)

```xml
<outbound>
  <set-header name="X-Custom-Header" exists-action="override">
    <value>Powered by APIM</value>
  </set-header>
</outbound>
```

💡 Adds a custom header to every response.

---

### ✅ E. Custom Error Handling

```xml
<on-error>
  <return-response>
    <set-status code="500" reason="Custom Error" />
    <set-body>{"message":"Something went wrong!"}</set-body>
  </return-response>
</on-error>
```

💡 Shows a friendly message if something fails in the pipeline.

---

## 🏗️ 5. Best Practices for Writing Policies

| Tip                                | Why It Helps                            |
| ---------------------------------- | --------------------------------------- |
| Use `<base />` at start            | Keeps inherited policy behavior intact  |
| Use `<choose>` and `<when>`        | Apply different policies based on logic |
| Minimize backend calls in policies | Reduces performance overhead            |
| Use named values / variables       | Make config cleaner and secure          |
| Test in **operation-level** first  | Easier to debug and isolate             |

---

## 📦 6. Reusable Snippets

APIM also supports **Named Values** (formerly named “Properties”) and **Policy Fragments**:

| Feature              | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| **Named Values**     | Store keys/secrets/reusables (refer as `{{value}}`) |
| **Policy Fragments** | Reuse common logic across multiple APIs             |

---

## 💡 7. Tools to Work with Policies

| Tool                      | Purpose                        |
| ------------------------- | ------------------------------ |
| Azure Portal (GUI)        | Most user-friendly             |
| Visual Studio Code Plugin | Local dev + push via ARM/Bicep |
| Azure REST APIs / CLI     | CI/CD automation               |

---

## ✅ TL;DR Summary

* APIM **policies** are XML rules that manage requests/responses
* Applied at **inbound, backend, outbound, on-error**
* Common policies include:

  * `rate-limit-by-key`
  * `validate-jwt`
  * `set-header`, `rewrite-uri`
  * `return-response`
* You can combine conditions using `<choose>`, `<when>`, `<otherwise>`

---