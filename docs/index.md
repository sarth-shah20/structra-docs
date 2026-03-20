---
sidebar_position: 1
title: Structra Documentation
description: Product documentation for Structra evaluation, architecture review workflows, and rule interpretation.
slug: /
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Structra Documentation

Structra helps engineering teams review software architecture quality using explicit evaluation rules, production design principles, and remediation-focused findings.

## What This Documentation Covers

This documentation explains how Structra evaluates systems, what evidence reviewers should prepare, and how to interpret rule outcomes across foundational, advanced, and enterprise-grade architecture concerns.

- Platform onboarding and first evaluation flow
- Account, identity, and profile behavior
- Evaluation rule taxonomy and workspace-plan gating
- Production architecture expectations for reliability, scale, security, and observability

## Documentation Map

- [Getting Started](/getting-started): first-use workflow, required architecture inputs, and evaluation cadence
- [Account and Identity](/account-and-identity): username rules, signup/login flows, and privacy boundaries
- [Evaluation Principles](/evaluation-principles): overview of Structra's evaluation framework and rule taxonomy
- [Structra Basics](/evaluation-principles/structra-basics): the 50-rule evaluation model, including Basic, Pro, and Enterprise rule groups
- [Production System Design Principles](/evaluation-principles/production-system-principles): advanced manual review principles for high-scale production systems

## Recommended Reading Path

If you are new to Structra, use this sequence:

1. Read [Getting Started](/getting-started) to understand the evaluation workflow.
2. Review [Evaluation Principles](/evaluation-principles) to understand how rules are organized and applied.
3. Start with [Structra Basics](/evaluation-principles/structra-basics), especially the `Basic` rule group.
4. Move to advanced material once your architecture has cleared foundational correctness concerns.

## How Structra Should Be Used

Structra is most effective when architecture evaluation happens before major implementation or infrastructure commitments become expensive to reverse.

- Use it during early design reviews to catch missing assumptions.
- Use it before scale events or major product launches to expose reliability gaps.
- Use it after meaningful architecture changes so findings reflect the current design.
- Use it as a repeatable quality gate rather than a one-time checklist.

## Access Model

Everyone can read the full documentation set. Rule enforcement happens inside the evaluation engine based on workspace plan.

- `Core` evaluates `F-01` through `F-20`
- `Individual` evaluates all standard rules
- `Team` evaluates all standard rules
- `Enterprise` evaluates all standard rules, with room for future custom extensions

## Documentation Style and Interpretation

Across these pages, rule IDs such as `F-01` or `P-14` refer to evaluation checks, not product features. Labels such as `Basic`, `Pro`, and `Enterprise` describe rule-depth taxonomy, not billing names.

When a page includes examples, expected inputs, or evidence guidance, treat them as review aids for producing better architecture decisions and clearer evaluation output.
