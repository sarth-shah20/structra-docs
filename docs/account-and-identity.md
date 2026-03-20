---
sidebar_position: 3
title: Account and Identity
description: Identity model, username rules, signup/login behavior, and privacy boundaries in Structra.
slug: /account-and-identity
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Account and Identity

This page documents how Structra handles usernames, authentication entry points, profile editing, and basic privacy expectations around account discovery and public identity.

## Identity Model

Structra supports multiple authentication paths while preserving a single user identity model.

- Password signup and login
- OTP-based signup and login flows
- OAuth-based account creation and sign-in

Regardless of entry path, the goal is the same: a single account with a stable identity record and a unique username.

## Username Rules

Usernames are designed to be globally unique, searchable, and safe to display across the product.

- Usernames are globally unique across all accounts
- Allowed characters are letters, numbers, `_`, and `-`
- The `@` symbol is presentation-only and is not stored as part of the username
- Maximum username length is `50` characters

These rules keep identity display consistent while avoiding ambiguous or conflicting handles.

## Signup Flows

Different signup paths may gather identity data at slightly different moments, but they all converge on the same account model.

- Password signup: the user chooses a username directly during onboarding
- OTP signup: the username is collected during the verification flow
- OAuth signup: if the user is new, Structra generates a unique username and attaches it to the new account

If a user already exists, the authentication flow should resolve into the existing identity rather than creating duplicates.

## Login Resolution

Structra allows users to sign in with either email or username.

- If the identifier contains `@`, it is treated as an email
- Otherwise, it is treated as a username

This keeps login flexible without requiring separate entry points for different credential styles.

## Profile Editing and Username Changes

Users can update profile metadata, including username, but identity edits must preserve uniqueness guarantees.

- Username changes are validated before save
- Global uniqueness is enforced at update time, not just at signup
- If the requested username is unavailable, the update is rejected with a validation error

This prevents stale assumptions about handle ownership and avoids silent identity collisions.

## Search and Discovery Boundaries

Structra supports account discovery for collaboration flows, but search behavior should respect sensible privacy constraints.

- User search is optimized for partial matching
- The current authenticated user is excluded from their own search results
- Public profile views should not expose private email addresses

Search is intended to support collaboration and workspace membership flows, not unrestricted identity disclosure.

## Operational Expectations

Identity behavior should remain predictable across product surfaces.

- A user's visible identity should stay consistent after login method changes
- Username collisions must be handled explicitly, never silently overwritten
- Public identity should be separable from private authentication credentials

These expectations matter because identity bugs tend to become trust and support problems very quickly.
