---
title: "P-01 Horizontal Scaling"
---

# P-01 Horizontal Scaling

What This Rule Checks
Structra checks that every service in your design has a clear, described path for horizontal scaling — adding
more instances to handle increased load. If you can't articulate how a service scales without architectural
changes, it's a capacity ceiling that will eventually become a crisis.

What Horizontal Scaling Means
Vertical scaling (scaling up) means giving an existing server more CPU, more memory, or faster storage. It has
hard limits — you can only make one machine so powerful — and it requires downtime.

Horizontal scaling (scaling out) means adding more instances of the same service and distributing load across
them. There's no hard upper limit, and it can be done without downtime.

What a Scaling Path Looks Like for Different Services
Stateless API Servers The simplest case. Because they're stateless (Rule F-03), any instance can handle any
request. Scaling path: add more instances behind the load balancer. Auto-scaling groups in AWS/GCP can do
this automatically based on CPU or request rate.

Databases Read scaling: add read replicas. Write scaling: shard the database (Rule P-02). The sharding strategy
must be defined in advance.

Message Queue Workers Scale by adding more consumer instances. Most message queues (Kafka, SQS,
RabbitMQ) are designed for this — multiple consumers read from the same queue in parallel.

Stateful Services Services that must maintain state (e.g., a gaming server maintaining the state of an active
game) require more thought. State must be externalized (Redis, database) to allow horizontal scaling, or the
load balancer must use consistent hashing to route the same user to the same instance.

What the Design Must Show
For each service: a statement or annotation indicating how it scales. It doesn't need to be complicated —
"stateless, scales horizontally by adding instances behind the ALB" is a complete answer for an API server. For
databases, the sharding strategy or replica strategy counts.
Why This Rule Exists
Many designs implicitly assume infinite single-server capacity. When a service has no described scaling path,
the only option when it reaches its limit is an emergency architectural redesign under pressure. This rule forces
that conversation to happen at design time.
