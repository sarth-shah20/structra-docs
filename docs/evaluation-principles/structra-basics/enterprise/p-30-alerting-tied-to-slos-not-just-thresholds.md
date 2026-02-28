---
title: "P-30 SLO Alerting"
---

# P-30 SLO Alerting

What This Rule Checks
Structra checks that your monitoring and alerting design is built around Service Level Objectives (SLOs) and
SLO burn rates, not just raw metric thresholds. Threshold-based alerting produces alert fatigue and misses the
business impact. SLO-based alerting fires at the right time with the right urgency.

The Problem with Threshold-Based Alerting
"Alert when CPU > 80%" or "Alert when error count > 100."
These alerts:

        Fire too often on harmless conditions. CPU hitting 82% briefly during a batch job at 3 AM is not an
        incident. Over time, teams learn to ignore these alerts — and then miss the alert that actually matters.
        Don't reflect user impact. 100 errors during a period of 100,000 requests (0.1% error rate) is very
        different from 100 errors during a period of 500 requests (20% error rate). The threshold fires identically
        for both.
        Don't communicate urgency. Is this problem going to burn through the error budget in an hour or in a
        week?


SLOs and Error Budgets
Service Level Objective (SLO) A target for a system's reliability over a time window. Examples:

        "99.9% of requests return a successful response over any 30-day window."
        "99% of requests respond in under 200ms over any 30-day window."


Error Budget The amount of unreliability you're allowed before breaching your SLO. For a 99.9% availability
SLO over 30 days: 0.1% × 30 days × 24 hours × 60 minutes = 43.2 minutes of downtime budget per month.

Burn Rate How fast you're consuming your error budget. A burn rate of 1 means you're consuming the budget
at exactly the rate that would exhaust it by the end of the window. A burn rate of 10 means you're consuming it
10x faster and will exhaust it in 3 days instead of 30.

SLO-Based Alerting

 Burn Rate             Urgency                                       When to Alert

 > 14x                 Critical (page immediately)                   Budget exhausted in ~2 hours

 > 6x                  High (page in business hours)                 Budget exhausted in ~5 hours

 > 3x                  Medium (ticket)                               Budget exhausted in ~4 days

 < 1x                  Healthy                                       No alert




These thresholds are well-calibrated: they fire when there's genuine urgency and stay quiet when the system is
operating within acceptable bounds. The on-call engineer gets context: not "there are some errors," but "we're
burning error budget at 8x and will breach our SLO within the next few hours."

SLO alerting tools: Google SRE-style SLO frameworks, Datadog SLO monitors, Prometheus recording rules,
Sloth (open source SLO framework for Prometheus).
