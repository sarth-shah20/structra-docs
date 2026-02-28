---
title: "F-03 Stateless Services"
---

# F-03 Stateless Services

What This Rule Checks
Structra checks that your application servers don't store any user or session state in their own memory. If they
do, horizontal scaling becomes impossible without complex session affinity, and a server restart silently logs
users out.

What "Stateless" Actually Means
A stateless server treats every incoming request as completely independent. It doesn't remember anything about
previous requests from the same user. All the information needed to handle a request either comes in the request
itself (e.g., a JWT token carrying the user's identity) or is fetched from an external store (e.g., a Redis session
store or a database).

A stateful server, by contrast, stores things like "User #4521 is logged in" or "User #4521's shopping cart has
these three items" in the server's in-memory data structures. This seems convenient but creates a serious
problem.

Why Stateful Servers Break Horizontal Scaling

Imagine you have two API servers, Server A and Server B, behind a load balancer. A user logs in and their
session is stored on Server A. On the next request, the load balancer sends them to Server B. Server B has no
record of their session, so it treats them as unauthenticated and returns a 401. The user is randomly logged out
depending on which server handles their request.

The workarounds — sticky sessions (pinning a user to one server) — defeat the purpose of having multiple
servers. If Server A goes down, all its users lose their sessions.

The Correct Architecture

Store all state externally:

      Session data: Redis (fast, in-memory key-value store purpose-built for this).
      User identity on each request: JWT tokens (the token itself contains the user ID and roles,
      cryptographically signed so the server trusts it without looking anything up).
      Shopping carts, draft data: Database or Redis, keyed by user ID.


With this pattern, every API server is identical and interchangeable. You can add ten more servers tomorrow and
every one of them can handle any request from any user.

Why It Matters

Statelessness is the foundation of horizontal scalability. Without it, you can't add more servers to handle more
load. This rule ensures your architecture is ready to scale before it's too late to restructure it.
