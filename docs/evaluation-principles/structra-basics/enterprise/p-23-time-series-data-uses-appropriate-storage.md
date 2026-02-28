---
title: "P-23 Time-Series Storage"
---

# P-23 Time-Series Storage

## What This Rule Checks

Structra checks that high-volume time-ordered data — metrics, telemetry, IoT sensor readings, application logs
at scale — is stored in a time-series database or log-structured store, not in a general-purpose relational
database. Storing time-series data in a relational database is a write scalability risk.
What Time-Series Data Looks Like
Time-series data is a sequence of values, each associated with a timestamp:

- CPU usage: 87.3% at 14:00:00.001, 88.1% at 14:00:00.002, 87.9% at 14:00:00.003...
- IoT temperature sensor: 21.3°C at 09:00:01, 21.4°C at 09:00:02...
- Stock price ticks: $142.31 at 10:23:04.001, $142.29 at 10:23:04.015...


## Characteristics:

- Append-only: You never update past values; you only write new ones.
- Extremely high write rate: Thousands to millions of data points per second.
- Time-range queries: Almost all reads query a time range: "give me all CPU metrics from the last 5 minutes."
- Compression opportunity: Consecutive values often change very little and compress extremely well.


## Why Relational Databases Struggle

Relational databases (PostgreSQL, MySQL) use B-tree indexes. B-trees are excellent for random lookups and
range scans on indexed columns but are not optimized for high-rate sequential append workloads. At millions of
inserts per second, B-tree maintenance (index rebalancing) becomes a bottleneck. Storage costs are also high —
relational databases don't apply time-series-specific compression.

## Time-Series Databases

- InfluxDB: Purpose-built for high-throughput metrics and monitoring data.
- TimescaleDB: A PostgreSQL extension that adds time-series optimizations. Allows SQL queries.
- Prometheus: Used for application metrics; designed to scrape metrics from services at intervals.
- Apache Druid / ClickHouse: Columnar stores excellent for time-ordered analytical queries at massive scale.
- Amazon Timestream: Cloud-managed time-series database.
