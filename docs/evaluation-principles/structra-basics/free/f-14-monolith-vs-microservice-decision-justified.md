---
title: "F-14 Architecture Style"
---

# F-14 Architecture Style

## What This Rule Checks

Structra checks that your architectural style — monolith or microservices — is appropriate for your team size,
deployment frequency, and the actual complexity of your system. Applying the wrong style is one of the most
expensive architectural mistakes to undo.

## What a Monolith Is

A monolith is a single deployable unit. All the code — user management, payments, notifications, search —
runs in one process and is deployed together. When you deploy, everything deploys.
Monoliths have a bad reputation they don't deserve. For small teams and early-stage products, they are the
correct choice: simpler to develop, test, debug, and deploy. You don't need distributed systems to build a product
with tens of thousands of users.

## What Microservices Are

Microservices split the system into small, independently deployable services, each responsible for a specific
domain. The user service, the payment service, and the notification service each run as separate processes,
communicate over a network, and can be deployed independently.

Microservices solve real problems — but only problems that arise at a certain scale and organizational size.

## When Each Is Appropriate

## Choose a Monolith when:

- Team size is fewer than ~10 engineers.
- The product is early-stage and requirements change frequently.
- You don't need different parts of the system to scale independently.
- Deployment simplicity and development speed are priorities.


## Choose Microservices when:

- You have multiple independent teams that need to deploy without coordinating with each other.
- Different parts of the system have genuinely different scaling requirements (e.g., your search service needs 10x more capacity during sale events, but your user service does not).
- You need to use different technologies for different components.
- The system is large and mature enough that a monolith has become a bottleneck for independent development.


## Common Violations

Premature microservices: A startup with 3 engineers designs 12 microservices. Now they spend 80% of their
time managing infrastructure, distributed tracing, and network timeouts instead of building product.

A monolith with strict independent scaling requirements: A video processing system where the transcoding
load is 100x the load of the user API. These have fundamentally different scaling needs and shouldn't be
coupled in the same deployable unit.

## Why This Rule Exists

The microservices trend has led many teams to adopt distributed systems complexity before they've outgrown a
monolith. The rule forces an explicit justification: not "we chose microservices because it's modern," but "we
chose microservices because we have 15 independent teams who need to deploy without coordination."
