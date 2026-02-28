---
title: "F-17 Failure Handling"
---

# F-17 Failure Handling

What This Rule Checks
Structra checks that your design explicitly identifies at least two things that can go wrong and describes how the
system handles each one. A design with no stated failure handling is not production-ready — it assumes perfect
conditions that will never exist in production.

Why Systems Fail
Production systems fail constantly. Servers crash. Networks partition. External APIs return 500s. Databases run
out of connections. Disks fill up. Deployments introduce bugs. None of this is exceptional — it's the normal
operating environment of a production system. Resilient systems are designed with failure as an expected
condition, not a surprise.

Failure Modes to Identify
Pick the two most likely or most impactful failure scenarios in your specific system. For most systems, these
include:

      A downstream service (payment processor, email provider) becoming unavailable.
      A database becoming slow or unreachable.
      A cache node failing (cache stampede risk).
      A message queue backup causing processing delays.
      A deployment causing a spike in error rates.
      A traffic spike exceeding provisioned capacity.


Accepted Handling Strategies
Retries with Exponential Backoff When a request fails, retry it — but wait progressively longer between
retries (1s, 2s, 4s, 8s...) to avoid hammering a struggling service. Add random jitter to prevent all clients from
retrying simultaneously.
Circuit Breaker After a threshold of consecutive failures, "open" the circuit and stop sending requests to the
failing service. Return a fallback response immediately instead. Periodically allow test requests through to see if
the service has recovered.

Fallback Response When a non-critical service is unavailable, return a degraded but functional response. If the
recommendation engine is down, return popular items instead. If the user's personal settings can't be loaded,
return defaults.

Graceful Degradation The system continues operating in a reduced-capability mode when part of it fails. An e-
commerce site might disable personalized recommendations but continue processing orders.

Retry Queue (Dead Letter Queue) Failed asynchronous tasks are placed in a dead letter queue for inspection
and reprocessing, rather than silently dropped.

Why This Rule Exists
"What happens when X fails?" is the most important question to ask during a system design review. If the
answer is "the whole system goes down," the design isn't production-ready. This rule ensures failure scenarios
are considered during design, when they're inexpensive to address — not after an incident, when they're
expensive.
