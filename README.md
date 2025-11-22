---

# 🛡️ MailInsight — Secure AI Email Threat Detection

MailInsight is a **security-first email threat detection platform**. It analyzes emails in real time for phishing, spoofing, malicious links, and impersonation, while maintaining strict user data privacy and safe authentication.

---

## 🔥 Security-Focused Features

### ✅ **Privacy & Data Protection**

* No passwords stored in MailInsight — uses **OAuth tokens only**.
* Email content is scanned **server-side** using **Supabase Edge Functions**.
* Logs and analytics do **not store sensitive information**.

### ✅ **Secure Authentication**

* Supabase Auth with **email/password** and **Google OAuth 2.0**.
* Tokens stored securely in browser session storage.
* Supports **redirect URI validation** to prevent phishing.

### ✅ **Gmail API Integration**

* Users grant **limited access** via OAuth.
* Only metadata and message content needed for threat detection are accessed.
* No permanent storage of Gmail credentials.

### ✅ **Serverless & Edge Security**

* AI scanning runs in **Supabase Edge Functions**.
* Functions execute close to the user and follow **role-based access policies**.

### ✅ **Secure Frontend**

* React + TypeScript + Tailwind CSS with **strict input validation**.
* All links, redirects, and third-party requests are sanitized.
* Components designed with **least privilege principle** in mind.

---

## 🔧 Installation & Security Guidelines

### 1️⃣ Clone & install

```bash
git clone <YOUR_GIT_URL>
cd mailinsight
npm install
```

### 2️⃣ Environment variables (do **not** commit!)

Create `.env.local`:

```ini
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
```

> Never commit `.env.local`. Use `.gitignore` to prevent accidental leaks.

### 3️⃣ Start locally

```bash
npm run dev
```

---

## 📨 Gmail API & OAuth Security

1. Enable **Gmail API** in Google Cloud Console.
2. Configure **OAuth 2.0 Client**.
3. Add **only authorized redirect URIs**:

```
http://localhost:5173/auth/callback
https://<your-supabase>.supabase.co/auth/v1/callback
```

4. Use HTTPS in production to prevent token interception.
5. Tokens are exchanged **server-side**, never exposed to public.

> Misconfigured redirect URIs cause `Error 400: redirect_uri_mismatch`.

---

## 🔐 Supabase Edge Function Security

* Located in `/supabase/functions/analyze-email/index.ts`.
* Deploy using:

```bash
supabase functions deploy analyze-email --project-ref <PROJECT_REF>
```

* Run locally:

```bash
supabase functions serve analyze-email
```

* Ensure **RLS (Row-Level Security)** is enabled on Postgres tables.
* Validate all inputs before sending them to the AI model.

---

## 🚀 Deployment Best Practices

* Serve via HTTPS only.
* Use environment variables for API keys.
* Configure CSP, XSS, and CORS policies in production.
* Regularly audit Supabase Edge functions and database roles.

---

## 👥 Team

MailInsight is developed by a dedicated cybersecurity team with strong focus on **privacy, security, and ethical AI usage**.

---

## 🤝 Contributing Securely

1. Fork the repo.
2. Create feature branch.
3. Keep secrets out of commits.
4. Submit pull requests for review.

---

## 📄 License

MIT License — safe for personal and commercial use.

---
