---
title: Basic
description: Basic taxonomy rules F-01 through F-20.
---

# Basic

Basic is the foundational evaluation rule tier in Structra. It includes rules `F-01` through `F-20`.

:::note Important
`Basic`, `Pro`, and `Enterprise` on these pages are **evaluation rule taxonomy tiers**, not pricing or subscription plans.
:::

## What Basic Covers

The Basic tier focuses on architecture hygiene and baseline production readiness:
- Protocol and boundary correctness
- Single points of failure and statelessness
- Database and caching fundamentals
- Authentication and external dependency boundaries
- Core reliability design checks (failure modes, replication, async boundaries)

These rules establish a minimum quality bar before deeper scale and compliance checks.

## Rule Scope

- Rule IDs: `F-01` to `F-20`
- Rule count: 20
- Typical use: early architecture reviews, first-pass quality checks, and fast baseline audits

## Subscription Gating (Workspace Plan)

- `Core`: evaluates Basic only (`F-01` to `F-20`)
- `Individual`: evaluates all tiers (`F-01` to `F-20`, `P-01` to `P-30`)
- `Team`: evaluates all tiers (`F-01` to `F-20`, `P-01` to `P-30`)
- `Enterprise`: evaluates all tiers (`F-01` to `F-20`, `P-01` to `P-30`) plus custom extensions in future

## How to Use This Section

- Start here if you are new to Structra evaluation.
- Resolve all high-confidence Basic failures first.
- Then move to Pro and Enterprise rule groups for deeper resilience, scale, and governance validation.
