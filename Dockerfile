# Use Bun's official Docker image
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments for environment variables (needed at build time for Vite)
ARG VITE_GOOGLE_SCRIPT_URL
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY

# Set environment variables for build
ENV VITE_GOOGLE_SCRIPT_URL=$VITE_GOOGLE_SCRIPT_URL
ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Build the application (Vite will inline these env vars into the bundle)
RUN bun run build

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the static file server
CMD ["bun", "server.ts"]
