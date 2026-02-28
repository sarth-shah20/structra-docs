---
title: "P-05 Latency Budget"
---

# P-05 Latency Budget

What This Rule Checks

Structra checks that when your design states a latency SLA (e.g., "P99 response time under 200ms"), you have
also broken down how that budget is allocated across the components that contribute to it. Without this
breakdown, the SLA is an aspiration with no architectural backing.

What a Latency Budget Is
A latency budget is a decomposition of your end-to-end latency target into the contributions of each layer. If
your API must respond in 200ms at P99, you must account for every millisecond:
 Component                                                              Allocated Budget

 Network (client to load balancer)                                      10ms

 Load balancer overhead                                                 1ms

 Application server processing                                          20ms

 Cache lookup (if hit)                                                  5ms

 Database query (if cache miss)                                         100ms

 Response serialization                                                 5ms

 Network (load balancer to client)                                      10ms

 Total                                                                  151ms



This leaves 49ms of headroom for P99 variance — the worst-case outliers that are slower than the median.

Why Each Layer Matters
Network latency is determined by geography and the number of network hops. If your users are in Europe and
your server is in the US, you've already spent ~80ms on network before any processing.

Database query latency is often the dominant cost. A poorly indexed query that takes 300ms blows the budget
entirely. The budget forces you to ensure queries are properly indexed.

Cache hit rate dramatically affects latency distribution. A cache miss on a database call adds significant
latency. If your cache hit rate is 80%, 20% of requests are paying the full database query cost.

What Happens Without a Latency Budget

A team commits to a 200ms P99 SLA and designs a system where:

         The database query can take up to 180ms under load.
         The external API call for enrichment can take up to 50ms.


180 + 50 = 230ms — already over budget, before network, application logic, or serialization. Without the
budget, this mismatch isn't caught until load testing or production.
