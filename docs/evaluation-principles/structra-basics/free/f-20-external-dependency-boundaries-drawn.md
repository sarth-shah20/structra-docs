---
title: "F-20 Dependency Boundaries"
---

# F-20 Dependency Boundaries

What This Rule Checks
Structra checks that all third-party services and external integrations are shown as explicit, clearly bounded
external dependencies in your design — with a defined interface boundary between your system and theirs.
Inlining third-party logic directly into your services creates tight coupling that makes those services impossible
to test, difficult to maintain, and expensive to swap.
What External Dependencies Include

      Payment processors (Stripe, Braintree, PayPal).
      Email delivery services (SendGrid, Mailgun, Amazon SES).
      Push notification gateways (FCM, APNs).
      SMS providers (Twilio, Vonage).
      Identity providers (Auth0, Okta, Cognito).
      Maps and geocoding APIs (Google Maps, Mapbox).
      Cloud storage (AWS S3, Google Cloud Storage).
      Fraud detection services.
      Shipping carrier APIs.


What "Explicit Boundary" Means
The external dependency should appear in your architecture diagram as a clearly separate box or system,
connected to your system via a defined interface (usually a service or adapter class, not direct calls scattered
throughout your codebase).

Tightly Coupled (Bad)


  OrderService --directly calls--> stripe.charges.create()


The Stripe SDK is called directly from inside OrderService. Testing OrderService requires either real Stripe
credentials or mocking the Stripe SDK. Switching from Stripe to Braintree requires changes throughout
OrderService.

Loosely Coupled with Explicit Boundary (Good)


  OrderService --> PaymentGatewayInterface --> StripeAdapter --> [Stripe API]


OrderService calls a PaymentGateway interface. StripeAdapter implements that interface. To switch payment
processors, you write a new adapter. To test OrderService, you inject a mock implementation of the interface.
Stripe is treated as an external black box behind a clear seam.

Why This Rule Exists
External APIs change, go down, and get replaced. Services you depend on today might be deprecated in two
years. Without explicit boundaries, every change to an external provider requires finding and updating every
place in your codebase that calls it. With explicit boundaries, it's a well-contained swap. This rule also ensures
your architecture diagram tells the complete story of what the system depends on.
Applies to paid Pro and Enterprise evaluations.
