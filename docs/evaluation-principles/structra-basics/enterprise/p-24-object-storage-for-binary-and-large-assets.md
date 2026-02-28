---
title: "P-24 Object Storage"
---

# P-24 Object Storage

## What This Rule Checks

Structra checks that binary assets — images, videos, documents, backups, audio files — are stored in an object
store (S3-compatible), not in a relational database and not on the application server's local filesystem. Storing
BLOBs in a relational database is a scalability and cost fault.
Why Not the Relational Database
Performance degradation Large BLOB reads consume significant I/O bandwidth on the database server,
competing with transactional queries. A user downloading a 10MB video while other users are placing orders
degrades everyone's performance.

Cost Database storage is typically 10–50x more expensive than object storage per gigabyte. Storing 10TB of
video in a relational database has a vastly higher cost than storing it in S3.

Scalability Relational databases don't scale storage independently of compute. Object stores scale to virtually
unlimited storage automatically and cheaply.

Backup and replication Binary data bloats database backups and makes them slower to create, transfer, and
restore.

## Why Not the Application Server Filesystem

No horizontal scaling If you store an uploaded image on Server A's disk, a user whose request goes to Server B
cannot access it. You'd need to mount a shared filesystem (NFS) — which introduces its own availability and
performance issues.

No redundancy Local disks are not replicated. If Server A's disk fails, all images stored there are lost.

No CDN integration Object stores like S3 integrate natively with CDNs. Files stored locally cannot be served
from a CDN edge node.

## Object Storage

Object stores (AWS S3, Google Cloud Storage, Azure Blob Storage, MinIO for self-hosted) are purpose-built
for binary data:

- Unlimited scale.
- Built-in redundancy and durability (S3 guarantees 99.999999999% durability).
- Direct CDN integration.
- Cheap storage cost.
- Access control policies.


The standard pattern: the application stores metadata (filename, size, content type, S3 URL) in the relational
database, and the file itself in S3. The database row is small; the blob is in the right place.
