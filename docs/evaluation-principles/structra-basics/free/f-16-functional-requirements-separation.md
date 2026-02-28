---
title: "F-16 Requirement Separation"
---

# F-16 Requirement Separation

What This Rule Checks
Structra checks that your design clearly separates what the system does (functional requirements) from how
well it must do it (non-functional requirements). A design that conflates the two or omits non-functional
requirements cannot be evaluated for production readiness.

Functional Requirements
Functional requirements describe the behaviors and features of the system — what it does from the user's
perspective.

Examples:

      Users can create accounts and log in.
      Users can post images.
      The system sends email notifications when an order ships.
      Admins can ban users.


These are the features. A system either has them or it doesn't.

Non-Functional Requirements
Non-functional requirements describe the quality attributes of the system — how it behaves under real
conditions.

Examples:

      The API must respond within 200ms at P99 under normal load.
      The system must be available 99.9% of the time (less than 9 hours downtime per year).
      The system must handle 10,000 concurrent users.
      Data must be durable — no writes should be lost once acknowledged.
      The system must comply with GDPR.


These are not features. Users never directly see them. But they determine whether the architecture is correct.

Why the Separation Matters
Non-functional requirements drive architectural decisions. A system with a 99.9% availability SLA can be built
differently from one with a 99.99% SLA. A system that must respond in 50ms needs a very different caching
and database strategy from one where 2 seconds is acceptable.

Without stating non-functional requirements explicitly, there's no basis for evaluating whether the architecture is
adequate. An architecture that would satisfy the functional requirements of a system with 1,000 QPS and 99%
availability would completely fail one with 100,000 QPS and 99.99% availability — yet they might have
identical features.

Why This Rule Exists

Many designs describe features in detail but leave performance, availability, and scalability targets vague or
unstated. This makes the design impossible to evaluate rigorously. This rule ensures that the quality bar is made
explicit — so that the architecture can be judged against it.
