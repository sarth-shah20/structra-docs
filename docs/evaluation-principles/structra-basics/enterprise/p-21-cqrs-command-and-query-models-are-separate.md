---
title: "P-21 CQRS Separation"
---

# P-21 CQRS Separation

## What This Rule Checks

Structra checks that designs applying the CQRS pattern maintain physically separate data models and stores for
writes (the command side) and reads (the query side). Using the same data store for both negates the
performance benefits of the pattern and is considered an incorrect application.

## What CQRS Is

CQRS (Command Query Responsibility Segregation) separates the model used to write data from the model
used to read data. This is motivated by the observation that writes and reads have fundamentally different
characteristics and can be optimized independently.

## Command side (writes):

- Focused on business logic and consistency.
- Normalized data model (no duplication).
- Optimized for write throughput and transactional integrity.
- Returns only a success/failure acknowledgment.


## Query side (reads):

- Focused on performance and flexibility.
- Denormalized data model, pre-joined for common queries.
- Optimized for read speed.
- Returns rich, pre-shaped data ready for the UI.


## How It Works in Practice

When a command is executed (e.g., "place order"), it:

1. Updates the write-side model (the normalized transactional database).
2. Publishes an event ("OrderPlaced").

A read-side projector listens for that event and updates the read-side model — a denormalized view optimized
for the UI. The read side might be a separate database, a pre-computed cache, or a search index.

When a user queries "show me all orders" or "show me the order details for order #123," they query the read-
side model directly. It returns pre-shaped data instantly, without any joins.

## The Wrong Way to Apply CQRS

## Using CQRS with the same database for reads and writes:

- Uses two different service layers that both hit the same database.
- The read service can't be independently scaled from the write service.
- The read schema is still constrained by the write schema's normalization.
- You get the complexity of CQRS without its performance benefits.


## When to Use CQRS

CQRS adds significant complexity. Apply it when:

- Your read and write workloads have very different scaling requirements.
- Your domain has complex queries that perform poorly against the normalized write model.
- You're already using event sourcing (CQRS and event sourcing are natural partners).
