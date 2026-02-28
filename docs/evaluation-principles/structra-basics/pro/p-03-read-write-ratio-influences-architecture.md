---
title: "P-03 Traffic Ratio"
---

# P-03 Traffic Ratio

## What This Rule Checks

Structra checks that your stated read/write ratio is actually reflected in your architectural choices. A design that
says "this is a read-heavy system (95% reads)" but shows no read replicas and no caching is internally
inconsistent — the architecture doesn't match the workload it was designed for.

## Why the Ratio Matters

Different read/write ratios call for fundamentally different architectural patterns. Getting this wrong means
either over-engineering or under-engineering the most critical parts of your system.

## Read-Heavy Systems (>80% reads)

The challenge is serving a high volume of reads efficiently without overloading the database. The architecture
must show:

- Read replicas to distribute read queries across multiple database nodes.
- Aggressive caching (Redis, Memcached) in front of the database to serve repeated reads from memory.
- CDN for static or semi-static content.
- Read replicas receive asynchronously replicated data from the primary; all writes still go to the primary.


Examples: News sites, e-commerce product catalogs, social media feeds (read-heavy by nature).

## Write-Heavy Systems (>50% writes)

The challenge is ingesting a high volume of writes without overloading the database. The architecture must
show:

- Write buffer / message queue as the ingestion layer. Instead of writing directly to the database, incoming writes go to a fast queue (Kafka, SQS). Workers drain the queue and write to the database at a controlled rate.
- LSM-tree-based storage engines (used by Cassandra, RocksDB) that are optimized for write throughput by batching writes in memory before flushing to disk.
- Batch processing where writes are aggregated and committed in bulk.
Examples: IoT sensor data, logging pipelines, financial tick data, real-time bidding systems.

## Balanced Systems

Many systems are balanced (~50/50) and require a combination: a caching layer for popular reads, and a write
buffer for bursty write periods.

## Why This Rule Exists

Stating a read/write ratio is easy. Actually designing for it is harder. This rule ensures the stated ratio drives
concrete architectural decisions rather than being a meaningless annotation.
