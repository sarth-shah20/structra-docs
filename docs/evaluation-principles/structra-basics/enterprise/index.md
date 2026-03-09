---
title: Enterprise
description: Enterprise taxonomy rules P-21 through P-30.
---

# Enterprise

Enterprise is the highest evaluation taxonomy tier in Structra. It includes rules `P-21` through `P-30`.

:::note Important
`Basic`, `Pro`, and `Enterprise` here are **rule-tier labels** for evaluation depth, not subscription plans.
:::

## What Enterprise Covers

Enterprise-tier rules validate strict production-grade architecture controls:
- CQRS separation and search index correctness
- Time-series and object storage fit
- Secrets management and encryption declarations
- AuthN/AuthZ separation
- PII access auditing and compliance-oriented controls
- Full observability (logs, metrics, traces) and SLO-based alerting

These checks are intended for high-stakes systems where reliability, security, and governance must be explicit.

## Rule Scope

- Rule IDs: `P-21` to `P-30`
- Rule count: 10
- Typical use: regulated systems, critical production workloads, and architecture sign-off gates

## Subscription Gating (Workspace Plan)

- `Core`: does not evaluate Enterprise-tier rules
- `Individual`: evaluates Enterprise-tier rules
- `Team`: evaluates Enterprise-tier rules
- `Enterprise`: evaluates Enterprise-tier rules

## How This Relates to the Other Tiers

- Basic establishes foundational correctness.
- Pro validates distributed scale and resilience behavior.
- Enterprise enforces strict completeness across security, compliance, and observability.

Use all three tiers together for the full 50-rule evaluation model.
