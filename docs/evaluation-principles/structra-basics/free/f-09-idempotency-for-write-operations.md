---
title: "F-09 Write Idempotency"
---

# F-09 Write Idempotency

## What This Rule Checks

Structra checks that critical write operations — particularly payments, order creation, and any mutation that
must not be duplicated — implement idempotency. Without it, network retries can cause the same operation to
execute twice, with real-world consequences like charging a customer twice.

## What Idempotency Means

An operation is idempotent if performing it multiple times produces the same result as performing it once.

- GET /users/123 is naturally idempotent — you can call it a hundred times and you always get the same user record, nothing changes.
- POST /orders is not naturally idempotent — calling it twice creates two orders.


## Why Retries Happen (and Why They're Unavoidable)

Networks are unreliable. A client sends a POST /payments request, the server processes it and charges the card,
but the response is lost in transit. The client never receives confirmation. After a timeout, the client retries —
and the payment gets charged again.

This isn't a hypothetical. It happens in production constantly. Mobile apps have flaky connections. Distributed
services have transient failures. Retry logic is built into almost every HTTP client and service mesh by default.

## How Idempotency Keys Solve This

The client generates a unique Idempotency-Key (a UUID or similar) and includes it in the request header. The
server uses this key to track whether it has already processed this request.

1. First request arrives with Idempotency-Key: abc-123 . The server processes the payment, records the result

- in a database keyed by abc-123 .
2. The response is lost. The client retries with the same Idempotency-Key: abc-123 .
3. The server sees this key, looks it up, finds the original result, and returns it — without processing the

- payment again.


The customer is charged exactly once, regardless of how many times the request is sent.

## What Needs Idempotency Keys

- Payment endpoints
- Order creation
- Account creation
- Any endpoint that triggers an irreversible action (sending an SMS, dispatching a physical shipment)
- Any endpoint where duplication has a business cost


## What Doesn't Need Idempotency Keys

- Pure reads (already idempotent)
- Operations that are naturally idempotent (setting a field to a specific value)
- Low-stakes operations where duplicates are harmless


## Why This Rule Exists

Double charges, duplicate orders, and double-sent emails are among the most embarrassing and costly
production bugs. They're almost always caused by missing idempotency. This rule exists to catch that gap
before it reaches production.
