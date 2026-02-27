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

## Tier Progression

- **Free**: Fundamental production hygiene checks
- **Pro**: Distributed systems and scale pattern checks
- **Enterprise**: Strict large-scale architecture constraints

Everyone can read all docs. Enforcement by tier happens in the evaluation engine.
