---
title: "P-16 Retry Backoff"
---

# P-16 Retry Backoff

What This Rule Checks
Structra checks that all network calls between internal services implement retry logic with exponential backoff
and jitter. Immediate or fixed-interval retries after a failure can make a struggling service even worse, turning a
brief hiccup into an extended outage.

Why Retries Are Necessary
Transient failures — temporary network blips, brief overloads, brief service restarts — are a normal part of
distributed systems. A request that fails once has a good chance of succeeding on retry. Without retries, transient
failures become user-visible errors for no good reason.
Why Naive Retries Make Things Worse
Immediate retries A service fails. All 1,000 clients immediately retry simultaneously. The service is now
flooded with 1,000 retry requests on top of whatever caused it to fail in the first place. The overload gets worse.

Fixed-interval retries Clients retry every second. The service recovers briefly, then gets overwhelmed by the
synchronized wave of retries every second. It never fully recovers.

Exponential Backoff
Each successive retry waits longer:

         Attempt 1 fails → wait 1 second.
         Attempt 2 fails → wait 2 seconds.
         Attempt 3 fails → wait 4 seconds.
         Attempt 4 fails → wait 8 seconds.


This gives the downstream service time to recover without being continuously hammered.

Jitter
Add randomness to the backoff duration to prevent all clients from retrying at the same time (the "thundering
herd" problem):

         Instead of waiting exactly 4 seconds, wait a random duration between 2 and 6 seconds.
         This spreads retry traffic across time, smoothing the load on the recovering service.


What to Retry

         Network timeout errors.
         503 Service Unavailable.
         429 Too Many Requests (respect the Retry-After header if present).


Do not retry:

         4xx client errors (your request is wrong; retrying won't help).
         Non-idempotent operations without idempotency keys (retrying a payment without an idempotency key
         causes double charges).
