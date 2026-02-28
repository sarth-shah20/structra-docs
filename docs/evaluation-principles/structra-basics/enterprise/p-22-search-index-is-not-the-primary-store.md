---
title: "P-22 Search Indexing"
---

# P-22 Search Indexing

## What This Rule Checks

Structra checks that search engines (Elasticsearch, OpenSearch, Solr) are treated as derived, eventually
consistent read indexes — not as the authoritative source of truth. Writes must go to the primary store first; the
search index is populated asynchronously.

## Why Search Engines Are Not Databases

Search engines are extraordinary tools for full-text search, relevance ranking, faceted filtering, and
aggregations. But they are not built to be authoritative data stores:

- Durability: Search engines prioritize search performance over ACID guarantees. They can lose recently indexed data in certain failure scenarios.
- Transactional consistency: Elasticsearch doesn't support multi-document transactions. You can't atomically update multiple documents.
- Authoritative source: Search indexes are typically refreshed on a configurable interval (Elasticsearch defaults to 1 second), meaning they are inherently eventually consistent.

## The Correct Pattern

  Write: Client → API → Primary Database (PostgreSQL, MongoDB, etc.)

- ↓
- Change Data Capture (CDC)
- ↓
- Search Index (Elasticsearch)


## Read:

   - Structured queries → Primary Database
   - Full-text/faceted search → Search Index


1. All writes go to the primary store (PostgreSQL, MongoDB, etc.).
2. Changes propagate to the search index asynchronously via CDC (Debezium, custom change feed listener) or event stream.

3. The search index serves search queries. The primary database serves queries requiring authoritative data.


## Common Violation

An API endpoint that writes a new product directly to Elasticsearch and never writes it to a primary database. If
Elasticsearch loses that document (rare but possible), there is no recovery path — the data is gone. Additionally,
you cannot perform transactional operations that span multiple products.

## Why This Rule Exists

Treating a search index as a primary store is often done for convenience — Elasticsearch is fast and flexible.
The danger is only apparent when data is lost or corrupted. By then, recovery is difficult because there's no
primary source to restore from.
