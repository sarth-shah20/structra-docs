---
title: "F-06 Eviction Policy"
---

# F-06 Eviction Policy

What This Rule Checks

When your design includes a cache, Structra checks that you've explicitly stated which eviction policy governs
how old entries are removed when the cache is full. An undeclared eviction policy is an incomplete design —
you haven't thought through how the cache will behave under pressure.

Why Eviction Matters
A cache has finite memory. When it fills up, it must decide which entries to remove to make room for new ones.
The wrong policy causes stale data to linger too long, important data to be evicted too early, or the cache to
behave unpredictably in production.

The Main Eviction Policies

LRU — Least Recently Used Evicts the entry that was accessed least recently. The logic is: if you haven't
needed something recently, you probably won't need it again soon. This is the most common and sensible
default for general-purpose application caches.

Use when: You're caching API responses, database query results, or session data and access patterns are
relatively uniform.

LFU — Least Frequently Used Evicts the entry that has been accessed the least number of times overall. This
is better than LRU when a small set of items receives the vast majority of traffic ("hot items") because those
popular entries never get evicted even if they weren't accessed in the last few minutes.

Use when: Your data has a strong popularity distribution — for example, the top 100 products on an e-
commerce site receive 90% of all product page views.

TTL — Time to Live Every cache entry expires after a fixed duration, regardless of how recently or frequently
it was accessed. After expiration, the next request fetches fresh data from the source and re-populates the cache.

Use when: Your cached data has a natural freshness requirement. Stock prices cached for 5 seconds, weather
data for 10 minutes, exchange rates for 1 hour — TTL directly encodes the acceptable staleness of the data.

Random Replacement Evicts a random entry. Simple to implement, surprisingly effective in some theoretical
analyses, but rarely the right choice in production. Only mention this if you have a specific reason.

Combining Policies

It's valid and common to combine TTL with LRU: entries expire after a maximum time (TTL) and are also
subject to eviction when memory pressure occurs (LRU). State both when applicable.
Why This Rule Exists

Forgetting to declare your eviction policy is a symptom of not thinking through cache behavior under real
conditions. What happens at 3 AM on Black Friday when your cache is 100% full and 10,000 new products just
went on sale? Your eviction policy determines the answer.
