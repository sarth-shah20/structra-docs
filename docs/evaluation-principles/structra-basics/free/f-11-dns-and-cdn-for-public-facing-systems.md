---
title: "F-11 DNS CDN"
---

# F-11 DNS CDN

## What This Rule Checks

Structra checks that systems serving static content or users distributed across multiple geographies include a
Content Delivery Network (CDN) layer. Routing all user traffic to a single origin server — regardless of where
in the world the user is — is a latency and availability fault.

## What a CDN Does

A CDN is a globally distributed network of servers (called "edge nodes" or "Points of Presence") placed in data
centers around the world. When a user requests your website, instead of connecting to your origin server in, say,
Virginia, their request is served by the CDN node nearest to them — maybe one in Frankfurt, São Paulo, or
Singapore.

The result: a user in Tokyo experiences the same fast response times as a user in New York, because both are
served by nearby edge nodes.

## What a CDN Caches

- Static assets: JavaScript, CSS, images, fonts, videos.
- Static HTML pages.
- API responses that are the same for all users (e.g., a public product catalog).


## What a CDN Does Not Cache

- Authenticated or user-specific responses (e.g., a user's order history).
- Highly dynamic content that changes with every request.


## DNS in the Architecture

DNS (Domain Name System) is what translates yourapp.com into an IP address. In a CDN setup, DNS routes
users to the nearest CDN edge node. Your architecture diagram should show:
1. User's browser makes a DNS request for yourapp.com .
2. DNS (often managed by the CDN provider or a service like Route 53) returns the IP of the nearest edge node.

3. The edge node serves cached content or proxies the request to your origin.


## Why This Rule Exists

A London-based user hitting an origin server in Virginia adds ~90ms of round-trip time just from geography —
before any application processing. For a page that makes 10 requests, that's 900ms of pure network waste. A
CDN eliminates this. For availability, if your origin goes down briefly, a CDN can continue serving cached
content to users worldwide. This rule ensures public systems are built for the global, latency-sensitive reality of
the internet.
