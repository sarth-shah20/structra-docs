---
title: "F-08 Status Codes"
---

# F-08 Status Codes

What This Rule Checks
Structra checks that your API design uses HTTP status codes according to their standardized meaning.
Returning the wrong status code makes your API harder to consume, breaks standard tooling (like retries and
error handling in HTTP clients), and is considered an API design fault.

The Status Code Categories

2xx — Success The request was received, understood, and processed successfully.

       200 OK — Standard success for GET, PUT, PATCH.

       201 Created — Used specifically when a new resource has been created (POST requests that create
      entities).
       204 No Content — Success, but there's nothing to return (DELETE requests, or PUT with no response
      body).


3xx — Redirects The client should take further action. Usually handled transparently by HTTP clients.

       301 Moved Permanently — The resource is now at a different URL, permanently.

       302 Found — Temporary redirect.


4xx — Client Errors The client made a mistake. The request was bad.

       400 Bad Request — The request is malformed (invalid JSON, missing required field, invalid parameter
      value).
       401 Unauthorized — The client is not authenticated. They need to log in.

       403 Forbidden — The client is authenticated but not allowed to access this resource.

       404 Not Found — The requested resource doesn't exist.

       409 Conflict — The request conflicts with existing state (e.g., trying to create a user with an email that
      already exists).
       422 Unprocessable Entity — The request is syntactically valid but semantically wrong (validation failed).

       429 Too Many Requests — The client has been rate limited.

5xx — Server Errors The server encountered a problem. The client did nothing wrong.

       500 Internal Server Error — An unexpected error occurred on the server.

       502 Bad Gateway — The server received an invalid response from an upstream service.

       503 Service Unavailable — The server is temporarily unavailable (overloaded or down for maintenance).

       504 Gateway Timeout — An upstream service took too long to respond.


Common Violations (and Why They're Wrong)

Returning 200 for errors Some teams always return 200 OK and include an error message in the response
body. This breaks HTTP clients that check the status code to decide if a retry is needed. A load balancer won't
know the request failed. A monitoring system won't log it as an error.

Returning 500 for validation failures A user submitted a form with an invalid email address. That's their
mistake — a 4xx, specifically 400 or 422. Returning 500 says "the server broke," which is wrong and triggers
false alerts.

Returning 404 when the issue is authorization Returning 404 to hide the existence of a resource from
unauthorized users is sometimes intentional (security through obscurity), but must be a conscious design
decision, not an accident.

Why This Rule Exists
HTTP status codes are a contract between your API and everything that calls it — clients, load balancers,
monitoring tools, retry logic, and error tracking systems. Violating this contract creates subtle bugs that are
painful to debug and erode trust in your API's reliability.
