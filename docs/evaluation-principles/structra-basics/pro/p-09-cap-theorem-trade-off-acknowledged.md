---
title: "P-09 CAP Tradeoff"
---

# P-09 CAP Tradeoff

## What This Rule Checks

Structra checks that for every distributed data store in your design, you've acknowledged the CAP theorem
trade-off — specifically what the system does when a network partition occurs. Ignoring partition behavior
means the system has an undocumented behavior in one of the most critical failure scenarios.

## The CAP Theorem

The CAP theorem states that a distributed system can guarantee at most two of the following three properties
simultaneously:

- Consistency (C): Every read receives the most recent write or an error (not stale data).
- Availability (A): Every request receives a response — not an error — even if it's not the most recent data.
- Partition Tolerance (P): The system continues operating when network communication between nodes is disrupted (a network partition).


Since network partitions are a real and unavoidable occurrence in distributed systems (network cables fail, data
centers lose connectivity), Partition Tolerance is not optional. The real choice is between CP (consistency +
partition tolerance) and AP (availability + partition tolerance).

## CP Systems — Consistency over Availability

During a partition, the system refuses requests rather than risk returning stale data. Some nodes may become
unavailable until the partition heals.
Examples: ZooKeeper, HBase, etcd, traditional RDBMS with synchronous replication. Use when: Financial
transactions, distributed locks, leader election — anything where returning stale data causes real harm.

## AP Systems — Availability over Consistency

During a partition, the system continues to serve requests from all nodes, but different nodes may return
different (potentially stale) data. After the partition heals, the system reconciles the differences (eventual
consistency).

Examples: Cassandra (tunable, defaults to AP), DynamoDB (tunable), CouchDB. Use when: Social feeds,
product catalogs, shopping carts, DNS — scenarios where availability matters more than perfect consistency.

## What the Design Must State

## For each distributed data store:

1. Is it CP or AP?
2. During a network partition: does the system return stale data (AP), or reject requests until consistency is

- restored (CP)?
3. Is this behavior consistent with the business requirements of the operations using this store?
