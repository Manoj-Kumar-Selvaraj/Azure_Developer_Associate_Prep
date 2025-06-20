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


