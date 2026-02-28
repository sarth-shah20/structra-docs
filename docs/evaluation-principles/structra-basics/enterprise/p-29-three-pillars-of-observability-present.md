---
title: "P-29 Full Observability"
---

# P-29 Full Observability

## What This Rule Checks

Structra checks that your design includes all three pillars of observability: structured logs, metrics, and
distributed traces. Missing any one pillar creates a blind spot that makes diagnosing production incidents
significantly harder.

## Why Observability Matters

A system is "observable" if you can understand what's happening inside it from the outside — by examining its
outputs — without having to deploy new code or add new instrumentation after the fact. In production, when
something goes wrong, observability is the difference between a 5-minute investigation and a 5-hour one.

## The Three Pillars

Logs — What Happened Structured logs are a record of discrete events that occurred: "Request received for
/orders/42 by user 99 at 14:03:22.541 — 200 OK in 43ms." Each log entry captures a moment in time with
context.
Logs must be structured (JSON format, not free text) so they can be searched and filtered. "ERROR: database
connection failed" is unstructured. This is structured and queryable:

```json

{"level":"error","service":"order-service","event":"db_connection_failed","host":"db-primary-01","timestamp":"..."}
```

Log aggregation tools: ELK Stack (Elasticsearch, Logstash, Kibana), Loki (by Grafana), Splunk, Datadog Logs.

Metrics — How the System Is Behaving Over Time Metrics are numerical measurements collected over time:
request rate (req/s), error rate (%), p99 latency (ms), CPU usage (%), memory usage (%), cache hit rate (%).

Metrics answer the question "is this system healthy right now?" through dashboards and alerts. They're efficient
(just numbers), easy to graph, and ideal for alerting.

Metrics tools: Prometheus + Grafana, Datadog, CloudWatch, New Relic.

Traces — How a Request Traveled Across Services A distributed trace follows a single request as it travels
through multiple services. Each service adds a "span" to the trace, recording what it did and how long it took.
The complete trace shows the full journey:


  Request → API Gateway (5ms) → Order Service (30ms) → Inventory Service (20ms) → DB Query (80ms)


Traces answer: "Why was this request slow?" and "Which service in the chain failed?"

Tracing tools: Jaeger, Zipkin, AWS X-Ray, Datadog APM, OpenTelemetry (the standard instrumentation
format).

## Why All Three Are Required

- Logs tell you what happened but are expensive to query at scale.
- Metrics tell you that something is wrong but not why.
- Traces tell you where in the distributed call chain the problem occurred.


Together, they give a complete picture. Alone, each has critical blind spots.
