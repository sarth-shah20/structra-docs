---
title: "P-14 Query Partitioning"
---

# P-14 Query Partitioning

## What This Rule Checks

Structra checks that after partitioning or sharding your data, all the queries your system actually needs to run
can still be answered efficiently. It's common to design a sharding scheme that makes writes fast but
inadvertently makes certain reads extremely expensive.

## The Scatter-Gather Anti-Pattern

When a query requires data that is spread across all shards, the database must:

1. Send the query to every shard (scatter).
2. Collect all results.
3. Merge and sort them (gather).


At small scale, this works. At large scale (100+ shards), scatter-gather is slow, resource-intensive, and scales
poorly.
Example of a Partitioning Scheme That Breaks Queries
Sharding by user_id: You shard a messaging system by user_id . All messages sent by User 42 are on Shard 3.

## Queries that work efficiently:

- "Fetch all messages sent by User 42" → goes directly to Shard 3.
- "Fetch the message thread between User 42 and User 99" → might need to check Shard 3 (User 42's messages) and another shard (User 99's messages).


## Queries that are broken:

- "Find all messages containing the word 'urgent' across all users" → must query all shards.
- "Find the 10 most recent messages sent by any user" → must query all shards and merge results.


## How to Address It

- Accept the limitation: If scatter-gather queries are infrequent (run by admins, not users), the performance hit may be acceptable.
- Maintain a secondary index: Store a separate, differently-sharded or non-sharded index that supports the query pattern that doesn't fit the primary sharding scheme.
- Use a search engine: Offload queries that don't fit sharding to Elasticsearch, which is designed for searching across all documents.
- Duplicate data: In some cases, write data to two sharding schemes simultaneously to support multiple query patterns.


## Why This Rule Exists

Sharding decisions made for write performance often break read performance. Discovering this after sharding
millions of records requires a painful data migration. The design must prove that all critical query patterns are
feasible under the chosen partitioning scheme.
