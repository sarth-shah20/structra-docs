---
title: "P-02 Sharding Strategy"
---

# P-02 Sharding Strategy

## What This Rule Checks

When your design includes database sharding, Structra checks that the shard key is well-chosen — high in
cardinality, evenly distributing writes, and aligned with query patterns. A bad shard key creates "hot shards"
where one node receives most of the traffic while others sit idle.

## What Sharding Is

Sharding splits a large dataset across multiple database nodes, each storing a subset of the data. If you have 1
billion users and shard by user ID, Shard 1 might hold users 1–250M, Shard 2 holds users 250M–500M, and so
on. Writes for a given user always go to the same shard; reads for that user query the same shard.

## What Makes a Good Shard Key

High cardinality The shard key must have many distinct values so that data distributes across shards roughly
evenly. user_id (millions of unique values) is good. country (200 values) is bad — if 40% of your users are in
the US, the US shard gets 40% of all traffic.

Evenly distributed writes The key must not create temporal hotspots. Using a timestamp as a shard key means
all writes go to the "current time" shard. Using a user ID (random distribution across the ID space) distributes
writes evenly.

Aligned with access patterns The key should be present in the most frequent queries so that those queries hit a
single shard rather than being "scatter-gathered" across all shards (which is slow). If you always query by
user_id , sharding by user_id means all data for a user is on one shard.


## Common Bad Shard Keys

- Sequential IDs or auto-increment: All new writes go to the latest shard. The latest shard is always the hot shard.
- Country or region: Uneven distribution; major markets overwhelm specific shards.
- Status field: Low cardinality; most records may share the same status.
- Timestamp: All writes cluster around "now," creating a single hot shard.
## Why This Rule Exists
A sharding strategy that looks reasonable in design can be catastrophic in production. Hotspot shards become
bottlenecks, negating all the benefits of sharding. This rule ensures the shard key analysis is done rigorously at
design time.
