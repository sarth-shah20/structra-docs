---
title: "P-17 SLA Alignment"
---

# P-17 SLA Alignment

What This Rule Checks
Structra checks that the availability SLA your design claims is actually achievable by the architecture you've
drawn. A 99.99% availability claim backed by a single-region, single-AZ deployment is architecturally
inconsistent — the infrastructure cannot deliver that guarantee.

Understanding the Numbers

 SLA           Downtime per Year          What It Requires

 99%           ~87.6 hours                Basic redundancy at each tier

 99.9%         ~8.76 hours                Multi-AZ deployment, automated failover

 99.99%        ~52.6 minutes              Multi-region active-active or active-passive

 99.999%       ~5.3 minutes               Multi-region active-active with zero-downtime deployments




What Each Tier Requires
99% (two nines) Basic redundancy: no single points of failure, health checks and auto-restart. A single
availability zone is usually sufficient.

99.9% (three nines) Multi-AZ deployment: your services run across multiple Availability Zones within a single
region. If one AZ loses power or connectivity, the others continue serving traffic. Automated failover for
databases.

99.99% (four nines) Multi-region deployment: a single region outage (which happens several times per year at
major cloud providers) cannot bring down the system. Requires either active-active (traffic split across regions)
or active-passive (secondary region on standby, can take over in minutes). Database replication across regions.

99.999% (five nines) Requires elimination of all maintenance windows, zero-downtime deployments, multi-
region active-active, and often significant engineering investment in chaos engineering and resilience testing.

Why This Rule Exists
SLA numbers are often chosen aspirationally rather than analytically. "We want 99.99%" is a business desire,
not an architecture. This rule connects the number to the infrastructure it requires, forcing either an architectural
investment to match the SLA or a more honest SLA that matches the infrastructure.
