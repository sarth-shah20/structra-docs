---
title: "P-10 Transaction Strategy"
---

# P-10 Transaction Strategy

## What This Rule Checks

Structra checks that any operation that writes to more than one data store uses a recognized coordination
mechanism. Writing to two databases or two services in the same operation without coordination creates a
window where one write succeeds and the other fails, leaving your data in an inconsistent state.

## The Problem

## Imagine an order placement flow that:

1. Deducts inventory from the Inventory Service (writes to the Inventory DB).
2. Creates an order in the Order Service (writes to the Order DB).


If step 1 succeeds and step 2 fails — due to a crash, a timeout, or any other reason — you now have:

- Inventory reduced by 1.
- No order created.


The item has been "sold" but the order doesn't exist. The two databases are inconsistent.
Accepted Coordination Mechanisms

Two-Phase Commit (2PC) A coordinator asks all participating services to "prepare" (vote yes or no), then
issues a "commit" or "abort" based on all votes. Guarantees atomicity across services, but is slow (requires
multiple round trips) and the coordinator is a single point of failure.

Use when: You need strict atomicity and can tolerate the latency, typically in traditional enterprise settings.

Saga Pattern A sequence of local transactions, each of which publishes an event or message that triggers the
next step. If any step fails, compensating transactions are executed to undo the previous steps.

- Choreography-based: Each service subscribes to events and decides what to do. Decentralized.
- Orchestration-based: A central orchestrator directs each service in the saga.


Use when: You need distributed transactions across microservices and can tolerate eventual consistency.

Outbox Pattern Instead of writing to a second service directly, the first service writes the "message to send"
into an outbox table in the same database transaction as its main write. A separate process reads from the outbox
table and delivers the message. Atomicity is guaranteed within the single database transaction.

Use when: You need to reliably publish an event after a database write, without the risk of writing to the DB but
failing to publish the event (or vice versa).
