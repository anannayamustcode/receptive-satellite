# Cloudanix Database Demo – Security Events Monitor

This project demonstrates my ability to design, query, and analyze a relational database for a cloud security monitoring system — inspired by Cloudanix’s mission of delivering cloud observability and threat detection.

---

## 📦 Project Overview

This SQLite-based demo models:

- Users managing cloud accounts
- Cloud accounts across multiple providers (AWS, GCP, Azure)
- Security events triggered in each account

Built as a compact proof-of-skill for Cloudanix's frontend + database internship.

---

## 🧱 Schema Design

The system includes 3 tables:

- **users**
  - `id`, `name`, `email`
- **cloud_accounts**
  - `id`, `provider`, `account_name`, `user_id` _(foreign key to users)_
- **security_events**
  - `id`, `cloud_account_id`, `event_type`, `severity`, `timestamp`
  - Severity is constrained to `'low'`, `'medium'`, `'high'`

> Full schema: [schema.sql](./schema.sql)

---

## 🔍 SQL Queries

The `sample_queries.sql` file contains all key queries used in the project, including:

### 1. Show high severity events

```sql
SELECT * FROM security_events WHERE severity = 'high';
```
