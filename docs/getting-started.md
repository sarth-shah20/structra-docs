---
sidebar_position: 2
title: Getting Started
slug: /getting-started
---

# Getting Started

This guide helps you run your first evaluation quickly and interpret results.

## 1. Prepare Your Workspace

- Create a workspace in Structra.
- Add your system context (services, databases, queues, external dependencies).
- Confirm your selected tier (`Free`, `Pro`, or `Enterprise`).

## 2. Define Architecture Inputs

Provide clear input data before evaluating:

- Traffic expectations (current and projected)
- Read/write characteristics
- Availability target (SLO)
- Data consistency needs
- Known failure scenarios

## 3. Run Evaluation

- Start evaluation from your workspace.
- Review failed and warning checks.
- Open each finding to see why the rule triggered.

## 4. Remediate and Re-run

- Prioritize critical reliability and data-integrity findings first.
- Apply architecture fixes.
- Re-run evaluation after each major design change.

## Common Mistakes

- Missing cache strategy for read-heavy systems
- No DLQ/retry policy for async processing
- Undefined idempotency on critical write endpoints
- Missing failover strategy for single points of failure
