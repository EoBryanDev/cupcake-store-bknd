# DEVOPS & INFRASTRUCTURE CONTEXT

## 1. Project Overview

- **Environment:** Production (Fullstack)
- **Host:** HostGator VPS (Linux-based)
- **Deployment Model:** Containerized via Docker Compose, managed by Ansible.
- **Database:** Neon (Serverless Postgres) - External/Managed.

## 2. Tech Stack Definition

- **Cloud/Host:** HostGator VPS + Cloudflare (DNS/SSL/Proxy).
- **Provisioning & Config:** Pulumi (TypeScript) for infrastructure state and Ansible for OS-level configuration and deployment.
- **Orchestrator:** Docker Compose.
- **CI/CD:** GitHub Actions.
- **Observability:** OpenTelemetry (OTEL) integration with Grafana Cloud (Metrics, Traces, Logs).
- **State Storage:** Cloudflare R2 (for Pulumi/IaC remote state).

## 3. Infrastructure Architecture (Rules)

- **Networking:**
  - Nginx acts as a Reverse Proxy on the VPS host.
  - Cloudflare handles SSL termination (Full/Strict mode) and provides the edge security layer.
  - Only ports 80/443 (Nginx) and 22 (SSH for Ansible) should be exposed on the VPS.
- **Storage/State:**
  - Application state is stored in Neon (Postgres).
  - File storage or static assets should ideally leverage Cloudflare R2.
- **Containerization:**
  - Use `docker-compose.yml` to manage the application service and the OpenTelemetry Collector (if required as a sidecar).
  - Ensure restart policies are set to `unless-stopped`.

## 4. Pipeline & Deployment Strategy

- **Branching Model:** GitFlow (`feature/*` -> `develop` -> `release/*` -> `main`).
- **CI (GitHub Actions):**
  - Trigger: Pull Requests and Merges to `develop` and `main`.
  - Tasks: Linting, Type-checking, and TDD execution (Unit/Integration).
- **CD (GitHub Actions + Ansible):**
  - Deployment is triggered after successful CI.
  - GitHub Actions uses SSH to run **Ansible Playbooks** on the VPS.
  - Ansible tasks: Pull latest Docker images, update `.env` files from GitHub Secrets, and run `docker compose up -d`.
- **Secret Management:** All sensitive data (Neon URL, Grafana API Keys, OTEL headers) are stored in **GitHub Secrets** and injected into the environment via Ansible during deployment.

## 5. Engineering Prompts for Coding AI

> **Regarding Docker Compose:** "Always generate a `docker-compose.yml` that includes healthchecks for the application service. Use environment variables for all sensitive data."
>
> **Regarding OpenTelemetry:** "Instrument the Node.js application using the OpenTelemetry SDK. Ensure it exports Traces, Metrics, and Logs to the Grafana Cloud OTLP endpoint using the headers provided in the environment variables."
>
> **Regarding Ansible:** "When generating Ansible playbooks, use the `community.docker` module to manage containers. Ensure the `template` module is used to securely deploy the `.env` file from GitHub Secrets variables."
>
> **Regarding Nginx:** "Generate Nginx configuration files that correctly forward the `X-Forwarded-For` and `X-Real-IP` headers, as the traffic will be proxied through Cloudflare."
>
> **Regarding Database Migrations:** "Ensure the CI/CD pipeline or the Docker entrypoint runs Drizzle-kit migrations before the application starts to keep the Neon database schema in sync."
