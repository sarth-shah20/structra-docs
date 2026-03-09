---
title: Pro
description: Pro taxonomy rules P-01 through P-20.
---

# Pro

Pro is the advanced evaluation rule tier in Structra. It includes rules `P-01` through `P-20`.

:::note Important
`Basic`, `Pro`, and `Enterprise` on these pages are **evaluation rule taxonomy tiers**, not subscription or billing plan names.
:::

## What Pro Covers

The Pro tier validates distributed-systems maturity and operational reliability at scale:
- Horizontal scaling paths and sharding quality
- Read/write ratio alignment and rate limiting strategy
- Latency budgets and connection pooling
- Queue safety (idempotent consumers, DLQ)
- CAP trade-offs, distributed transaction handling, retries, and circuit breakers
- SLA-to-architecture alignment and graceful degradation

These rules are designed for systems that have moved beyond foundational architecture concerns.

## Rule Scope

- Rule IDs: `P-01` to `P-20`
- Rule count: 20
- Typical use: growth-stage systems, multi-service architectures, and scale readiness reviews

## Subscription Gating (Workspace Plan)

- `Core`: does not evaluate Pro rules
- `Individual`: evaluates Pro rules
- `Team`: evaluates Pro rules
- `Enterprise`: evaluates Pro rules

## Recommended Evaluation Flow

1. Clear critical Basic failures first.
2. Use Pro results to harden scale and fault-handling design.
3. Continue to Enterprise tier when you need strict governance, security, and observability enforcement.
