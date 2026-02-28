---
title: "F-18 Storage Separation"
---

# F-18 Storage Separation

What This Rule Checks
Structra checks that your design does not run analytical (OLAP) queries against your operational (OLTP)
database. Running reporting queries on your primary transaction database is a well-documented performance
anti-pattern that degrades both the reports and the live application.

OLTP vs OLAP

OLTP — Online Transaction Processing Your primary operational database. It handles the real-time
transactions of your application: creating orders, updating user records, processing payments. These queries are:

      Small and targeted (fetch one user, update one order).
      High frequency (thousands per second).
      Latency-sensitive (the user is waiting for the response).
      Require strong consistency.


OLAP — Online Analytical Processing Your analytics or reporting layer. It handles analytical questions:
"What was our revenue by country last quarter?" or "What's the 7-day retention rate for users who signed up
through a referral?" These queries are:

      Large full-table scans across millions of rows.
      Low frequency (run by analysts or dashboards, not individual user actions).
      Long-running (acceptable to take seconds or minutes).
      Read-only against historical data.


Why They Must Be Separate
An analytical query like "calculate the revenue for all orders in the last 6 months by product category" might
scan millions of rows, hold locks, and run for 10–30 seconds. Running this on your primary OLTP database:

      Consumes the database server's CPU and memory, slowing down real user queries.
      Can cause lock contention that delays order processing.
      Degrades the latency experienced by real users for the duration of every report run.


The Standard Pattern

Operational data flows from the OLTP database to a separate analytical store via ETL (Extract, Transform,
Load) pipelines or change data capture (CDC) streaming. Analysts and reporting tools query the analytical
store, leaving the OLTP database exclusively for live application traffic.

Common analytical stores: Amazon Redshift, Google BigQuery, Snowflake, ClickHouse, Apache Druid.

Why This Rule Exists
This is a non-obvious bottleneck that often isn't discovered until an analytics query causes a production
incident. A scheduled report runs at 9 AM, hammers the production database, and the checkout flow becomes
slow for all users. Separating OLTP and OLAP prevents this category of problem entirely.
