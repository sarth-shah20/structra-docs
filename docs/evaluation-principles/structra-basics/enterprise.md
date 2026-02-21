---
sidebar_position: 4
title: Enterprise
description: Enterprise additional rules P-21 through P-30.
---

# Enterprise

Includes all Free and Pro rules, plus the additional rules below.

## Additional Rules (P-21 to P-30)

### RULE P-21: CQRS Command and Query Models Are Separate
CQRS implementations must keep physically separate write and read models. A shared store negates intended benefits.

### RULE P-22: Search Index Is Not the Primary Store
Search systems (Elasticsearch/OpenSearch) must remain derived, eventually consistent indexes. Primary writes must go to authoritative storage first.

### RULE P-23: Time-Series Data Uses Appropriate Storage
Telemetry, metrics, IoT, and append-only time data must use time-series or log-structured storage rather than general OLTP databases.

### RULE P-24: Object Storage for Binary and Large Assets
Binary assets (images, video, documents, backups) must be in object storage, not relational BLOB columns or app server filesystems.

### RULE P-25: Secrets Not Stored in Application Config
Secrets (DB credentials, API keys, certificates) must come from a dedicated secrets manager, not hardcoded files or committed config.

### RULE P-26: Data Encryption at Rest and in Transit
Sensitive data must be encrypted in transit (`TLS 1.2+`) and at rest (`AES-256` or equivalent). Missing encryption is a compliance failure.

### RULE P-27: Authorization Layer Distinct from Authentication
Authentication and authorization must be separate concerns; policy should not be fragmented ad hoc across services.

### RULE P-28: PII Data Access Is Audited
Systems handling PII must log read/write access for auditability and compliance.

### RULE P-29: Three Pillars of Observability Present
Design must include structured logs, metrics, and distributed tracing. Missing any pillar creates operational blind spots.

### RULE P-30: Alerting Tied to SLOs, Not Just Thresholds
Alerting should follow SLO burn rate, not only static thresholds, to reduce noise and improve incident signal quality.
