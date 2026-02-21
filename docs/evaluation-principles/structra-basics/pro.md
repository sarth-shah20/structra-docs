---
sidebar_position: 3
title: Pro
description: Pro tier paid rules P-01 through P-20.
---

# Pro

Applies for paid Pro and Enterprise evaluations.

## Rules (P-01 to P-20)

### RULE P-01: Horizontal Scaling Path Defined
Every service must show a horizontal scaling path so load can increase without architectural redesign.

### RULE P-02: Database Sharding Strategy Valid
Sharded databases must define a high-cardinality shard key with even write distribution. Sequential or low-cardinality keys are hot-shard risks.

### RULE P-03: Read/Write Ratio Influences Architecture
Declared read/write ratio must shape architecture. Read-heavy systems require replicas and aggressive caching; write-heavy systems require buffering, LSM-oriented storage, or queue-based ingestion.

### RULE P-04: Rate Limiting Strategy Specified
Public APIs must define rate limiting algorithm (`token bucket`, `leaky bucket`, `sliding window`) enforced at gateway or middleware.

### RULE P-05: Latency Budget Allocated
Latency SLA must be budgeted across network, cache, database, and compute. Unallocated SLA claims are unverifiable.

### RULE P-06: Connection Pooling for Database Connections
App-to-database connectivity must include pooling. Per-request direct connections under high concurrency are an exhaustion risk.

### RULE P-07: Async Processing for Non-Critical Path
Non-critical operations (email, analytics, image processing, notifications) must be asynchronous, not on the request critical path.

### RULE P-08: Consistency Model Declared
Each datastore must declare consistency model (strong, read-your-writes, monotonic reads, eventual) aligned with business semantics.

### RULE P-09: CAP Theorem Trade-off Acknowledged
For distributed stores, CP/AP trade-off and partition behavior must be explicit.

### RULE P-10: Distributed Transaction Handling
Multi-store writes must use `2PC`, `Saga` with compensations, or `Outbox` pattern. Uncoordinated writes are integrity risks.

### RULE P-11: Idempotent Message Consumer
Queue consumers must be idempotent to handle duplicate delivery safely.

### RULE P-12: Dead Letter Queue for Message Failures
Message systems must include `DLQ` (or equivalent) for retries-exhausted messages.

### RULE P-13: Consensus Mechanism for Leader Election
Any single-authority node requirement must define leader election/consensus (for example ZooKeeper, etcd, Raft) to prevent split-brain.

### RULE P-14: Data Partitioning Does Not Break Query Patterns
Partitioning must preserve required query patterns. Frequent scatter-gather for common queries is an anti-pattern.

### RULE P-15: Circuit Breaker on External Calls
Synchronous downstream/external calls must have circuit breakers and fallback behavior to avoid cascading failure.

### RULE P-16: Retry Logic with Exponential Backoff
Internal network calls must use retries with exponential backoff and jitter, not fixed-interval immediate retry loops.

### RULE P-17: Availability SLA Matched to Architecture
Availability claims must match topology (for example, 99.99% typically requires multi-region active-active; 99.9% can be multi-AZ).

### RULE P-18: Graceful Degradation Path Exists
Non-essential features must define degraded behavior when dependencies fail (stale cache, feature-off, default response).

### RULE P-19: Health Check and Auto-Recovery Defined
Services must expose health checks, and infra must eject/replace unhealthy instances automatically.

### RULE P-20: Event Sourcing Requires Snapshot Strategy
Event-sourced systems must include snapshotting. Rebuilding state from an unbounded event log on each read is a performance fault.
