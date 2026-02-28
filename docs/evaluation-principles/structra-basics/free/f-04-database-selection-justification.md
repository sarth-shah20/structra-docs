---
title: "F-04 DB Choice"
---

# F-04 DB Choice

## What This Rule Checks

Structra checks that every database in your design was chosen because of its fit with the access pattern — not
because it's familiar, popular, or "good enough." A wrong database choice creates performance problems that
are extremely expensive to fix after data is already in production.

## The Main Database Categories and When to Use Them

Relational Databases (PostgreSQL, MySQL) The right choice when your data has clear relationships, your
queries are complex (joins across multiple tables), and you need transactional guarantees (ACID: Atomicity,
Consistency, Isolation, Durability). Relational databases ensure that when you transfer money from Account A
to Account B, either both updates happen or neither does.
Use when: Financial transactions, user accounts with relationships, order management, inventory — anything
where correctness and consistency are non-negotiable.

Document Stores (MongoDB, Firestore) The right choice when your data structure varies between records,
evolves frequently, or is naturally hierarchical (a product with varying attributes, a blog post with embedded
comments). Document stores let you store an entire object as one record without normalizing it across many
tables.

Use when: Content management, catalogs with variable attributes, user preferences, configurations.

Key-Value Stores (Redis, DynamoDB) The right choice for extremely high-throughput lookups where you
always access data by a single key. Key-value stores can handle millions of operations per second and return
results in microseconds.

Use when: Caching (Redis), session storage, rate limiting counters, leaderboards, feature flags.

Column-Family / Wide-Column Stores (Cassandra, HBase) The right choice for append-heavy workloads
where data is time-ordered or where you read large ranges of rows for the same partition. Cassandra, for
example, is exceptional at writing millions of events per second and reading all events for a given user in a time
range.

Use when: Time-series data, activity feeds, IoT sensor data, audit logs at massive scale.

Search Engines (Elasticsearch, OpenSearch) Not a primary database — but the right choice for full-text
search, faceted filtering, and relevance-ranked results. They ingest data from a primary store and make it
searchable.

Use when: Product search, document search, log analysis, any feature requiring free-text search with ranking.

## Common Violations

- Using a relational database for a social media feed that writes millions of events per second (write scalability problem).
- Using MongoDB for a financial ledger where double-entry bookkeeping requires strict transactional guarantees across multiple records.
- Using a relational database for storing and searching millions of product descriptions by keyword (full- text search is not what RDBMS are optimized for).


## Why It Matters

Your database is the hardest part of your system to change. Migrating from one database to another under load,
with millions of existing records, while maintaining uptime, is one of the most difficult engineering projects a
team can undertake. This rule forces the decision to be made consciously and correctly from the start.
