---
title: "P-06 DB Pooling"
---

# P-06 DB Pooling

## What This Rule Checks

Structra checks that your design explicitly includes connection pooling between the application tier and the
database. In a high-concurrency system, opening a new database connection per request exhausts the database's
connection limit and causes cascading failures.

## Why Database Connections Are Expensive

Opening a TCP connection, negotiating TLS, and authenticating to a database takes 10–100ms and consumes
resources on both the client and the database server. A PostgreSQL database, for example, has a practical limit
of a few hundred to a few thousand simultaneous connections (the default is 100). Each active connection
consumes memory on the database server.

## The Problem Without Connection Pooling

At 1,000 concurrent requests, each needing a database connection, your application would attempt to open
1,000 simultaneous connections to the database. PostgreSQL refuses connections above its limit. Your
application starts returning 500 errors. The database may become unstable.

## What Connection Pooling Does

A connection pool maintains a fixed set of pre-opened, reusable connections to the database (e.g., 50
connections). When a request needs a database connection, it borrows one from the pool, uses it, and returns it.
The pool never opens more than its configured maximum.

- 1,000 concurrent requests can share 50 connections, cycling through them rapidly.
- Connection establishment happens once at startup, not on every request.
- The database sees a stable 50 connections, well within its limit.


## Connection Pooling Tools

- Application-level pooling: Built into most ORM frameworks (ActiveRecord, SQLAlchemy, Hibernate).
- The pool lives in each application process.
- External connection pooler: PgBouncer (for PostgreSQL) or ProxySQL (for MySQL) sits between the application and the database, pooling connections at the infrastructure level. This is preferable at scale because it maintains the pool independently of application restarts.


## Why This Rule Exists

Connection exhaustion is a common failure mode in systems that scale from prototype to production. At
prototype scale (10 concurrent users), per-request connections work fine. At production scale (1,000+
concurrent users), the database saturates and the system collapses. Explicitly including connection pooling in
the design prevents this.
