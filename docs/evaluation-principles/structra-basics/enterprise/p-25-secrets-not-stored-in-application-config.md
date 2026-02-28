---
title: "P-25 Secret Management"
---

# P-25 Secret Management

What This Rule Checks
Structra checks that database credentials, API keys, certificates, and other secrets are managed by a dedicated
secrets manager — not stored in environment variable files committed to source control, not hardcoded in
configuration files, and not embedded in container images. Secrets in application config are a critical security
fault.

Why This Is a Critical Issue
Secrets in config files end up in:

      Source control (Git): Developers accidentally commit .env files or config.yaml files containing
      production credentials. Once in Git history, they're accessible to everyone with repo access — and
      potentially public if the repository is ever leaked or made public.
      Container images: A Dockerfile that copies a .env file bakes secrets into the image layer. Images are
      shared, stored in registries, and inspected by many people.
      Log files: Secrets in environment variables can appear in stack traces, debug logs, or crash dumps.
      CI/CD pipelines: Build logs that print environment variables expose secrets to anyone who can view
      pipeline logs.


A single leaked database password or API key can lead to complete data breach, financial loss, or service
disruption.

Secrets Management Solutions
HashiCorp Vault An open-source secrets management platform. Stores secrets encrypted at rest, provides fine-
grained access control (only Service A can read Database A's credentials), enforces secret rotation, and
maintains an audit log of every secret access.

AWS Secrets Manager A fully managed AWS service for storing, rotating, and accessing secrets. Native
integration with RDS for automatic credential rotation.

GCP Secret Manager / Azure Key Vault Equivalent managed services from Google Cloud and Microsoft
Azure.

How It Works in Practice
Instead of:


  DATABASE_PASSWORD=mysecretpassword123


in an .env file, the application at startup fetches the secret:


  secret = vault.get_secret("production/database/password")


The secret is never stored anywhere except the secrets manager. The application holds it only in memory.
Rotation is handled by the secrets manager and transparent to the application.
