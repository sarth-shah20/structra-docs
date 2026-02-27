---
sidebar_position: 2
title: Production System Design Principles
description: Advanced production architecture principles for high-scale and high-reliability systems.
slug: /evaluation-principles/production-system-principles
---

# Production System Design Principles

These principles are for high-stakes production architecture reviews. They focus on failure containment, correctness under concurrency, and operational survivability at scale.

## PRD-01: End-to-End Deadline Propagation
Every inbound request must carry a deadline budget propagated across all downstream calls. Local service timeouts without inherited deadlines create request amplification and tail-latency collapse.

## PRD-02: Timeout Hierarchy Must Be Monotonic
Client timeout must be greater than gateway timeout, which must be greater than service timeout, which must be greater than datastore timeout. Non-monotonic timeout trees cause retry storms and duplicate work.

## PRD-03: Backpressure Is Mandatory on Every Queue Boundary
Producers must respond to consumer lag using bounded queues, adaptive throttling, and explicit shed policies. Unbounded buffers hide overload until catastrophic memory or latency failure.

## PRD-04: Load Shedding Before Saturation
Services must reject low-priority traffic before CPU, connection pools, or thread pools saturate. Controlled rejection preserves core paths and prevents full-cluster brownouts.

## PRD-05: Bulkheads for Dependency Isolation
Each critical dependency requires isolated worker pools, connection pools, and circuit breaker state. Shared pools allow one failing dependency to collapse unrelated flows.

## PRD-06: Control Plane and Data Plane Separation
Configuration, orchestration, and policy updates must be isolated from request-serving execution paths. Control-plane instability must never halt data-plane serving.

## PRD-07: Cell-Based Isolation for Tenant Blast Radius
Large multi-tenant systems must partition tenants into cells with isolated compute and data boundaries. A single noisy or broken tenant must not degrade global SLO.

## PRD-08: Hot Partition Detection and Shard Rebalancing
Partition strategies must include continuous skew detection and live rebalancing mechanisms. Static keys without skew management eventually create irreversible hot shards.

## PRD-09: Schema Evolution Requires Compatibility Guarantees
Message and API schema changes must maintain explicit backward/forward compatibility windows with contract tests. Non-versioned schema changes are distributed outage vectors.

## PRD-10: Online Data Migration Without Write Freeze
Large migrations require phased rollout: dual-read or shadow-read validation, chunked backfills, and cutover guarded by parity metrics. Big-bang migration windows are operationally unsafe.

## PRD-11: Outbox + Idempotent Consumer for Cross-System Consistency
State change events must be emitted through transactional outbox, and downstream consumers must dedupe by idempotency key. Dual-write without outbox is eventual data divergence.

## PRD-12: Exactly-Once Delivery Must Not Be Assumed
Distributed messaging must be designed for at-least-once semantics with deterministic deduplication. Claims of exactly-once correctness without end-to-end proof are invalid.

## PRD-13: Multi-Region Strategy Includes Conflict Semantics
Multi-region write paths must define conflict resolution policy (last-writer-wins, CRDT, domain-specific merge, or hard ownership). Replication without conflict semantics is correctness debt.

## PRD-14: Dependency Budgeting and Criticality Tiers
Every external dependency must have an assigned criticality tier with explicit fallback mode and allowed error budget consumption. Unclassified dependencies make incident response non-deterministic.

## PRD-15: SLO Error Budget Governs Release Velocity
Release gates must be tied to error budget burn, not calendar cadence. Shipping while budget is exhausted converts reliability debt into recurring incidents.

## PRD-16: Alerting Must Map to User-Visible Impact
Alerts should be derived from golden signals and SLO burn rates, with runbook links and owner routing attached. Metric-threshold-only alerting creates noisy, low-action pages.

## PRD-17: Capacity Model Includes Saturation Forecasting
Capacity planning must model CPU, memory, IOPS, network egress, and connection ceilings under p95 and p99 load, plus growth horizon. Average-only planning misses tail-driven failures.

## PRD-18: Disaster Recovery Is Tested, Not Declared
RTO/RPO targets must be verified with scheduled failover and restore drills. Unexercised DR plans are documentation artifacts, not operational guarantees.

