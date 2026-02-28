---
title: "P-18 Graceful Degradation"
---

# P-18 Graceful Degradation

## What This Rule Checks

Structra checks that for every non-essential feature in your design, you've described what the system does if the
service powering that feature goes down. A system that fails completely when any one component fails is
brittle. A well-designed system has clear degradation paths.

## Essential vs Non-Essential Features

Essential features are the core value of the product — the operations that users come for. For an e-commerce
site, the essential features are: browsing products and completing purchases.

Non-essential features enhance the experience but aren't required for core functionality:

- Personalized product recommendations (powered by a recommendation engine).
- "Recently viewed" sidebar.
- Real-time inventory count ("only 3 left").
- Social proof ("42 people are viewing this right now").
- Product reviews and ratings.
- Related searches and autocomplete.


None of these are required to browse and buy a product.

## Degradation Strategies

Serve cached/stale data If the recommendation engine is down, serve yesterday's recommendations from
cache. Slightly stale but functional.

Serve a default response If personalized recommendations can't be computed, show the global bestseller list
instead. Less personalized but still useful.

Disable the feature gracefully If the reviews service is down, hide the reviews section entirely. Don't show an
error widget. Just don't show reviews.

Serve a placeholder "Recommendations temporarily unavailable" with no broken UI elements.

## Feature Flags

Graceful degradation is often implemented alongside feature flags — toggles that allow you to disable specific
features at runtime without a deployment. If the recommendation engine is overloaded, flip the flag and all
users immediately see the bestseller list instead.

## Why This Rule Exists

A service that goes to 100% error rate when any one non-essential component fails is operationally fragile. The
recommendation engine's load balancer getting a bad deploy shouldn't prevent users from buying products.
Graceful degradation ensures that failures are contained, not propagated.
