# --- Build Stage ---
FROM node:lts-alpine AS build

WORKDIR /app

# Install required system dependencies for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy monorepo dependencies
COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ./
COPY ../package.json ./
COPY ../db ./db
COPY ../next_app ./next_app

# Install PNPM and dependencies
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# ✅ Move to next_app before building (Ensures correct node_modules location)
WORKDIR /app/next_app

# ✅ Explicitly install dependencies for next_app
RUN pnpm install --filter next_app --frozen-lockfile

# ✅ Build the Next.js application
RUN pnpm build

# --- Production Stage ---
FROM node:lts-alpine

WORKDIR /app

# Copy only necessary built files
COPY --from=build /app/next_app/package.json .
COPY --from=build /app/next_app/.next ./.next

# ✅ Install only production dependencies to avoid missing packages
RUN npm install -g pnpm && pnpm install --prod --filter next_app

# Expose the Next.js port
EXPOSE 3000

CMD ["pnpm", "start"]
