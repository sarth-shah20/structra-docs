---
title: "P-27 Auth Separation"
---

# P-27 Auth Separation

What This Rule Checks
Structra checks that authentication (verifying who the caller is) and authorization (determining what they're
allowed to do) are handled by separate, dedicated components. Embedding authorization logic inside individual
services creates an inconsistent and unmaintainable permission model as the system grows.

The Difference
Authentication: "Are you who you say you are?"

      Verifying a JWT signature.
      Validating a session token against a sessions database.
      Checking an API key against an API key store.
      Result: An authenticated identity (user ID, service name, roles).


Authorization: "Are you allowed to do this?"

      "Is User 42 allowed to read Order #99?" (Order #99 belongs to User 99 — no.)
      "Is this service allowed to call the admin endpoint?"
      "Is User 42 in the 'editor' role?"
      Result: Allow or deny the request.


The Problem with Inline Authorization
When each microservice implements its own authorization logic:

      Inconsistency: Service A and Service B might apply the same "editor" role differently.
      Duplication: The same role-checking code is duplicated across dozens of services.
      Maintenance burden: When authorization rules change (e.g., "editors can now delete, not just edit"),
      you must update every service that references the "editor" role.
      Auditability: There's no central place to see what the authorization rules are or to audit access decisions.


The Correct Pattern: Central Policy Engine
Role-Based Access Control (RBAC) Users are assigned roles (admin, editor, viewer). Each role has defined
permissions. Services ask "does this user have permission X?" without caring which roles they have.

Policy Engines Dedicated tools like Open Policy Agent (OPA) or Casbin evaluate authorization policies
centrally. Services send an authorization query ("can user 42 perform DELETE on /orders/99?") and receive a
yes/no response. Policy logic is defined in one place and evaluated consistently.

API Gateway Authorization For coarse-grained authorization (does this API key have access to this endpoint
at all?), the API gateway can enforce rules before the request reaches any service.
