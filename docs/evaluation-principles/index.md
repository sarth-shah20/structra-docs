---
sidebar_position: 4
title: Evaluation Principles
slug: /evaluation-principles
---

# Evaluation Principles

The Structra evaluation framework is organized into principle documents that progressively increase architectural rigor.

- [Structra Basics](/evaluation-principles/structra-basics)
- [Production System Design Principles](/evaluation-principles/production-system-principles)

## How Principles Are Applied

- Rules are executed by the evaluation engine based on workspace tier.
- Every rule maps to a specific architecture concern (availability, consistency, cost, scale, resilience).
- Violations are designed to be actionable and remediation-focused.

## Evidence Expectations

- Architecture diagram or component inventory
- Datastore and message-flow definitions
- Throughput and growth assumptions
- Failure-mode and recovery strategy
- Security and observability controls

## Rule Taxonomy

- **Basic (F-01 to F-20)**: Fundamental production hygiene checks
- **Pro (P-01 to P-20)**: Distributed systems and scale pattern checks
- **Enterprise (P-21 to P-30)**: Strict large-scale architecture constraints

These are internal rule-complexity tiers, not subscription plans.

## Subscription Gating

- **Core**: evaluates Basic rules only (`F-01` to `F-20`)
- **Individual**: evaluates all 50 rules
- **Team**: evaluates all 50 rules
- **Enterprise**: evaluates all 50 rules (plus custom rules in future)

Everyone can read all docs. Enforcement by workspace plan happens in the evaluation engine.
