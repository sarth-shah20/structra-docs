---
title: "P-11 Idempotent Consumers"
---

# P-11 Idempotent Consumers

What This Rule Checks
Structra checks that every message queue consumer in your design handles duplicate message delivery without
producing duplicate side effects. Most message queues guarantee "at least once" delivery — meaning a message
may be delivered more than once. Consumers that are not designed for this will process the same message
twice, causing double charges, duplicate emails, or corrupted state.

Why Queues Deliver Duplicates
"At least once" delivery is the default in most brokers (AWS SQS, Kafka, RabbitMQ with acknowledgments).
Here's why duplicates happen:

  1. The broker delivers message M to Consumer A.
  2. Consumer A processes M and starts to send an acknowledgment.
  3. Consumer A crashes (or the network drops) before the acknowledgment reaches the broker.
  4. The broker sees no acknowledgment and re-delivers M, either to Consumer A after it restarts, or to
      Consumer B.
  5. M is now processed twice.
This is not a bug in the broker — it's the correct behavior for a system that prioritizes not losing messages over
not duplicating them.

How to Make a Consumer Idempotent
Track processed message IDs Before processing a message, check if you've already processed a message with
this ID. If yes, skip it. Store processed IDs in Redis (with TTL) or a database table.

Design operations to be naturally idempotent An operation is idempotent if running it twice has the same
effect as running it once.

      Setting a value: UPDATE users SET email_verified = true WHERE user_id = 123 — running this twice
      changes nothing after the first execution. Idempotent.
      Incrementing a counter: UPDATE accounts SET balance = balance - 10 WHERE user_id = 123 — running this
      twice deducts 20. Not idempotent. Fix by recording the specific transaction ID and checking for it first.


Use idempotency keys on downstream APIs When your consumer calls an external API (e.g., triggering a
payment), pass the original message ID as the idempotency key so the API deduplicates on its end.
