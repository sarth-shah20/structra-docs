---
title: "P-15 Circuit Breakers"
---

# P-15 Circuit Breakers

## What This Rule Checks

Structra checks that every synchronous call to an external service or downstream dependency is wrapped in a
circuit breaker. Without one, a single slow or failing downstream service can cause your entire system to
accumulate blocked threads, exhaust your connection pool, and fail — a cascade failure.
How Cascade Failures Happen
Imagine Service A calls Service B with a 5-second timeout. Service B starts responding slowly (taking 4.9
seconds per request). Service A's requests pile up, each holding a thread for 4.9 seconds. Eventually all of
Service A's threads are occupied waiting for Service B. Service A can no longer respond to its own clients.
Service A appears to be down, even though its own code is fine.

The failure in Service B has cascaded to Service A.

## How a Circuit Breaker Prevents This

A circuit breaker monitors calls to a downstream service and tracks the failure rate. It operates in three states:

Closed (normal operation) Requests flow through normally. The circuit breaker counts failures.

Open (failure mode) When failures exceed a threshold (e.g., 50% of calls fail in the last 10 seconds), the circuit
"trips" and opens. All subsequent calls to the downstream service immediately return a fallback response —
without even attempting the call. No threads are held. No timeouts. The fallback might be an empty list, a
cached value, a "service temporarily unavailable" message, or any degraded response.

Half-Open (recovery test) After a configured wait period, the circuit allows one test request through. If it
succeeds, the circuit closes and normal operation resumes. If it fails, the circuit reopens.

## Circuit Breaker Libraries

- Netflix Hystrix (deprecated but widely referenced).
- Resilience4j (Java).
- Polly (.NET).
- Service meshes (Istio, Linkerd) can apply circuit breaking at the infrastructure level without code changes.
