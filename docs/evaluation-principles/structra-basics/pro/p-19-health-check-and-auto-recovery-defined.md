---
title: "P-19 Health Recovery"
---

# P-19 Health Recovery

## What This Rule Checks

Structra checks that all services in your design expose a health check endpoint and that the infrastructure layer
is configured to automatically remove unhealthy instances from rotation and replace them. Without health
checks and auto-recovery, a crashed or deadlocked service instance silently fails while continuing to receive
traffic.

## Why Health Checks Are Necessary

## A service instance can fail in ways that aren't immediately obvious:

- The process crashes (obvious — the port closes).
- The process is running but deadlocked (not obvious — port is open but requests hang).
- The process is running but out of memory (requests are extremely slow).
- The process is running but its database connection pool is exhausted (requests time out).
- The process is running but has a bug introduced by a bad deployment (errors on specific paths).


Without health checks, a load balancer continues sending traffic to a broken instance. Users get errors.

## Types of Health Checks

Liveness Check ( /health/live ) "Is the process running?" A basic HTTP 200 response confirms the process is
alive and hasn't crashed. If this check fails, the orchestrator (Kubernetes) restarts the process.

Readiness Check ( /health/ready ) "Is the service ready to receive traffic?" This check verifies that the service's
dependencies (database connection, cache connection) are healthy. If the database connection pool is exhausted,
the readiness check returns an error, and the load balancer removes this instance from rotation — even though
the process itself is alive. It's not crashed, but it can't serve requests correctly.

Deep Health Check ( /health/deep ) Performs actual business logic verification — can we reach the database?
Can we reach the message queue? Can we perform a test write? This is more expensive and typically run less
frequently (every 30–60 seconds).

## Auto-Recovery

The infrastructure must act on health check failures automatically:

- Load balancer: Stop routing to instances failing the readiness check.
- Container orchestrator (Kubernetes): Restart containers failing the liveness check; replace terminated containers with new ones.
- Auto-scaling group (AWS EC2 ASG): Terminate unhealthy instances and launch replacements automatically.
