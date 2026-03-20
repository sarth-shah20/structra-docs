---
sidebar_position: 2
title: Getting Started
description: How to prepare architecture inputs, run your first Structra evaluation, and interpret findings.
slug: /getting-started
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Getting Started

This guide walks through the fastest path to a useful first evaluation in Structra. The goal is not just to run the engine, but to provide enough architectural context for the results to be meaningful and actionable.

## What You Need Before Evaluating

Structra works best when your system description is concrete enough to expose architecture decisions, not just component names.

Prepare the following before you start:

- Core services, APIs, workers, queues, databases, caches, and external dependencies
- Expected traffic profile, including current scale and reasonable growth assumptions
- Read/write characteristics and latency sensitivity
- Availability expectations such as `SLO`, uptime target, or recovery expectations
- Known failure scenarios, risk areas, and operational constraints

## Set Up the Workspace Correctly

Create a workspace and make sure the architecture view reflects the real system shape as closely as possible.

- Add the major system components and their relationships
- Distinguish synchronous paths from asynchronous ones where relevant
- Capture shared infrastructure such as caches, search, object storage, and observability tooling
- Confirm the workspace plan: `Core`, `Individual`, `Team`, or `Enterprise`

The selected workspace plan controls which rules are enforced during evaluation.

## Provide High-Signal Architecture Inputs

Evaluation quality depends heavily on input quality. Thin or ambiguous inputs usually produce weak findings or miss important issues.

Strong inputs usually include:

- Throughput expectations and growth horizon
- Consistency requirements for important write flows
- Data storage choices and why they were made
- Retry, failover, and recovery expectations
- Security boundaries such as authentication, authorization, and secret handling

## Run the First Evaluation

Once the architecture context is in place, run the evaluation and treat the first pass as a baseline, not a final score.

1. Start the evaluation from the workspace.
2. Review failures before warnings.
3. Open each triggered rule and read the explanation, not just the status.
4. Group findings by theme such as reliability, data correctness, scale, or security.

## How to Interpret Findings

Not every finding carries the same operational weight. A useful review sequence is:

- Resolve architecture correctness gaps first
- Then address obvious reliability and failure-handling issues
- Then improve scalability and operability concerns
- Finally tighten governance, observability, and compliance-oriented controls

Treat repeated findings in the same area as signals of a design pattern problem, not isolated mistakes.

## Remediate and Re-Run

Structra is designed for iterative use. Re-run evaluation whenever the architecture meaningfully changes.

- Update the model after design decisions are revised
- Re-evaluate after introducing new data stores, async boundaries, or external dependencies
- Compare new findings against previous ones to confirm that fixes actually reduced risk

This is especially important before launches, migrations, or major scaling events.

## Common Avoidable Mistakes

- Running evaluation before basic system boundaries are documented
- Leaving cache, retry, replication, or failover strategy undefined
- Treating async processing as reliable without `DLQ`, retry, or idempotency design
- Ignoring read/write characteristics when choosing storage patterns
- Re-running evaluation too late, after implementation has already hardened poor design choices

## Recommended Next Step

After this page, read [Evaluation Principles](/evaluation-principles), then start with the `Basic` rules under [Structra Basics](/evaluation-principles/structra-basics). That gives you the fastest path to a credible first architecture review.
