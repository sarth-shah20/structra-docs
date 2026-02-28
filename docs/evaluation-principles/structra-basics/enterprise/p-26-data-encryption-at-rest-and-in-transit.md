---
title: "P-26 Data Encryption"
---

# P-26 Data Encryption

## What This Rule Checks

Structra checks that all sensitive data is encrypted both while it's being transmitted (in transit) and while it's
being stored (at rest). Designs that handle personally identifiable information or payment data without stated
encryption are flagged as compliance failures.

## Encryption in Transit

TLS (Transport Layer Security) encrypts data traveling across a network — between the user's browser and
your server, between your services, and between your application and your database. Without TLS, network
traffic is readable by anyone who can observe the network.

## Requirements:

- All external-facing endpoints must use HTTPS (TLS 1.2 minimum, TLS 1.3 preferred).
- Internal service-to-service communication should use TLS (especially in shared infrastructure environments).
- Database connections should use TLS.
- Never downgrade or disable TLS for performance reasons.


TLS 1.0 and 1.1 are deprecated and must not be used. TLS 1.2 is the current minimum. TLS 1.3 is faster and
more secure and should be used where possible.

## Encryption at Rest

Data at rest is data stored on disk — in databases, object stores, backups, and log files.

AES-256 (Advanced Encryption Standard with 256-bit key) is the standard for symmetric encryption of data at
rest. All major cloud providers offer transparent encryption at rest for their storage services (RDS, S3, EBS).

## Levels of encryption at rest:

- Full-disk encryption: The entire storage volume is encrypted. All data on the disk is protected even if the disk is physically removed.
- Database-level encryption: The database encrypts data before writing to disk (Transparent Data
- Encryption / TDE in SQL Server, Oracle; supported in PostgreSQL via pgcrypto).
- Application-level encryption: The application encrypts specific sensitive fields (credit card numbers,
- SSNs) before writing to the database. The most granular; even a database administrator with direct access cannot read the raw sensitive data.
What "Sensitive Data" Includes

- Personally Identifiable Information (PII): names, addresses, email addresses, phone numbers.
- Payment card data (PCI DSS requirement).
- Health records (HIPAA requirement).
- Authentication credentials (passwords must be hashed with bcrypt/Argon2, not encrypted).
- Government ID numbers.
