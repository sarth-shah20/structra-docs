---
sidebar_position: 1
title: Separation of Concerns
description: A fundamental principle of system design.
---

# Separation of Concerns (SoC)

**Separation of Concerns** is a design principle for separating a computer program into distinct sections such that each section addresses a separate concern.

## Why is this important?
In a distributed system like **Structra**, separating concerns allows for:

1.  **Modularity**: You can swap out the database without breaking the frontend.
2.  **Maintainability**: Developers know exactly where to look to fix a bug.
3.  **Scalability**: You can scale the "User Auth" service independently from the "Image Processing" service.

## Example in Code

Instead of writing one giant file, we split logic:

```javascript
// BAD: Everything in one file
function handleUserLogin(req, res) {
  validateInput(req);
  checkDatabase(req);
  sendEmail(req);
  return res.json({ success: true });
}

// GOOD: Separated Services
import { AuthService } from './auth';
import { EmailService } from './email';

function handleUserLogin(req, res) {
  const user = AuthService.login(req.body);
  EmailService.sendWelcome(user);
  return res.json({ success: true });
}