---
title: "F-15 Capacity Estimates"
---

# F-15 Capacity Estimates

What This Rule Checks
Structra checks that your design includes rough numerical estimates for the scale it must handle. Without
numbers, there is no way to verify whether the architectural choices — the database, the caching strategy, the
number of servers — are appropriate for the load.

What Estimates Must Cover
Expected QPS (Queries Per Second) How many requests will the system handle at peak? This number
directly drives decisions about how many servers you need, whether you need a cache, and whether your
database can keep up.

Example: "We expect 500 active users per minute, each making 3 requests per minute on average: 500 × 3 / 60
= 25 QPS average. At 10x peak: 250 QPS."

Storage Requirements Over One Year How much data will the system store? This drives database choice,
whether you need sharding, and what your infrastructure cost will look like.

Example: "Each user generates 1KB of profile data and an average of 100 events per month at 200 bytes each.
With 1 million users: 1M × 1KB = 1GB for profiles. 1M × 100 × 200 bytes × 12 months = ~240GB of events
per year."

Peak Bandwidth How much data moves in and out per second at peak? This affects your CDN configuration,
load balancer capacity, and origin server network interface requirements.

Example: "Average response is 50KB. At peak 250 QPS: 250 × 50KB = 12.5 MB/s outbound."

These Don't Need to Be Precise
Back-of-envelope estimates are intentionally rough. The purpose is not accuracy — it's order-of-magnitude
correctness. Is this a 100 QPS system or a 100,000 QPS system? Those require completely different
architectures.

An estimate that's off by 3x is acceptable. An architecture designed for 1,000 QPS that will actually face
100,000 QPS is a catastrophic mismatch.

Why This Rule Exists
Designs without estimates often contain architectural choices that sound reasonable but fall apart at the actual
scale. "Just add more servers" is not a scaling strategy if you haven't estimated how many "more" means.
Numbers ground the design in reality and make it possible to challenge and verify the architectural decisions.
