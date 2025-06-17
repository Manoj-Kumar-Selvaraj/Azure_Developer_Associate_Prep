---

## ✅ **Master Azure Entra – Detailed Topics List (Beginner to Pro)**

### 🔹 **1. Azure Entra Overview**

* What is Azure Entra?

---
    Azure Entra is Microsoft's modern identity and access management (IAM) solution. It includes tools to manage:
      Who can access?

      What they can access?

      When and under what conditions?
---

* Why Microsoft renamed Azure AD to Entra?

---
    | Reason                      | Explanation                                                                 |
    | --------------------------- | --------------------------------------------------------------------------- |
    | ✅ **Clarity**               | "Azure AD" caused confusion with on-prem Active Directory.                  |
    | ✅ **Modern Identity Needs** | Entra expands into **cross-cloud, decentralized, and workload** identities. |
    | ✅ **Modular Architecture**  | Entra breaks down IAM into manageable, purpose-specific services.           |
--- 

* Core components of Azure Entra (ID, Permissions, Verified ID, Workload ID)

---
    | Azure Entra Component            | Description                                                                                     |
    | -------------------------------- | ----------------------------------------------------------------------------------------------- |
    | **Azure Entra ID**               | Formerly **Azure AD**. Core identity service for authentication, SSO, and directory management. |
    | **Entra Permissions Management** | Cloud infrastructure entitlement management (CIEM) across AWS, Azure, GCP.                      |
    | **Entra Verified ID**            | Decentralized digital identity verification using open standards.                               |
    | **Entra Workload ID**            | Identity management for apps, services, containers, and functions (non-human identities).       |

---

* Differences between Entra and traditional Active Directory
---
    | Feature                  | Azure Entra ID (Cloud) | Active Directory (On-Prem) |
    | ------------------------ | ---------------------- | -------------------------- |
    | Protocols                | OAuth, OIDC, SAML      | Kerberos, NTLM             |
    | App support              | Cloud & Web Apps       | On-prem Windows apps       |
    | Location                 | Global cloud-based     | Local/Corporate network    |
    | MFA & Conditional Access | Built-in               | Requires add-ons           |
    | B2B & B2C                | Built-in               | Not native                 |

---

## 🔹 **2. Azure Entra ID (formerly Azure Active Directory)**

This is the **core service** within Entra that handles **identity and access** for users, devices, applications, and more.

---

### 🔸 **A. Tenants and Directories**

| Term                  | Meaning                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| **Tenant**            | A dedicated, isolated instance of Azure Entra ID service (like your private directory in the cloud). |
| **Directory**         | Holds users, groups, apps, devices. One directory = one tenant.                                      |
| **Default Directory** | Created when you first sign up with Microsoft services (like M365, Azure).                           |
| **Tenant ID**         | A unique GUID for your tenant used in app registrations and configurations.                          |

🔹 **Example**:
You sign up for Azure → Microsoft creates a tenant like `manojkumar.onmicrosoft.com` → This is your **Azure Entra Directory**.

---

### 🔸 **B. Core Objects in Azure Entra**

| Object Type            | Examples                      | Purpose                            |
| ---------------------- | ----------------------------- | ---------------------------------- |
| **Users**              | Admins, employees, guests     | Who signs in                       |
| **Groups**             | Security / M365 groups        | Manage access                      |
| **Devices**            | Laptops, phones               | For compliance, conditional access |
| **Service Principals** | App identities                | Auth for apps                      |
| **Roles**              | Admin roles (e.g. User Admin) | Control permissions                |

---

### 🔸 **C. Users**

* **Create Users**: Portal, PowerShell, CLI
* **User Types**:

  * **Member**: Internal employee
  * **Guest**: External B2B partner
* **Properties**: Name, email, usage location, job title
* **Lifecycle**:

  * Create → Assign roles/groups → Use → Disable/Delete

🔹 You can also **bulk create users** using CSV or script.

---

### 🔸 **D. Groups**

* **Types**:

  * **Security Group**: For permissions
  * **Microsoft 365 Group**: Adds Teams, SharePoint, etc.
* **Membership**:

  * **Assigned**: Manually add members
  * **Dynamic**: Add members based on rules (e.g., department = "IT")

🔹 Example Rule:

```plaintext
(user.department -eq "IT")
```

* Use groups for **RBAC**, **Conditional Access**, and **Licensing**.

---

### 🔸 **E. Authentication Methods**

| Method                             | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| Password                           | Default                                        |
| **MFA** (Text, App, Hardware)      | Stronger, required for secure access           |
| Temporary Access Pass (TAP)        | One-time code for onboarding                   |
| Passwordless                       | FIDO2 keys, Authenticator app                  |
| Self-Service Password Reset (SSPR) | User-initiated reset with verification methods |

---

### 🔸 **F. Azure Entra Roles & Admin Units**

* **Roles**:
  Predefined roles like:

  * **Global Administrator -- Think of it as the “superuser” or “root” account for your Entra director **
  * **User Administrator -- User Administrator is a delegated admin role in Azure Entra ID that allows managing users and groups—but not everything like the Global                     Administrator**
  * **Groups Administrator -- The Groups Administrator role is designed for managing group-related tasks in Azure Entra (formerly Azure AD), without giving access to user              accounts or other sensitive settings **

* **Admin Units** (like OUs in on-prem AD):
  Delegate admin rights to a **subset** of users/groups/devices.

---

### 🔸 **G. Device Registration & Management**

* Devices can be:

  * **Azure AD Registered**: BYOD (personal device)
  * **Azure AD Joined**: Corporate-owned
  * **Hybrid Azure AD Joined**: On-prem + Entra

🔹 Important for **Conditional Access**, **Intune**, **Compliance**

---

### 🔸 **H. Licensing Overview**

| Feature                        | Free | P1 | P2 |
| ------------------------------ | ---- | -- | -- |
| Basic SSO, MFA                 | ✅    | ✅  | ✅  |
| Conditional Access             | ❌    | ✅  | ✅  |
| Identity Protection            | ❌    | ❌  | ✅  |
| PIM (Privileged Identity Mgmt) | ❌    | ❌  | ✅  |
| Dynamic Groups                 | ❌    | ✅  | ✅  |

---

### 🧠 Quick Diagram – Azure Entra ID Core Structure

```
                 +-----------------------------+
                 |    Azure Entra Directory    |
                 +-----------------------------+
                        /      |       \
                 Users   Groups   Devices
                   |       |        |
                 MFA    Licenses   CA Policies
```

#### 🔸 Federation & External Identity

* B2B (Business-to-Business) -- Manged by Azure AD
* B2C (Business-to-Consumer) -- For Social media accessing your application
* Guest access and external collaboration settings
* Custom domain name

--- 

---

## 🔹 **3. App Registration & Azure Entra Identity Platform (OAuth2, OpenID Connect)**

This topic is **crucial** if you're planning to:

* Secure custom apps (web/mobile/SPAs)
* Use **SSO**, **MFA**, or **APIs** with Microsoft Entra
* Take AZ-204 or any developer-focused Azure certification

---

### 🧠 What is **App Registration**?

**App Registration** is how you tell Azure Entra:

> “Hey! I’m building an app that needs to authenticate users or call APIs securely.”

You're essentially **registering your app** as an **identity-aware client** in Azure Entra ID.

---

### 📦 App Registration Creates 3 Key Objects

| Object                          | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| **Application Object**          | Blueprint for your app (global/static definition)    |
| **Service Principal**           | Instance of app in a tenant (local/permission-aware) |
| **Client Secret / Certificate** | Credential used to authenticate the app              |

---

### 🧭 Where is it in Azure Portal?

**Azure Portal** → **Azure Entra ID** → **App registrations**

---

### 🔐 Why Register an App?

| Scenario                             | Use Case                                              |
| ------------------------------------ | ----------------------------------------------------- |
| 🔓 Login using Microsoft credentials | Sign in users with Microsoft 365, Entra, B2C          |
| 📡 Call Microsoft APIs               | Call Graph API to get user data                       |
| 🔑 Protect custom APIs               | Require token-based auth for backend services         |
| 🤝 Enable SSO                        | Integrate corporate login into 3rd-party or SaaS apps |

---

### 🔁 Protocols Used in App Registration

| Protocol                  | Purpose                                                  |
| ------------------------- | -------------------------------------------------------- |
| **OAuth 2.0**             | Secure delegated access (get tokens to access resources) |
| **OpenID Connect (OIDC)** | Extension to OAuth 2.0 that supports **user identity**   |
| **SAML** (older)          | Still supported for legacy apps (e.g., Salesforce)       |

---

### 🏗 Key Properties in App Registration

| Property               | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| **App Name**           | Display name of your app                                                   |
| **App ID / Client ID** | Public ID used by your app                                                 |
| **Tenant ID**          | Directory your app lives in                                                |
| **Redirect URI**       | Where to send tokens after login (e.g., `https://myapp.com/auth/callback`) |
| **Client Secret**      | Secret key used for secure auth                                            |
| **API Permissions**    | What Microsoft APIs your app can call (Graph, SharePoint, etc.)            |

---

### 🔒 Authentication Types

| App Type              | Method                   |
| --------------------- | ------------------------ |
| Web App               | OIDC, Auth Code Flow     |
| Single Page App (SPA) | PKCE, Implicit Flow      |
| Backend API           | Client credentials flow  |
| Mobile App            | MSAL with Auth Code PKCE |

---

### 🧩 Example: Registering a Web App

1. Go to **Azure Entra → App registrations**
2. Click **+ New registration**
3. Fill:

   * Name: `mywebapp`
   * Supported account types: Single tenant or Multi-tenant
   * Redirect URI: `https://localhost:3000/auth/callback`
4. Click **Register**
5. Copy **Client ID** and **Tenant ID**
6. Go to **Certificates & secrets** → Add a new **Client Secret**
7. Go to **API permissions** → Add Microsoft Graph → `User.Read`

---

### 🎯 Developer Libraries to Use

| Language                | Library                |
| ----------------------- | ---------------------- |
| JavaScript (React, SPA) | MSAL.js                |
| Python                  | MSAL for Python        |
| .NET                    | Microsoft.Identity.Web |
| Java                    | MSAL4J                 |

---

### 📌 Key Terms Glossary

| Term             | Meaning                               |
| ---------------- | ------------------------------------- |
| **Client ID**    | Unique ID of your app                 |
| **Tenant ID**    | Unique ID of your Entra directory     |
| **Redirect URI** | Endpoint where Entra sends tokens     |
| **Scope**        | What your app wants to access         |
| **Token**        | Encrypted proof of identity or access |

---

### 🔐 App Permission Types

| Type            | Example                          | Consent Required?      |
| --------------- | -------------------------------- | ---------------------- |
| **Delegated**   | Sign in as user and access Graph | Yes (by user or admin) |
| **Application** | App accesses without user        | Yes (admin-only)       |

---

## 🔄 **Difference Between Enterprise Applications vs App Registrations**

| Aspect                 | **App Registration**                                | **Enterprise Application**                                 |
| ---------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| 🔧 **Purpose**         | Defines the **blueprint** of an app                 | Represents a **working instance** of an app in your tenant |
| 📍 **Location**        | `Azure Entra ID → App registrations`                | `Azure Entra ID → Enterprise applications`                 |
| 👥 **Used by**         | **App developers** who create custom apps           | **IT Admins** who manage access to apps                    |
| 🏭 **Created When**    | You build a **custom app** or register it manually  | You integrate a **SaaS app** or register a new app         |
| 🛂 **Who manages it?** | **App owner/developer** (you)                       | **Tenant admin** (IT)                                      |
| 📦 **What it defines** | App metadata: client ID, redirect URI, secrets      | Permissions, users, SSO, provisioning                      |
| 🧱 **Type of Object**  | **Application object** (global blueprint)           | **Service Principal** (tenant-level object)                |
| 🌐 **Multi-tenant?**   | Yes – app registration lives in the **home tenant** | Yes – one **Enterprise App per tenant**                    |

---

### 🔍 Visual Breakdown

```
            +--------------------+                 +-----------------------------+
            |  App Registration  |  Blueprint App  | Enterprise Application      |
            |  (Application Obj) |  ------------>  | (Service Principal in tenant)|
            +--------------------+                 +-----------------------------+
```

---

## 🧠 Real-World Analogy

| Concept              | Analogy                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| **App Registration** | Like a **car model** (e.g., "Toyota Corolla")                          |
| **Enterprise App**   | Like **your specific Corolla** with keys and license, in your driveway |

---

## 📌 Examples

### ➤ When You Register Your Own App

1. You go to **App registrations** and register `MyCRMApp`
2. Azure creates:

   * `Application Object` (global, stored in the directory)
   * `Service Principal` in your tenant → This appears in **Enterprise Applications**

✅ Now your devs configure secrets, URIs, APIs
✅ Admins assign users/groups and policies in the **Enterprise Application**

---

### ➤ When You Use a SaaS App (like Salesforce, Zoom)

1. You search in **Enterprise Applications** → Add Salesforce
2. No need to create app registration – Microsoft already did that
3. It creates only a **Service Principal** in your tenant

✅ You configure **SSO**, assign **users/groups**, and optionally set **provisioning rules**

---

## 🔑 Summary Table

| Feature                               | App Registration | Enterprise Application |
| ------------------------------------- | ---------------- | ---------------------- |
| Register your own app                 | ✅                | ❌                      |
| Configure Redirect URI, Secrets       | ✅                | ❌                      |
| Assign users/groups                   | ❌                | ✅                      |
| SSO Settings                          | ❌                | ✅                      |
| Consent Permissions                   | ✅                | ✅                      |
| Automatically created when using SaaS | ❌                | ✅                      |
| One per directory                     | ✅                | ✅                      |
| One per tenant                        | ❌                | ✅                      |

---

## 💡 Pro Tips

* You **must have an App Registration** if you're **building a custom app**
* You use **Enterprise Apps** to **assign access and manage SSO**
* **Every Enterprise App comes from an App Registration**

  * Either your own or from Microsoft/SaaS Gallery

--- 

## 🔐 **4. Conditional Access & Multi-Factor Authentication (MFA)**

*This is a core security feature of Azure Entra and highly important for both real-world use and the AZ-104/AZ-204 exams.*

---

## 🔹 What is **Conditional Access**?

**Conditional Access (CA)** lets you create **automated if-then policies** that control **who can access what** based on conditions like:

> ✅ If a user logs in from **India** on a **trusted device**,
> ❌ Then **grant access without MFA**
> 🔒 But if they log in from **another country**,
> 🔁 Then **require MFA** or **block access**

---

## 🔧 How Conditional Access Works

| Component      | Role                                                          |
| -------------- | ------------------------------------------------------------- |
| **Users**      | Who is targeted? (e.g. all users, specific group)             |
| **Cloud Apps** | Which app is being accessed? (e.g. Microsoft 365, Salesforce) |
| **Conditions** | What must be true? (Location, Device, Risk)                   |
| **Controls**   | What to enforce? (MFA, block, require compliant device)       |

---

## 🧪 CA Policy = IF + Conditions → THEN + Controls

### Example:

| IF...                             | THEN...       |
| --------------------------------- | ------------- |
| User is outside India             | Require MFA   |
| User is using unmanaged device    | Block access  |
| User is risky (e.g., compromised) | Block sign-in |

---

## 🔐 Conditions Available

| Condition           | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| **Sign-in Risk**    | Low/Medium/High based on behavior (via Microsoft Defender) |
| **User Risk**       | Based on identity compromise signals                       |
| **Device Platform** | Android, iOS, Windows, etc.                                |
| **Locations**       | Based on IP or country                                     |
| **Client Apps**     | Browser vs Mobile vs Legacy                                |
| **Device State**    | Compliant, Hybrid Azure AD joined                          |

---

## ✅ Access Controls You Can Apply

| Control                          | Description                              |
| -------------------------------- | ---------------------------------------- |
| **Require MFA**                  | Enforce second authentication step       |
| **Require Hybrid Joined Device** | Only allow domain-joined machines        |
| **Require Compliant Device**     | Works with Intune (MDM)                  |
| **Block Access**                 | Full denial                              |
| **Grant Access with Conditions** | Allow only with certain security posture |

---

## 📍 Where To Create It?

**Azure Portal → Azure Entra ID → Protection → Conditional Access**

---

## 👨‍💻 Example: Require MFA for External Users

1. Go to **Conditional Access** → **+ New policy**
2. Name it: `MFA for External`
3. Assign:

   * Users: **Guest or External**
   * Cloud Apps: **All apps** (or specific)
   * Conditions → **Locations** → Exclude `India`
4. Grant → Require **Multi-Factor Authentication**
5. Enable Policy → **On**

---

## 🧾 Built-in Conditional Access Templates (Optional)

Azure offers **prebuilt policies** like:

* Secure admin roles
* Block legacy authentication
* Require MFA for risky sign-ins

👉 Useful for beginners to apply best practices quickly.

---

## 🔐 What is Multi-Factor Authentication (MFA)?

**MFA = something you know + something you have**

| Type                         | Example              |
| ---------------------------- | -------------------- |
| Password (knowledge)         | "Something you know" |
| OTP via app/SMS (possession) | "Something you have" |
| Biometric (inherence)        | "Something you are"  |

---

## 🔐 MFA Methods Supported in Azure

| Method                                | Available?                     |
| ------------------------------------- | ------------------------------ |
| Microsoft Authenticator app           | ✅                              |
| SMS or Call                           | ✅                              |
| FIDO2 Keys (e.g., Yubikey)            | ✅                              |
| Windows Hello                         | ✅                              |
| Temporary Access Pass                 | ✅                              |
| Email (for password reset, not login) | ⚠️ Not supported for login MFA |

---

## ⚙️ How to Enable MFA

### 1. **Per-user MFA (legacy method)**

Good for small teams.
Azure Entra → Users → Multi-Factor Authentication → Enable

### 2. **Conditional Access (preferred)**

Modern & flexible. Can enforce MFA based on context.

---

## 🛡 Why Conditional Access + MFA is Critical

| Risk                    | Conditional Access Helps With            |
| ----------------------- | ---------------------------------------- |
| Phishing                | Requires MFA                             |
| Compromised credentials | Blocks or challenges risky sign-ins      |
| Non-compliant devices   | Blocks them from accessing data          |
| Insider threats         | Monitors and restricts access conditions |

---

## 🧠 Summary Table

| Feature                     | Conditional Access | MFA |
| --------------------------- | ------------------ | --- |
| Location-based rules        | ✅                  | ❌   |
| Device compliance check     | ✅                  | ❌   |
| Risk detection              | ✅                  | ❌   |
| Challenge with OTP/Call/App | ✅ (via control)    | ✅   |
| Block/allow access          | ✅                  | ❌   |
| Just adds extra auth step   | ❌                  | ✅   |

---

### 🔹 **5. Roles and Role-Based Access Control (RBAC)**

* Azure AD built-in roles
* Custom roles  -- Custom roles allow you to create your own role definitions when built-in roles don’t meet your needs.
      🧠 Why Custom Roles?
  
  ---
          * You need custom roles when:

          * Built-in roles (e.g. Reader, Contributor) are too broad

          * You want to allow or deny specific actions

          * You want to follow least privilege principles strictly
  ---

  ---

    🧾 Example Use Case
        “I want a user to be able to restart a VM, but not delete it or view disks.”
        
        There’s no built-in role like that — so you’d need a custom role.
        
        🧱 Structure of a Custom Role (JSON)
        {
          "Name": "VM Restart Only",
          "IsCustom": true,
          "Description": "Can restart VMs but not delete or modify",
          "Actions": [
            "Microsoft.Compute/virtualMachines/start/action",
            "Microsoft.Compute/virtualMachines/restart/action"
          ],
          "NotActions": [],
          "AssignableScopes": [
            "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          ]
        }
  
        Field	            Description
        Actions	            Allowed permissions
        NotActions	        Permissions to explicitly exclude
        AssignableScopes	Where this role can be used (usually subscription or resource group)
        
---

* Assigning roles (Admin center, PowerShell)
* Privileged Identity Management (PIM) basics

---

### 🔹 **6. Identity Governance**

* Access Reviews
* Entitlement Management
* Lifecycle workflows
* Separation of duties

---

### 🔹 **7. Security & Protection**

* Identity Protection (risky sign-ins, risky users, risk policies)
* MFA registration policy
* Sign-in logs vs audit logs
* Monitoring tools: Entra logs, Log Analytics, Sentinel

---

### 🔹 **8. Workload Identities**

* What is a workload identity?
* Service principals, managed identities
* Best practices for securing workload identities

---

### 🔹 **9. Azure Entra Verified ID (Decentralized Identity)**

* What is Verified ID?
* Use cases: Education, HR, Identity verification
* Issuers, holders, and verifiers model
* Setup process for Verified ID

---

### 🔹 **10. Hybrid Identity & Synchronization**

* Azure AD Connect
* Pass-through authentication
* Password hash sync
* Federation with AD FS
* AD Connect Health

---

### 🔹 **11. Monitoring & Auditing**

* Sign-in logs
* Audit logs
* Diagnostic settings
* Monitoring Entra with Azure Monitor and Log Analytics

---

### 🔹 **12. Licensing & Pricing**

* Free vs P1 vs P2 plans
* Features matrix
* Assigning licenses to users

---

### 🔹 **13. Identity Best Practices**

* Secure MFA configuration
* Least privilege principle
* Periodic access reviews
* Protect privileged accounts
* Avoiding legacy authentication

---

### 🔹 **14. Real-World Scenarios**

* Secure access to Microsoft 365
* Integrate a custom app with Entra
* Setup SAML SSO for a 3rd-party app
* Design access control using Conditional Access

---
