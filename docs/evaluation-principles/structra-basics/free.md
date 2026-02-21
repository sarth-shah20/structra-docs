---
sidebar_position: 2
title: Free
description: Free tier rules F-01 through F-20.
---

# Free

Applies to all evaluations.

## Rules (F-01 to F-20)

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
