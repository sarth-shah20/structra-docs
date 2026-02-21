---
sidebar_position: 1
title: Structra Basics
description: Fundamental principle and 50-rule evaluation framework for system design on Structra.
---

# Structra Basics

System Design Evaluation Rules v1.0 for `structra.cloud`.

## Access and Tier Evaluation Policy

- Everyone can read all documentation, including all 50 rules.
- The evaluation machine enforces rules based on product tier.
- `Free` tier evaluation applies `F-01` through `F-20`.
- `Pro` tier evaluation applies `F-01` through `F-20` and `P-01` through `P-20`.
- `Enterprise` tier evaluation applies all rules: `F-01` through `F-20` and `P-01` through `P-30`.

Total rules: 50 (`20 Free` + `30 Paid`).

## Free Tier Rules (F-01 to F-20)

### RULE F-01: API Protocol Fit
The chosen API protocol (REST, GraphQL, gRPC, WebSocket) must match the communication pattern. REST for standard CRUD, gRPC for internal low-latency service calls, GraphQL for flexible client queries, and WebSocket for bidirectional real-time communication. Mismatched protocol choice is a structural fault.

### RULE F-02: Single Point of Failure Identification
No critical path may have a single component whose failure can bring down the system. Load balancers, databases, and message brokers must have redundancy or explicit failover.

### RULE F-03: Stateless Service Layer
Application servers must be stateless. Session and user state must be externalized (Redis, database, token-based auth). In-memory session state on app servers is not horizontally scalable.

### RULE F-04: Database Selection Justification
Each database choice must be justified by access pattern: relational for transactional consistency, document stores for flexible schema, key-value for high-throughput lookup, column-family for time-series or wide-row patterns.

### RULE F-05: Caching Layer Presence
Any read-heavy system above 1,000 QPS must include a dedicated cache between application and database. Missing cache in this profile is a scalability gap.

### RULE F-06: Cache Eviction Policy Declared
When cache is present, eviction policy must be explicit: `LRU`, `LFU`, or `TTL` as applicable. Undeclared eviction policy marks the design incomplete.

### RULE F-07: Load Balancer Placement
A load balancer must sit in front of every horizontally scaled service tier. Multiple servers without a load balancer is structurally incorrect.

### RULE F-08: HTTP Status Code Correctness
API responses must use semantically correct status codes: `2xx` success, `4xx` client errors, `5xx` server errors. Misuse (for example `200` for errors) is an API design fault.

### RULE F-09: Idempotency for Write Operations
Payment, order-creation, and other critical mutation endpoints must implement idempotency with a client-supplied idempotency key to remain safe under retries.

### RULE F-10: Authentication Mechanism Defined
External APIs must specify authentication (`JWT`, `OAuth 2.0`, API key, session cookie, or `mTLS` for service-to-service). Public APIs with no auth declaration are insecure.

### RULE F-11: DNS and CDN for Public-Facing Systems
Systems serving static content or global users must include CDN. A single origin for global traffic is a latency and availability fault.

### RULE F-12: Synchronous vs Asynchronous Boundary Declared
Design must explicitly identify synchronous (user-wait) and asynchronous (queued) operations. Long-running synchronous paths are a latency error.

### RULE F-13: Data Replication Strategy Stated
Primary database designs must state replication strategy. At least one read replica is expected for read-heavy workloads. Omitted replication in production is a durability risk.

### RULE F-14: Monolith vs Microservice Decision Justified
Architecture style must match team size, deployment frequency, and complexity. Microservices for low-traffic/small-team systems is premature complexity; monolith for independently scaling domains is a scalability gap.

### RULE F-15: Back-of-Envelope Estimates Present
Design must include rough estimates for expected QPS, one-year storage, and peak bandwidth. Missing estimates makes scale claims unverifiable.

### RULE F-16: Functional Requirements Separation
Design must separate functional requirements from non-functional requirements (latency targets, availability SLA, consistency guarantees). Conflation or omission is architecturally incomplete.

### RULE F-17: Failure Mode Acknowledgment
At least two failure modes and their handling must be defined (retries with exponential backoff, circuit breakers, fallbacks, graceful degradation). Absence means not production-ready.

### RULE F-18: Data Storage Separation by Access Pattern
Operational data (`OLTP`) and analytical data (`OLAP`) must not share the same primary database for reporting workloads. Mixing them is a performance and availability risk.

### RULE F-19: Unique ID Strategy Defined
Globally unique entities must use an explicit ID strategy (`UUID`, Snowflake/timestamp-based, ticket server). Auto-increment IDs in distributed/sharded systems are a correctness fault.

### RULE F-20: External Dependency Boundaries Drawn
Third-party services (payments, email, push gateways) must be explicit external boundaries. Inlined dependency logic creates tight coupling and weak replaceability.

## Paid Tier Rules (P-01 to P-30)

Paid rules are available in `Pro` and `Enterprise`, with `Enterprise` including all `Pro` rules plus additional advanced coverage.

### Pro Rules (P-01 to P-20)

#### RULE P-01: Horizontal Scaling Path Defined
Every service must show a horizontal scaling path so load can increase without architectural redesign.

#### RULE P-02: Database Sharding Strategy Valid
Sharded databases must define a high-cardinality shard key with even write distribution. Sequential or low-cardinality keys are hot-shard risks.

#### RULE P-03: Read/Write Ratio Influences Architecture
Declared read/write ratio must shape architecture. Read-heavy systems require replicas and aggressive caching; write-heavy systems require buffering, LSM-oriented storage, or queue-based ingestion.

#### RULE P-04: Rate Limiting Strategy Specified
Public APIs must define rate limiting algorithm (`token bucket`, `leaky bucket`, `sliding window`) enforced at gateway or middleware.

#### RULE P-05: Latency Budget Allocated
Latency SLA must be budgeted across network, cache, database, and compute. Unallocated SLA claims are unverifiable.

#### RULE P-06: Connection Pooling for Database Connections
App-to-database connectivity must include pooling. Per-request direct connections under high concurrency are an exhaustion risk.

#### RULE P-07: Async Processing for Non-Critical Path
Non-critical operations (email, analytics, image processing, notifications) must be asynchronous, not on the request critical path.

#### RULE P-08: Consistency Model Declared
Each datastore must declare consistency model (strong, read-your-writes, monotonic reads, eventual) aligned with business semantics.

#### RULE P-09: CAP Theorem Trade-off Acknowledged
For distributed stores, CP/AP trade-off and partition behavior must be explicit.

#### RULE P-10: Distributed Transaction Handling
Multi-store writes must use `2PC`, `Saga` with compensations, or `Outbox` pattern. Uncoordinated writes are integrity risks.

#### RULE P-11: Idempotent Message Consumer
Queue consumers must be idempotent to handle duplicate delivery safely.

#### RULE P-12: Dead Letter Queue for Message Failures
Message systems must include `DLQ` (or equivalent) for retries-exhausted messages.

#### RULE P-13: Consensus Mechanism for Leader Election
Any single-authority node requirement must define leader election/consensus (for example ZooKeeper, etcd, Raft) to prevent split-brain.

#### RULE P-14: Data Partitioning Does Not Break Query Patterns
Partitioning must preserve required query patterns. Frequent scatter-gather for common queries is an anti-pattern.

#### RULE P-15: Circuit Breaker on External Calls
Synchronous downstream/external calls must have circuit breakers and fallback behavior to avoid cascading failure.

#### RULE P-16: Retry Logic with Exponential Backoff
Internal network calls must use retries with exponential backoff and jitter, not fixed-interval immediate retry loops.

#### RULE P-17: Availability SLA Matched to Architecture
Availability claims must match topology (for example, 99.99% typically requires multi-region active-active; 99.9% can be multi-AZ).

#### RULE P-18: Graceful Degradation Path Exists
Non-essential features must define degraded behavior when dependencies fail (stale cache, feature-off, default response).

#### RULE P-19: Health Check and Auto-Recovery Defined
Services must expose health checks, and infra must eject/replace unhealthy instances automatically.

#### RULE P-20: Event Sourcing Requires Snapshot Strategy
Event-sourced systems must include snapshotting. Rebuilding state from an unbounded event log on each read is a performance fault.

### Enterprise Additional Rules (P-21 to P-30)

#### RULE P-21: CQRS Command and Query Models Are Separate
CQRS implementations must keep physically separate write and read models. A shared store negates intended benefits.

#### RULE P-22: Search Index Is Not the Primary Store
Search systems (Elasticsearch/OpenSearch) must remain derived, eventually consistent indexes. Primary writes must go to authoritative storage first.

#### RULE P-23: Time-Series Data Uses Appropriate Storage
Telemetry, metrics, IoT, and append-only time data must use time-series or log-structured storage rather than general OLTP databases.

#### RULE P-24: Object Storage for Binary and Large Assets
Binary assets (images, video, documents, backups) must be in object storage, not relational BLOB columns or app server filesystems.

#### RULE P-25: Secrets Not Stored in Application Config
Secrets (DB credentials, API keys, certificates) must come from a dedicated secrets manager, not hardcoded files or committed config.

#### RULE P-26: Data Encryption at Rest and in Transit
Sensitive data must be encrypted in transit (`TLS 1.2+`) and at rest (`AES-256` or equivalent). Missing encryption is a compliance failure.

#### RULE P-27: Authorization Layer Distinct from Authentication
Authentication and authorization must be separate concerns; policy should not be fragmented ad hoc across services.

#### RULE P-28: PII Data Access Is Audited
Systems handling PII must log read/write access for auditability and compliance.

#### RULE P-29: Three Pillars of Observability Present
Design must include structured logs, metrics, and distributed tracing. Missing any pillar creates operational blind spots.

#### RULE P-30: Alerting Tied to SLOs, Not Just Thresholds
Alerting should follow SLO burn rate, not only static thresholds, to reduce noise and improve incident signal quality.
