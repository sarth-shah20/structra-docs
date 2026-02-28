---
title: "P-12 Dead Letter Queue"
---

# P-12 Dead Letter Queue

## What This Rule Checks

Structra checks that every message queue or event stream in your design has a Dead Letter Queue (DLQ) — a
holding area for messages that fail to be processed after a defined number of retries. Without a DLQ, failed
messages either block the queue, are silently dropped, or cause infinite retry loops.

## What Happens Without a DLQ

### Scenario 1:

Messages are dropped A consumer tries to process a malformed message, fails, and after retrying

3 times, gives up and moves on. The message is gone. You have no record of the failure, no way to investigate,
no way to reprocess.

### Scenario 2:

Infinite retry loop A message with a bug in the data causes the consumer to throw an exception

every time. Without a retry limit, it retries forever, consuming resources and blocking other messages (in
ordered queues).

### Scenario 3:

Queue head-of-line blocking In ordered queues (Kafka partitions), an unprocessable message at

the front of the queue blocks all subsequent messages in that partition from being processed.

## How a DLQ Solves This

When a message exceeds its maximum retry count (typically 3–5 retries), it is automatically moved to the Dead
Letter Queue instead of being dropped or retried indefinitely. The DLQ:

- Preserves the failed message for inspection and debugging.
- Allows engineers to investigate why the message failed.
- Allows the message to be corrected and re-queued once the bug is fixed.
- Prevents bad messages from blocking healthy processing.


## DLQ Monitoring

A DLQ should never silently accumulate messages. Set up alerts to notify the on-call team when the DLQ
message count exceeds zero (or a defined threshold). A non-empty DLQ is always a signal that something needs
investigation.

## Why This Rule Exists

Silent data loss in asynchronous systems is particularly insidious — you don't know you've lost data until you
notice a discrepancy downstream. DLQs transform silent failures into visible, actionable signals.
