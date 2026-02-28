---
title: "P-08 Consistency Model"
---

# P-08 Consistency Model

What This Rule Checks
Structra checks that your design explicitly states the consistency model for each data store and verifies that the
chosen model matches the business requirements of the operations using that store. An unstated or mismatched
consistency model is a correctness risk — it means the system may silently serve stale or incorrect data in
scenarios where that is unacceptable.

The Main Consistency Models
Strong Consistency Every read reflects the most recent write. Once a write is acknowledged, any subsequent
read from any node will see that write. This is the strongest guarantee and the most expensive to achieve in a
distributed system — it requires coordination between nodes before acknowledging a write.

Use when: Financial balances, inventory counts, booking systems — any data where reading stale values has
real consequences (e.g., selling the last airplane seat twice).

Read-Your-Writes Consistency A user always sees their own most recent writes, but may see stale data written
by others. If you update your profile picture, you immediately see the change. Another user might see your old
picture for a few seconds.

Use when: User profile pages, settings, anything where the user should see their own changes immediately.

Monotonic Reads A user will never read an older version of data after reading a newer version. Reads are
always "forward in time" for a given user, even if they might be slightly behind the latest write.
Use when: Social media feeds, comment threads — the user should never see a post disappear and then
reappear.

Eventual Consistency Given enough time with no new writes, all nodes will eventually converge to the same
state. At any given moment, different nodes may have different values. This allows higher availability and lower
latency because writes don't need to coordinate across nodes.

Use when: Social media likes, view counts, DNS records, product descriptions — scenarios where a few
seconds of staleness is acceptable in exchange for higher performance.

Why Matching the Model Matters
A financial service using eventual consistency might allow a user's balance to show as positive on one replica
while being negative on another, enabling overdrafts. A social media feed using strong consistency pays
unnecessary coordination cost for data that doesn't require it, hurting performance. The match between model
and business operation must be deliberate.
