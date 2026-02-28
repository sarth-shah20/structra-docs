---
title: "F-01 Protocol Fit"
---

# F-01 Protocol Fit

What This Rule Checks

Structra checks that the API protocol you've chosen actually matches the way your system communicates.
Picking the wrong protocol is one of the most common architectural mistakes — it quietly causes performance
problems, unnecessary complexity, or poor developer experience down the line.

The Four Protocols and When to Use Each
REST (Representational State Transfer) REST is the right choice for the vast majority of public-facing APIs
that perform standard create, read, update, and delete operations. If a client is requesting a user profile,
submitting a form, or paginating through a list of products, REST fits naturally. It's stateless, cacheable, and
universally understood by HTTP clients everywhere.

Use REST when: You're building a public API, a mobile backend, or any CRUD-heavy service.

gRPC (Google Remote Procedure Call) gRPC uses HTTP/2 and Protocol Buffers (binary serialization) to
achieve extremely low latency with a small payload size. It's designed for service-to-service communication
inside your infrastructure — the kind of internal calls where every millisecond counts and you control both ends
of the connection.

Use gRPC when: Two backend services need to talk to each other at high frequency and low latency. Examples:
a payment service calling a fraud detection service, or a recommendation engine being called by a product API.

GraphQL GraphQL puts the query power in the client's hands. Instead of the server deciding what data each
endpoint returns, the client specifies exactly the fields it needs. This eliminates over-fetching (getting more data
than needed) and under-fetching (making multiple requests to assemble what you need). It shines in scenarios
with many different client types — a web app, a mobile app, and a third-party partner — all with different data
requirements.

Use GraphQL when: You have diverse clients with different data needs, or your UI frequently changes the
shape of data it requires.
WebSocket WebSocket establishes a persistent, full-duplex connection between the client and server, allowing
both sides to push data at any time. This is essential when the server needs to proactively send updates to the
client — not just respond to requests.

Use WebSocket when: You're building real-time features like live chat, collaborative document editing, live
sports scores, or a trading dashboard that updates prices in real time.

Common Violations

      Using REST for a live chat system where the server needs to push messages to clients — REST is
      request/response only.
      Using WebSocket for a simple user profile API — you don't need a persistent connection for infrequent
      reads.
      Using REST between two internal microservices that call each other hundreds of times per second —
      gRPC is far more efficient here.
      Using GraphQL for a simple API with only one or two clients and stable data requirements — this adds
      unnecessary complexity.


Why It Matters

A protocol mismatch doesn't always cause an immediate failure. It causes slow degradation: higher latency than
expected, more connections than necessary, or a brittle integration that breaks under load. Catching this early
saves significant refactoring later.
