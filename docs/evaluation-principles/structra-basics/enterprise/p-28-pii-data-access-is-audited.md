---
title: "P-28 PII Auditing"
---

# P-28 PII Auditing

## What This Rule Checks

Structra checks that any system storing or processing personally identifiable information (PII) includes an audit
log recording all read and write access to that data. Without an audit trail, you cannot detect unauthorized
access, demonstrate regulatory compliance, or investigate a data breach.

## What PII Means

Personally Identifiable Information is any data that could directly or indirectly identify a specific person:

- Name, address, email address, phone number.
- Social Security Number, passport number, national ID.
- Financial account numbers, credit card numbers.
- Health records, medical history.
- Biometric data (fingerprints, facial recognition data).
- IP address, device identifiers (in some jurisdictions).
- Location data.


## Why Audit Logs Are Required

Regulatory compliance GDPR (Europe), CCPA (California), HIPAA (healthcare in the US), PCI DSS
(payment card data) — all require demonstrated controls over who accesses sensitive data and when. An audit
log is a primary piece of evidence that those controls exist.

Breach investigation When a data breach occurs, the first question is: "What data was accessed, when, and by
whom?" Without an audit log, you cannot answer this — which means you cannot determine the scope of the
breach, notify the right people, or demonstrate due diligence to regulators.

Insider threat detection An audit log allows anomaly detection: an employee who suddenly reads 10,000 user
records they've never accessed before is a detectable signal.

## What the Audit Log Must Record

## For each access to PII data:

- Who: The authenticated identity of the accessor (user ID, service name, admin ID).
- What: Which records were accessed (the entity type and ID).
- When: Timestamp with sufficient precision.
- How: The operation (read, write, delete) and the endpoint or query used.
- From where: IP address, if available.


## Audit Log Properties

- Immutable: Audit logs must not be modifiable after the fact. Write-once storage, or logs shipped immediately to an append-only store.
- Separate from application data: The audit log should not be in the same database as the data it's auditing — a compromised application database should not compromise the audit trail.
- Monitored: Alerts should fire on suspicious access patterns.
