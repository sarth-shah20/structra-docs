---
title: "P-07 Async Processing"
---

# P-07 Async Processing

## What This Rule Checks

Structra checks that operations which don't need to complete before responding to the user are offloaded to
asynchronous queues rather than executed synchronously on the critical path. Every operation that runs
synchronously makes the user wait — even if the user doesn't need the result of that operation.

## The Critical Path

The critical path of a request is the minimum set of operations that must complete before you can respond. For
an order creation endpoint, the critical path is:

1. Validate the request.
2. Check inventory.
3. Write the order to the database.
4. Return the order ID to the user.


Everything else is off the critical path.

## Operations That Must Be Async

These operations are not needed before the user gets their response and should always be queued:

- Email notifications (order confirmation, password reset, welcome email).
- Analytics events (recording that a user clicked a button or completed a purchase).
- Push notifications to mobile devices.
- Image or video processing (resizing uploaded images, generating thumbnails, transcoding videos).
- PDF generation (invoices, reports).
- Webhook delivery to third parties.
- Inventory or index updates to secondary systems.
- Loyalty points calculation after a purchase.


## The Pattern

## POST /orders

1. Validate input
2. Write order to DB
3. Publish "order_created" event to queue
4. Return 201 Created (immediately)


## [Background worker processes "order_created" event]

## → Sends confirmation email

   → Updates analytics
   → Notifies warehouse system
   → Generates invoice PDF


The user receives their order confirmation in 50ms. The email arrives 2 seconds later. The invoice PDF is ready
in 30 seconds. None of these delays affect the user's experience of the checkout flow.

## Why This Rule Exists

Placing slow operations on the critical path is a performance tax that users pay on every request. It also creates
fragile dependencies: if the email service is slow, checkout is slow. If the PDF generator is down, orders can't be
created. Async processing decouples these concerns.
