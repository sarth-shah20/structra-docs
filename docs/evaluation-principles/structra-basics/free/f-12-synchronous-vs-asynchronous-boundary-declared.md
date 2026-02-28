---
title: "F-12 Sync Async"
---

# F-12 Sync Async

## What This Rule Checks

Structra checks that your design explicitly distinguishes between operations where the user waits for a response
(synchronous) and operations that are handed off to a background process (asynchronous). Failing to make this
distinction leads to architectures where slow operations are placed on the critical path, making the user wait for
things they don't need to wait for.

## Synchronous Operations

A synchronous operation completes before the response is returned to the caller. The caller blocks — it waits,
doing nothing, until the result comes back.

## Examples:

- Validating a login and returning a JWT.
- Fetching a user profile.
- Checking if a coupon code is valid.
- Writing an order to the database and returning the order ID.


These operations are fast and the user genuinely needs the result before proceeding.

## Asynchronous Operations

An asynchronous operation is handed off to a queue or background worker. The API responds immediately
(often with a 202 Accepted status), and the actual work happens later, out of band.

## Examples:

- Sending a welcome email after registration.
- Generating a PDF invoice after an order is placed.
- Resizing uploaded images into multiple formats.
- Dispatching a push notification.
- Recording an analytics event.
- Processing a video after upload.


None of these need to complete before the user gets confirmation. Making the user wait for email delivery or
PDF generation is unnecessary latency.

## The Queue Pattern

## The standard pattern for asynchronous work:

1. API receives the request, validates it, persists the data, and publishes a message to a queue (e.g., "send

- welcome email to user 4521").
2. API responds immediately: 201 Created .
3. A background worker picks up the message from the queue and sends the email.


The user never waits for the email to be sent. If the email service is slow or down, the order is still created
successfully and the email will eventually be sent when the worker processes the queued message.

## Why This Rule Exists

Placing slow operations on the critical path is one of the most common causes of high latency and poor user
experience. It's also operationally fragile — if your email service is down, should users be unable to create
accounts? No. Explicitly declaring the sync/async boundary forces this decision to be made deliberately.
