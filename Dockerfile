# Use the official Node.js 22 LTS (2026 standard)
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /app

# 1. Enable Corepack (The modern standard)
# This replaces the need to 'npm install -g pnpm'
RUN corepack enable && corepack prepare pnpm@11.0.9 --activate

# 2. Security: Switch to a non-root user
# 'node' is a pre-defined user in the official image
USER node

# Keep the container alive so we can 'exec' into it
CMD ["sleep", "infinity"]