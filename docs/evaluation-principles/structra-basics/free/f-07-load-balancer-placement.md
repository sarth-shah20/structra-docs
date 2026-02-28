---
title: "F-07 Load Balancing"
---

# F-07 Load Balancing

What This Rule Checks

Structra checks that every tier of your architecture that runs multiple server instances has a load balancer in
front of it. Multiple servers without a load balancer means incoming traffic has no way to be distributed across
those servers — defeating the entire purpose of having more than one.

What a Load Balancer Does
A load balancer sits in front of a group of servers and distributes incoming requests across them. It acts as a
single entry point — clients connect to the load balancer's address, and the load balancer decides which server
handles each request.

Without a load balancer, either:

      All requests go to one server (hardcoded IP), and the other servers sit idle.
      Clients randomly connect to different servers, but there's no health checking, no intelligent routing, and
      no single point of entry.


Where Load Balancers Are Needed
In Front of API Servers If you show three API server instances, there must be a load balancer receiving all
inbound traffic and distributing it across them.

Between Services in a Microservice Architecture If Service A calls Service B and Service B runs as three
instances, there needs to be a load balancer (or service discovery + client-side load balancing) between them.

In Front of Database Read Replicas If you have three read replicas, a load balancer distributes read queries
across all of them, maximizing utilization.

Common Load Balancing Algorithms

      Round Robin: Requests are distributed sequentially — server 1, server 2, server 3, server 1, server 2...
      Simple and effective when all servers are equivalent.
      Least Connections: The next request goes to the server currently handling the fewest active connections.
      Better when request handling times vary significantly.
      IP Hash: The same client IP always routes to the same server. Useful when you need session affinity
      (though you should prefer stateless design instead).

Why This Rule Exists
A diagram with multiple server boxes but no load balancer is either incomplete (you forgot to draw it) or
incorrect (you're relying on an implicit mechanism that won't work reliably in production). Either way, it's a
design fault that must be addressed.
