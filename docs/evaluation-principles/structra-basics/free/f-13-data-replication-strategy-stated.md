---
title: "F-13 Data Replication"
---

# F-13 Data Replication

What This Rule Checks
Structra checks that any design using a primary database explicitly states its replication strategy. A single
database node with no replication is both a single point of failure and a bottleneck for read traffic.

What Replication Is

Replication is the process of continuously copying data from one database node (the primary) to one or more
other nodes (replicas). If the primary fails, a replica can be promoted to become the new primary. Replicas can
also serve read queries, distributing load away from the primary.

Replication Topologies
Primary-Replica (Master-Slave) One primary node handles all writes. One or more replica nodes receive a
continuous stream of changes from the primary and apply them. Replicas serve read queries.

This is the most common setup. It separates read and write traffic: writes go to the primary, reads can go to any
replica.

Primary-Primary (Multi-Master) Two or more nodes each accept both reads and writes. Conflicts (two nodes
receiving different updates to the same record simultaneously) must be resolved. This is significantly more
complex and should only be used when write availability across multiple regions is required.

Synchronous vs Asynchronous Replication

      Synchronous: The primary waits for the replica to confirm it has received and applied the write before
      acknowledging success to the client. Zero data loss, but higher write latency.
      Asynchronous: The primary acknowledges the write immediately and replicates in the background. Lower
      write latency, but a brief window where the replica lags — if the primary crashes in that window, a tiny
      amount of data can be lost.


What the Design Must Show

      At least one replica for production systems with read traffic.
      Whether replication is synchronous or asynchronous.
      A failover mechanism: how does the system detect that the primary is down and promote a replica?
      (Tools: Patroni, AWS RDS Multi-AZ, PgBouncer with Patroni, Orchestrator for MySQL.)


Why This Rule Exists
A database with no replication means a single disk failure or a single crashed VM loses all your data
permanently. For anything serving real users, that's not acceptable. This rule ensures durability and read
scalability are addressed explicitly.
