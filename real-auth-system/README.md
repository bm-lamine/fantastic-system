## 🔐 Advanced Authentication System

This project implements a **production-grade authentication system** designed to go beyond basic JWT usage and explore real-world security tradeoffs.

### ✨ Features

#### 🧩 Hybrid Authentication

Supports multiple client types with different authentication strategies:

* **Session-based authentication (Cookies)**

  * Optimized for web applications (SPA)
  * Secure HTTP-only cookies
  * CSRF-safe design

* **Token-based authentication (Bearer Tokens)**

  * Designed for mobile apps and API consumers
  * Authorization via `Authorization: Bearer <token>`

---

#### 🔄 Refresh Token Rotation & Reuse Detection

* Short-lived access tokens
* Long-lived refresh tokens
* Automatic refresh token rotation
* **Reuse detection** to invalidate compromised sessions
* Full session revocation on suspicious activity

---

#### ⏳ Token Invalidation & Session Management

* **Redis-backed token blacklist**
* Per-device session tracking
* Ability to:

  * Log out from a single device
  * Log out from all devices
* Immediate access revocation without waiting for token expiration

---

#### 📧 Email Verification & Password Reset

* Email verification via one-time tokens (OTP)
* Secure password reset flow
* Token expiration handling
* **Rate-limited requests** to prevent abuse
* Redis-based storage for temporary credentials

---

### 🎯 Purpose

The goal of this project is not just to make authentication “work”, but to:

* Understand **real-world security tradeoffs**
* Explore **scalable session management**
* Learn how modern backends handle **compromised tokens**
* Build authentication systems suitable for **production environments**

---

If you want, I can also:

* Add an **architecture diagram section**
* Write a **Security Considerations** section
* Include **API flow diagrams** (login → refresh → revoke)
* Tailor it specifically for **Hono / Bun / Laravel**
