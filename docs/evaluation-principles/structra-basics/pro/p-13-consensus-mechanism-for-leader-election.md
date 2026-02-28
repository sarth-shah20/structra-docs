---
title: "P-13 Leader Consensus"
---

# P-13 Leader Consensus

## What This Rule Checks

Structra checks that any component in your design that requires a single authoritative node — a primary
database, a distributed lock holder, a job scheduler — specifies how that node is elected and how the system
handles disputes. Without an explicit consensus mechanism, you risk "split-brain": two nodes both believe they
are the leader simultaneously, each accepting writes, and the data diverges.

## What Leader Election Is

In a distributed system with multiple nodes, some operations require exactly one node to be in charge at any
given time:

- A database primary that accepts all writes.
- A lock manager that grants exclusive access to a shared resource.
- A job scheduler that ensures a cron job runs exactly once across a cluster.


When the current leader fails, the remaining nodes must agree on who the new leader is. This agreement process
— where nodes reach a common decision despite possible communication failures — is called consensus.

## The Split-Brain Problem

## Without a consensus mechanism, a naive failover might look like this:

1. Primary database becomes unreachable (network partition, not actual crash).
2. Each remaining node independently decides it should be the new primary.
3. Now there are two primaries, both accepting writes.
4. When the network heals, the two primaries have divergent data. There is no clean way to merge them.


This is split-brain. It's catastrophic for data integrity.

## Consensus Tools

ZooKeeper A widely used distributed coordination service that implements the ZAB consensus protocol.
Provides primitives for distributed locks, leader election, and configuration management. Used extensively in
the Hadoop/Kafka ecosystem.

etcd A distributed key-value store that implements the Raft consensus algorithm. Used as the backing store for
Kubernetes cluster state. Highly reliable and operationally simpler than ZooKeeper.

Raft (the algorithm) A consensus algorithm designed to be more understandable than Paxos. Many databases
and distributed systems implement it directly (CockroachDB, TiKV, etcd). When a leader fails, remaining nodes
hold an election; a node wins by receiving votes from a majority (quorum) of nodes.

## Why This Rule Exists

Leader election sounds like an implementation detail, but it is one of the hardest problems in distributed
systems. Undeclared or naive leader election is a common cause of data corruption incidents in production. The
design must specify the mechanism explicitly.
