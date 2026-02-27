---
sidebar_position: 3
title: Account and Identity
slug: /account-and-identity
---

# Account and Identity

Structra supports identity flows across password, OTP, and OAuth signup/login.

## Username Rules

- Usernames are globally unique.
- Allowed characters: letters, numbers, `_`, `-`.
- `@` is a display prefix only and is not stored in the database.
- Username length limit: 50 characters.

## Signup Flows

- Password signup: users set username directly.
- OTP signup: username is provided during verification.
- OAuth signup: if user is new, Structra auto-generates a unique username.

## Login Flows

- Users can sign in with either email or username.
- If identifier contains `@`, login resolves as email.
- Otherwise, login resolves as username.

## Profile Editing

- Users can edit profile metadata including username.
- Username updates are checked for global uniqueness before save.
- If taken, a validation error is returned and save is blocked.

## Search and Privacy

- User search runs through trigram similarity for fast partial matching.
- Search excludes the current authenticated user.
- Public user profile views should not expose private email addresses.
