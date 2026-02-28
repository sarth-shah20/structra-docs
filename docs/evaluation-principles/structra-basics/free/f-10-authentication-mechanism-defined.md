---
title: "F-10 Auth Method"
---

# F-10 Auth Method

## What This Rule Checks

Structra checks that every system with a public-facing API explicitly states how callers prove their identity. An
API without a declared authentication mechanism is effectively open to the public — anyone can call it.

## Authentication vs Authorization

Authentication answers: "Who are you?" It verifies the caller's identity. Authorization answers: "What are you
allowed to do?" It controls access based on identity.

This rule covers authentication. Authorization is covered separately (Rule P-27).

## Accepted Authentication Mechanisms

JWT — JSON Web Tokens The user logs in with a username and password. The server validates the
credentials and issues a signed JWT. The JWT contains the user's ID and roles in its payload and is
cryptographically signed by the server. On every subsequent request, the client sends the JWT. The server
verifies the signature and trusts the payload — no database lookup required.

Best for: Web and mobile applications with stateless API backends.

OAuth 2.0 An authorization framework that allows a user to grant a third-party application access to their
account on another service, without giving that service their password. When you "Sign in with Google," you're
using OAuth 2.0.

Best for: Any system where users authenticate via a third-party identity provider (Google, GitHub, Okta, Auth0)
or where applications need to act on behalf of users.

API Key A long random string issued to an API consumer. Every API request includes this key in a header. The
server looks up the key and determines which client is calling.

Best for: Server-to-server communication, third-party developer APIs, and B2B integrations where a human
user isn't making individual requests.

Session Cookie The server creates a session after login, stores session data server-side, and sends a session ID
to the client as a cookie. The client sends this cookie with every request.

Best for: Traditional web applications where the browser handles authentication automatically.

mTLS — Mutual TLS Both the client and the server present certificates to each other and verify them. Unlike
regular TLS (where only the server has a certificate), mTLS ensures both parties are who they claim to be at the
network level.
Best for: Service-to-service communication inside a secure infrastructure where you need cryptographic proof
of identity (zero-trust environments).

## Why This Rule Exists

It sounds obvious — of course your API needs authentication. But designs submitted without explicitly stating
the mechanism often have implicit assumptions that fall apart under scrutiny: "the API is internal" (but not
protected), "we'll add auth later" (but later never comes), or "it's behind a VPN" (insufficient on its own).
Explicitly naming the mechanism forces the decision to be made and documented.
