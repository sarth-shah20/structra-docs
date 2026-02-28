---
title: "F-02 Failure Points"
---

# F-02 Failure Points

## What This Rule Checks

Structra scans your design for any component on the critical path that has no redundant counterpart. If that one
component fails, the entire system goes down. That's a single point of failure (SPOF), and it's unacceptable in a
production system.

## What the Critical Path Means

The critical path is the sequence of components a request must pass through to succeed. If a user submits an
order, the critical path might look like: Load Balancer → API Server → Database. Every component on this
path must be able to fail without taking the entire system with it.

## Common Single Points of Failure

Single Load Balancer If you have multiple API servers but only one load balancer distributing traffic, that load
balancer is a SPOF. Solution: use a redundant pair (active-passive) or a cloud-managed load balancer with built-
in redundancy.
Single Database Node A single primary database with no replica and no failover is the most common SPOF. If
that database crashes, writes and reads are both unavailable. Solution: always configure at least one replica and
an automated failover mechanism.

Single Message Broker If your system uses a message queue (e.g., for async jobs) and it's a single node, any
failure pauses all background processing. Solution: run message brokers in a cluster with replication.

Single API Gateway If all external traffic flows through one gateway instance with no redundancy, a gateway
restart or crash makes your entire API unreachable.

## What a Good Design Shows

- Load balancers either in an active-passive pair or managed by the cloud provider with built-in HA.
- A primary database with at least one replica and automatic failover (e.g., using Patroni, AWS RDS Multi- AZ, or similar).
- Message brokers running as a cluster (e.g., Kafka with multiple brokers, RabbitMQ with mirrored queues).
- Explicit notation that critical components are redundant.


## Why It Matters

Every production incident has a root cause. A disproportionate number of them are simply "we had one instance
of X and it crashed." Eliminating SPOFs is the single highest-leverage reliability improvement you can make.
This rule exists because designers often draw systems correctly in terms of logic but forget to think about what
happens when any individual box in their diagram disappears.
