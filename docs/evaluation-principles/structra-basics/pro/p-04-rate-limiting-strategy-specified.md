---
title: "P-04 Rate Limiting"
---

# P-04 Rate Limiting

What This Rule Checks

Structra checks that your design includes an explicit rate limiting strategy for public-facing APIs: which
algorithm is used, where it's enforced, and what the limits are. An API without rate limiting is vulnerable to
abuse, accidental overload, and resource starvation.

Why Rate Limiting Exists
Without rate limiting:

      A single misbehaving client (or an attacker) can consume all available API capacity, degrading service for
      everyone.
      Scrapers can exhaust your database with high-frequency read requests.
      A bug in a client application causing an infinite retry loop can DDoS your own API.
      Your infrastructure costs spike without warning when a client sends unexpectedly high traffic.


Where to Enforce It
Rate limiting must be enforced at the API gateway or a dedicated middleware layer — not inside application
business logic. Implementing rate limiting inside each individual microservice is inconsistent and hard to
manage. A central API gateway (Kong, AWS API Gateway, Nginx with rate limit module) applies it uniformly.

The Main Rate Limiting Algorithms
Token Bucket Each client starts with a "bucket" of tokens. Each request consumes one token. Tokens are added
to the bucket at a fixed rate (e.g., 10 tokens per second). When the bucket is empty, requests are rejected.
Tokens accumulate up to the bucket's capacity, allowing short bursts.

Best for: APIs where you want to allow burst traffic (a user clicking rapidly for a few seconds) but prevent
sustained high-rate abuse.
Leaky Bucket Requests enter a fixed-size queue (the "bucket") and are processed at a fixed rate — the queue
"leaks" at a constant rate. If the queue is full, new requests are dropped.

Best for: Smoothing out bursty traffic into a steady stream, particularly useful for outgoing API calls where you
must not exceed a third party's rate limit.

Sliding Window Counter Counts requests in a rolling time window. If the count exceeds the threshold, the
request is rejected. More accurate than a fixed-window counter (which can allow 2x the rate limit at window
boundaries).

Best for: General API rate limiting where accuracy at window boundaries matters.

What the Design Must State

      The algorithm by name.
      The limit (e.g., 100 requests per minute per API key).
      The scope (per user, per IP, per API key, global).
      The response when the limit is exceeded ( 429 Too Many Requests ).
      Whether limits differ by endpoint or tier.
