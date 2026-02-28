---
title: "F-05 Cache Layer"
---

# F-05 Cache Layer

What This Rule Checks

Structra checks that any read-heavy system serving more than 1,000 queries per second has a dedicated caching
layer between the application and the database. Without caching at this scale, your database will become the
bottleneck and eventually fail under load.

What a Cache Does
A cache stores the results of expensive operations (database queries, API calls, computed values) in fast
memory so that future requests for the same data can be served instantly without repeating the work. The first
request for "the 10 most popular products" hits the database, takes 50ms, and the result is stored in the cache.
The next 10,000 requests for that same data take 1ms each and never touch the database.

Where the Cache Goes

The cache must sit between the application server and the database. The application checks the cache first. If the
data is there (a cache hit), it's returned immediately. If not (a cache miss), the application queries the database,
returns the result to the user, and simultaneously writes it to the cache for future requests.


  User → API Server → [Cache] → Database
               ↑
           (check here first)



What to Cache

      Results of expensive or frequently-repeated database queries.
      Computed aggregations (total order count, average rating).
      Session data.
      Static reference data that rarely changes (country codes, product categories).
      Rendered HTML fragments or API responses for public pages.


What Not to Cache

      User-specific data that changes frequently (e.g., their current account balance in a high-frequency trading
      app).
      Data that must always be perfectly fresh (e.g., remaining inventory in a flash sale).


Why This Rule Exists

At 1,000+ QPS, even a well-optimized database will start showing strain. Databases are designed for durability
and correctness, not raw throughput at scale. A cache like Redis can handle hundreds of thousands of operations
per second. Offloading reads to a cache reduces database load by 80–95% in most read-heavy systems, directly
improving latency and resilience.
